"""
生产环境应用入口文件
用于生产级WSGI服务器（如Gunicorn、Waitress等）
"""
import os
import sys

# 添加项目根目录到Python路径
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

# 导入应用实例
from app import app, init_db

# 创建 schema.sql 文件（用于初始化数据库）
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

# 初始化数据库
init_db()

# 清理临时文件
if os.path.exists("schema.sql"):
    os.remove("schema.sql")

# 设置生产环境配置
if __name__ != "__main__":
    # 生产环境配置
    app.config.update(
        DEBUG=False,
        TESTING=False,
        # 从环境变量读取密钥，如果没有则使用默认值
        SECRET_KEY=os.environ.get('SECRET_KEY', 'production-secret-key-change-this-in-env')
    )

# WSGI应用对象（供Gunicorn等使用）
application = app

if __name__ == "__main__":
    # 从环境变量获取端口，默认7280
    port = int(os.environ.get('PORT', 7280))
    host = os.environ.get('HOST', '0.0.0.0')
    
    # 如果直接运行此文件，尝试使用生产级服务器
    try:
        from waitress import serve
        print("启动生产服务器 (Waitress)...")
        print(f"服务地址: http://localhost:{port}")
        print(f"网络访问: http://{host}:{port}")
        print("按 Ctrl+C 停止服务器")
        serve(app, host=host, port=port, threads=4)
    except ImportError:
        print("警告: Waitress未安装，正在使用Flask开发服务器...")
        print("生产环境请安装Waitress: pip install waitress")
        print(f"服务地址: http://localhost:{port}")
        print("按 Ctrl+C 停止服务器")
        app.run(host=host, port=port, debug=False)
