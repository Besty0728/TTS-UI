import os
import sqlite3
from functools import wraps

from flask import (
    Flask, Response, g, jsonify, request, send_from_directory, session
)
from werkzeug.security import check_password_hash, generate_password_hash

# --- App Configuration ---
app = Flask(__name__, static_folder="static", static_url_path="")

# 从环境变量获取配置，如果没有则使用默认值
app.secret_key = os.environ.get('SECRET_KEY', 'a_very_secret_key_for_demo_purposes')

# 数据库配置
DATABASE = os.environ.get('DATABASE_PATH', 'tts_gateway.db')

# 生产环境配置
if os.environ.get('FLASK_ENV') == 'production':
    app.config.update(
        DEBUG=False,
        TESTING=False,
        # 其他生产环境配置
        JSON_SORT_KEYS=False,
        SEND_FILE_MAX_AGE_DEFAULT=31536000,  # 1年的静态文件缓存
    )


# --- Database Initialization ---
def init_db():
    """初始化数据库，如果不存在则创建默认管理员用户。"""
    database_exists = os.path.exists(DATABASE)
    
    with app.app_context():
        db = get_db()
        
        # 检查是否需要创建表结构
        try:
            # 尝试查询users表来检查表是否存在
            db.execute("SELECT COUNT(*) FROM users").fetchone()
            tables_exist = True
        except sqlite3.OperationalError:
            tables_exist = False
        
        # 如果表不存在，创建表结构
        if not tables_exist:
            print("正在创建数据库表结构...")
            # 使用 open() 函数直接读取文件，指定 UTF-8 编码
            schema_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "schema.sql")
            with open(schema_path, "r", encoding="utf-8") as f:
                db.cursor().executescript(f.read())
            print("数据库表结构创建成功。")
        
        # 检查是否有用户，如果没有则创建默认管理员
        cursor = db.cursor()
        user_count = cursor.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        
        if user_count == 0:
            cursor.execute(
                "INSERT INTO users (username, password_hash) VALUES (?, ?)",
                ("admin", generate_password_hash("admin")),
            )
            db.commit()
            print("已创建默认用户 'admin'，密码 'admin'。")
        
        if not database_exists:
            print("数据库 'tts_gateway.db' 创建成功。")
        else:
            print("数据库已存在，表结构检查完成。")


def get_db():
    """为当前应用上下文打开一个新的数据库连接。"""
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE, detect_types=sqlite3.PARSE_DECLTYPES)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(error):
    """在请求结束时关闭数据库连接。"""
    db = g.pop("db", None)
    if db is not None:
        db.close()


# --- Auth Decorator ---
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"error": "Authentication required"}), 401
        return f(*args, **kwargs)

    return decorated_function


# --- API Endpoints ---
@app.route("/")
def serve_index():
    """提供前端主页面。"""
    return send_from_directory(app.static_folder, "index.html")


# User Authentication
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    db = get_db()
    user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

    if user and check_password_hash(user["password_hash"], password):
        session.clear()
        session["user_id"] = user["id"]
        session["username"] = user["username"]
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"}), 200


@app.route("/api/check_auth", methods=["GET"])
def check_auth():
    if "user_id" in session:
        return jsonify({"is_logged_in": True, "username": session.get("username")}), 200
    return jsonify({"is_logged_in": False}), 200


# API Settings Management
@app.route("/api/settings", methods=["GET"])
@login_required
def get_settings():
    user_id = session["user_id"]
    db = get_db()
    rows = db.execute("SELECT * FROM api_settings WHERE user_id = ?", (user_id,)).fetchall()

    settings = {"openai": {}, "gemini": {}}
    for row in rows:
        service = row["service_name"]
        if service in settings:
            settings[service] = {
                "api_key": row["api_key"],
                "api_endpoint": row["api_endpoint"],
                "model_name": row["model_name"],
            }
    return jsonify(settings), 200


@app.route("/api/settings", methods=["POST"])
@login_required
def save_settings():
    data = request.get_json()
    user_id = session["user_id"]
    service_name = data.get("service_name")
    model_name = data.get("model_name") # 使用统一的字段名

    if service_name not in ["openai", "gemini"]:
        return jsonify({"error": "Invalid service name"}), 400

    db = get_db()
    db.execute(
        """
        INSERT INTO api_settings (user_id, service_name, api_key, api_endpoint, model_name)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, service_name) DO UPDATE SET
            api_key = excluded.api_key,
            api_endpoint = excluded.api_endpoint,
            model_name = excluded.model_name
        """,
        (
            user_id,
            service_name,
            data.get("api_key"),
            data.get("api_endpoint"),
            model_name,
        ),
    )
    db.commit()

    return jsonify({"message": f"{service_name.capitalize()} settings saved successfully"}), 200


# --- TTS Conversion ---
@app.route("/api/tts", methods=["POST"])
@login_required
def text_to_speech():
    data = request.get_json()
    text = data.get("text")
    service = data.get("service")
    voice = data.get("voice")
    user_id = session["user_id"]

    if not all([text, service, voice]):
        return jsonify({"error": "Missing 'text', 'service', or 'voice' in request"}), 400

    # --- OpenAI TTS Logic ---
    if service.lower() == "openai":
        try:
            from openai import OpenAI

            db = get_db()
            settings = db.execute(
                "SELECT * FROM api_settings WHERE user_id = ? AND service_name = ?",
                (user_id, "openai"),
            ).fetchone()

            if not settings or not settings["api_key"]:
                return jsonify({"error": "OpenAI API key not set in settings."}), 400

            client = OpenAI(
                api_key=settings["api_key"],
                base_url=settings["api_endpoint"] if settings["api_endpoint"] else None,
            )

            print(f"--- Calling OpenAI TTS ---")
            print(f"Model: {settings['model_name']}, Voice: {voice}")

            response = client.audio.speech.create(
                model=settings["model_name"],
                voice=voice,
                input=text,
                response_format="mp3",
            )
            return Response(response.iter_bytes(), mimetype="audio/mpeg")

        except Exception as e:
            print(f"An OpenAI error occurred: {e}")
            error_message = str(e)
            if "Incorrect API key" in error_message:
                return jsonify({"error": "Authentication error: Incorrect OpenAI API key."}), 401
            return jsonify({"error": f"An unexpected OpenAI error occurred: {error_message}"}), 500

    # --- Gemini TTS Logic ---
    elif service.lower() == "gemini":
        try:
            # 使用新的 google.genai 库，如官方示例所示
            from google import genai
            from google.genai import types
            
            db = get_db()
            settings = db.execute(
                "SELECT * FROM api_settings WHERE user_id = ? AND service_name = ?",
                (user_id, "gemini"),
            ).fetchone()
            
            if not settings or not settings["api_key"]:
                return jsonify({"error": "Gemini API key not set in settings."}), 400
            
            model_name = settings["model_name"]
            if not model_name:
                # 使用官方推荐的TTS模型
                model_name = "gemini-2.5-flash-preview-tts"
            
            print(f"--- Calling Gemini TTS ---")
            print(f"Model: {model_name}, Voice: {voice}")
            print(f"API Endpoint: {settings['api_endpoint'] if settings['api_endpoint'] else 'Default Google API'}")
            
            # 检查是否使用自定义API端点
            if settings["api_endpoint"]:
                print(f"Using custom API endpoint: {settings['api_endpoint']}")
                
                # 使用requests直接调用代理API
                try:
                    import requests
                    import base64
                    
                    # 构建请求URL
                    proxy_url = settings["api_endpoint"].rstrip('/')
                    api_url = f"{proxy_url}/v1beta/models/{model_name}:generateContent"
                    
                    headers = {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': settings["api_key"]
                    }
                    
                    payload = {
                        "contents": [{"parts": [{"text": text}]}],
                        "generationConfig": {
                            "response_modalities": ["AUDIO"],
                            "speech_config": {
                                "voice_config": {
                                    "prebuilt_voice_config": {
                                        "voice_name": voice
                                    }
                                }
                            }
                        }
                    }
                    
                    print(f"Sending request to proxy: {api_url}")
                    response = requests.post(api_url, headers=headers, json=payload, timeout=30)
                    
                    if response.status_code == 200:
                        result = response.json()
                        
                        # 提取音频数据
                        candidate = result['candidates'][0]
                        part = candidate['content']['parts'][0]
                        
                        if 'inlineData' in part:
                            audio_data = part['inlineData']['data']
                            decoded_audio = base64.b64decode(audio_data)
                            
                            print(f"Successfully received audio via proxy: {len(decoded_audio)} bytes")
                            
                            # 检测和处理音频格式
                            if decoded_audio.startswith(b'RIFF'):
                                mimetype = "audio/wav"
                            elif decoded_audio.startswith(b'\xff\xfb') or decoded_audio.startswith(b'\xff\xfa'):
                                mimetype = "audio/mpeg"
                            elif decoded_audio.startswith(b'ID3'):
                                mimetype = "audio/mpeg"
                            elif decoded_audio.startswith(b'OggS'):
                                mimetype = "audio/ogg"
                            else:
                                # 为原始PCM数据添加WAV头部
                                def create_wav_header(pcm_data, sample_rate=24000, channels=1, bits_per_sample=16):
                                    import struct
                                    chunk_size = 36 + len(pcm_data)
                                    subchunk2_size = len(pcm_data)
                                    byte_rate = sample_rate * channels * bits_per_sample // 8
                                    block_align = channels * bits_per_sample // 8
                                    
                                    wav_header = struct.pack('<4sI4s4sIHHIIHH4sI',
                                        b'RIFF', chunk_size, b'WAVE', b'fmt ', 16, 1,
                                        channels, sample_rate, byte_rate, block_align,
                                        bits_per_sample, b'data', subchunk2_size
                                    )
                                    return wav_header
                                
                                wav_header = create_wav_header(decoded_audio)
                                decoded_audio = wav_header + decoded_audio
                                mimetype = "audio/wav"
                            
                            return Response(decoded_audio, mimetype=mimetype)
                        else:
                            raise Exception("No audio data found in proxy response")
                    else:
                        print(f"Proxy request failed: {response.status_code} - {response.text}")
                        raise Exception(f"Proxy request failed with status {response.status_code}")
                        
                except Exception as proxy_error:
                    print(f"Proxy request failed: {proxy_error}")
                    print("Falling back to direct API call...")
            
            # 使用默认的Google API端点（回退选项）
            print("Using direct Google API")
            client = genai.Client(api_key=settings["api_key"])
            
            # 根据官方示例配置TTS参数
            response = client.models.generate_content(
                model=model_name,
                contents=text,
                config=types.GenerateContentConfig(
                    response_modalities=["AUDIO"],
                    speech_config=types.SpeechConfig(
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                voice_name=voice,
                            )
                        )
                    ),
                )
            )
            
            # 提取音频数据
            candidate = response.candidates[0]
            part = candidate.content.parts[0]
            
            # 检查是否有inline_data
            if hasattr(part, 'inline_data'):
                inline_data = part.inline_data
                
                if hasattr(inline_data, 'data'):
                    audio_data = inline_data.data
                    
                    if audio_data:
                        # 检查是否已经是字节数据
                        if isinstance(audio_data, bytes):
                            decoded_audio = audio_data
                        else:
                            # 尝试base64解码
                            import base64
                            try:
                                decoded_audio = base64.b64decode(audio_data)
                            except Exception:
                                # 如果解码失败，尝试直接使用数据
                                decoded_audio = audio_data.encode() if isinstance(audio_data, str) else audio_data
                    else:
                        raise Exception("No audio data found in inline_data.data")
                else:
                    raise Exception("No 'data' attribute found in inline_data")
            else:
                raise Exception("No 'inline_data' found in response part")
            
            if not decoded_audio or len(decoded_audio) < 100:  # 音频文件至少应该有100字节
                raise Exception(f"Audio data too small or empty: {len(decoded_audio) if decoded_audio else 0} bytes")
            
            # 根据数据头部判断格式
            if decoded_audio.startswith(b'RIFF'):
                mimetype = "audio/wav"
            elif decoded_audio.startswith(b'\xff\xfb') or decoded_audio.startswith(b'\xff\xfa'):
                mimetype = "audio/mpeg"
            elif decoded_audio.startswith(b'ID3'):
                mimetype = "audio/mpeg"
            elif decoded_audio.startswith(b'OggS'):
                mimetype = "audio/ogg"
            else:
                # Gemini可能返回原始PCM数据，添加WAV头部
                mimetype = "audio/wav"
                
                # 为原始PCM数据创建WAV文件头部
                def create_wav_header(pcm_data, sample_rate=24000, channels=1, bits_per_sample=16):
                    """为原始PCM数据创建WAV文件头部"""
                    import struct
                    
                    # WAV文件头部结构
                    chunk_size = 36 + len(pcm_data)
                    subchunk2_size = len(pcm_data)
                    byte_rate = sample_rate * channels * bits_per_sample // 8
                    block_align = channels * bits_per_sample // 8
                    
                    wav_header = struct.pack('<4sI4s4sIHHIIHH4sI',
                        b'RIFF',           # ChunkID
                        chunk_size,        # ChunkSize
                        b'WAVE',           # Format
                        b'fmt ',           # Subchunk1ID
                        16,                # Subchunk1Size (PCM)
                        1,                 # AudioFormat (PCM)
                        channels,          # NumChannels
                        sample_rate,       # SampleRate
                        byte_rate,         # ByteRate
                        block_align,       # BlockAlign
                        bits_per_sample,   # BitsPerSample
                        b'data',           # Subchunk2ID
                        subchunk2_size     # Subchunk2Size
                    )
                    
                    return wav_header + pcm_data
                
                # 尝试创建完整的WAV文件
                try:
                    decoded_audio = create_wav_header(decoded_audio)
                except Exception:
                    # 如果失败，继续使用原始数据
                    pass
            
            # 创建响应并添加适当的头部
            response_obj = Response(decoded_audio, mimetype=mimetype)
            response_obj.headers['Content-Disposition'] = 'inline; filename="tts_audio.wav"'
            response_obj.headers['Cache-Control'] = 'no-cache'
            response_obj.headers['Accept-Ranges'] = 'bytes'
            response_obj.headers['Content-Length'] = str(len(decoded_audio))
            
            return response_obj
            
        except ImportError as e:
            error_msg = (
                "Failed to import 'google.genai'. Please install the latest version: "
                "'pip install google-genai'"
            )
            return jsonify({"error": error_msg}), 500
            
        except AttributeError as e:
            error_str = str(e)
            print(f"A critical attribute error occurred: {error_str}")
            error_msg = (
                "The 'google-genai' library appears to be outdated or incompatible. "
                "Please update to the latest version: 'pip install google-genai'"
            )
            return jsonify({"error": error_msg}), 500
            
        except Exception as e:
            print(f"A Gemini error occurred: {e}")
            error_message = str(e)
            
            if "API key not valid" in error_message or "401" in error_message:
                return jsonify({"error": "Authentication error: Invalid Gemini API key."}), 401
            elif "404" in error_message or "was not found" in error_message:
                return jsonify({"error": f"Gemini Model Error: The model '{model_name}' was not found. Please check."}), 404
            elif "Permission denied" in error_message:
                return jsonify({"error": "Permission denied: Please check your Gemini API access permissions."}), 403
            
            return jsonify({"error": f"An unexpected Gemini error occurred: {error_message}"}), 500
    else:
        return jsonify({"error": "Unsupported service"}), 400

# --- Account Management ---
@app.route("/api/account", methods=["GET"])
@login_required
def get_account_info():
    """获取当前管理员账户信息"""
    user_id = session["user_id"]
    db = get_db()
    user = db.execute("SELECT username FROM users WHERE id = ?", (user_id,)).fetchone()
    
    if user:
        return jsonify({"username": user["username"]}), 200
    return jsonify({"error": "User not found"}), 404


@app.route("/api/account", methods=["POST"])
@login_required
def update_account():
    """更新管理员账户信息"""
    data = request.get_json()
    user_id = session["user_id"]
    new_username = data.get("username", "").strip()
    new_password = data.get("password", "").strip()
    current_password = data.get("current_password", "").strip()
    
    if not current_password:
        return jsonify({"error": "Current password is required"}), 400
    
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    
    if not user or not check_password_hash(user["password_hash"], current_password):
        return jsonify({"error": "Current password is incorrect"}), 400
    
    # 验证新用户名
    if new_username and new_username != user["username"]:
        if len(new_username) < 3:
            return jsonify({"error": "Username must be at least 3 characters long"}), 400
        
        # 检查用户名是否已存在（除了当前用户）
        existing_user = db.execute(
            "SELECT id FROM users WHERE username = ? AND id != ?", 
            (new_username, user_id)
        ).fetchone()
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400
    
    # 验证新密码
    if new_password and len(new_password) < 4:
        return jsonify({"error": "Password must be at least 4 characters long"}), 400
    
    # 执行更新
    updates = []
    params = []
    
    if new_username and new_username != user["username"]:
        updates.append("username = ?")
        params.append(new_username)
        session["username"] = new_username  # 更新session
    
    if new_password:
        updates.append("password_hash = ?")
        params.append(generate_password_hash(new_password))
    
    if updates:
        params.append(user_id)
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
        db.execute(query, params)
        db.commit()
        
        return jsonify({"message": "Account updated successfully"}), 200
    else:
        return jsonify({"message": "No changes made"}), 200

# --- Main Execution ---
if __name__ == "__main__":
    # 动态创建 schema.sql 文件以供 init_db() 使用
    with open("schema.sql", "w", encoding="utf-8") as f:
        f.write(
            """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS api_settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            service_name TEXT NOT NULL,
            api_key TEXT,
            api_endpoint TEXT,
            model_name TEXT NOT NULL DEFAULT 'tts-1',
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE (user_id, service_name)
        );
        """
        )

    init_db()
    os.remove("schema.sql")  # 清理临时的 schema 文件
    
    # 开发环境启动
    if __name__ == "__main__":
        app.run(debug=True, port=5001)