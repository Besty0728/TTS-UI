<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=160&section=header&text=🌈%20你好啊，欢迎来到TTS-UI部署指南%20✨&fontSize=28&fontColor=fff&animation=twinkling&fontAlignY=40" />

# TTS-UI-部署指南

## 🎯 项目简介

TTS-UI 是一个基于 Flask 的现代化企业级文本转语音 (TTS) Web 应用程序，支持多种TTS引擎和语音配置。提供直观的Web界面，支持深色/浅色主题切换，具备完整的用户管理、API配置和开放API服务功能。

## ✨ 核心特性

- 🎨 **现代化界面**: 响应式设计，支持深色/浅色主题自动切换
- 🎯 **多引擎支持**: OpenAI TTS, Gemini TTS, 支持 [Gemini-balance](https://github.com/snailyp/gemini-balance) 开源项目
- 🔊 **智能音频处理**: 自动检测PCM格式并添加WAV文件头，确保浏览器完美播放
- 🔐 **用户管理**: 基于会话的身份验证系统
- 🌐 **开放API服务**: 提供RESTful API，支持外部调用TTS服务
- � **API密钥管理**: 独立的API密钥系统，支持使用统计和访问控制
- 📊 **使用监控**: 完整的API调用统计和使用监控
- 🎛️ **专业控制台**: 美化的API测试控制台，支持在线测试
- �📱 **跨平台**: 支持 Docker 容器化部署，兼容 Linux/Windows/macOS
- 🔧 **易配置**: 图形化设置界面，支持API密钥管理
- 🌍 **多语言**: 支持中英文界面切换

## 🆕 v2.0 新增功能

- ✨ **开放API端点**: 支持外部系统调用TTS服务
- 🔑 **API密钥管理**: 独立的密钥系统，支持创建、删除、统计
- 📊 **使用统计**: 详细的API调用数据和使用分析
- 🎨 **美化控制台**: 全新设计的API测试界面
- 🔒 **安全增强**: API访问控制和速率限制
- 📈 **监控面板**: 实时的服务状态和性能监控

<h3>⭐ 如果这个项目对您有帮助，请给我们一个 Star！</h3>

## 🚀 快速开始

[![快速部署指南](https://img.shields.io/badge/快速部署指南-点击查看-2ea44f?style=for-the-badge)](https://github.com/Besty0728/TTS-UI/blob/main/QUICKSTART.md)
[![完整文档](https://img.shields.io/badge/完整文档-点击查看-yellow?style=for-the-badge)](https://github.com/Besty0728/TTS-UI/blob/main/DEPLOYMENT.md)
[![API文档](https://img.shields.io/badge/API文档-点击查看-orange?style=for-the-badge)](https://github.com/Besty0728/TTS-UI/blob/main/API-README.md)
[![版本信息](https://img.shields.io/badge/版本信息-点击查看-blue?style=for-the-badge)](https://github.com/Besty0728/TTS-UI/blob/main/VERSION.md)
[![项目预览](https://img.shields.io/badge/项目预览-点击查看-purple?style=for-the-badge)](https://github.com/Besty0728/TTS-UI/blob/main/preview.md)
[![更新计划](https://img.shields.io/badge/更新计划-点击查看-red?style=for-the-badge)](https://github.com/Besty0728/TTS-UI/wiki)

### 方式一：使用公共镜像 (最快)

```bash
# 直接运行v2.0镜像
docker run -d --name tts-ui -p 7280:7280 --restart unless-stopped betsy0728/tts-ui:latest

# 访问应用: http://localhost:7280 (Web界面)
# API控制台: http://localhost:7280/api.html (新增)
# 默认登录: admin / admin
```

### 方式二：Docker Compose 部署 (推荐)

```bash
# 1. 克隆项目
git clone https://github.com/Besty0728/TTS-UI.git
cd TTS-UI

# 2. 启动应用
docker-compose up -d

# 3. 访问应用
# Web界面: http://localhost:7280 
# API控制台: http://localhost:7280/api.html (v2.0新增)
# 默认登录: admin / admin
```

### 方式三：源代码部署

```bash
# 1. 克隆项目
git clone https://github.com/Besty0728/TTS-UI.git
cd TTS-UI

# 2. 安装依赖
pip install -r requirements.txt

# 3. 初始化数据库
python -c "from app import init_db; init_db()"

# Windows用户如果遇到编码错误，请先运行:
# $env:PYTHONIOENCODING="utf-8"
# 或使用测试脚本: python test_db_init.py

# 4. 启动应用
python app_production.py
```

## 📋 系统要求

### 软件依赖
- **Docker**: 20.10+ (容器部署)
- **Python**: 3.11+ (源代码部署)
- **操作系统**: Linux, Windows, macOS

## 🐳 Docker 部署详解

### 0. 公共镜像信息

**Docker Hub 仓库**: `betsy0728/tts-ui`

**可用标签**:
- `betsy0728/tts-ui:latest` - 最新稳定版本

📖 **详细使用指南**: 查看 [DOCKER-USAGE.md](DOCKER-USAGE.md)

### 1. 使用公共镜像 (最简单)

```bash
# 直接运行
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  --restart unless-stopped \
  betsy0728/tts-ui:latest

# 带数据持久化
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

### 2. 使用 Docker Compose (推荐)

#### 快速启动
```bash
# 启动服务
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

#### 环境变量配置
创建 `.env` 文件自定义配置：
```bash
# 应用配置
SECRET_KEY=your-secret-key-here
FLASK_ENV=production

# 服务器配置
HOST=0.0.0.0
PORT=7280

# 数据库配置
DATABASE_PATH=/app/data/tts_gateway.db
```

### 3. 直接使用 Docker

#### 使用公共镜像 (推荐)
```bash
# 启动容器
docker run -d \
  --name tts-ui-production \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

#### 自行构建镜像
```bash
# 构建镜像
docker build -t tts-ui:latest .

# 运行容器
docker run -d \
  --name tts-ui-app \
  -p 7280:7280 \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  tts-ui:latest
```

### 4. Docker 管理命令

```bash
# 容器管理
docker ps                          # 查看运行的容器
docker logs tts-ui-production      # 查看日志
docker restart tts-ui-production   # 重启容器
docker stop tts-ui-production      # 停止容器
docker rm tts-ui-production        # 删除容器

# 镜像管理
docker images                      # 查看镜像
docker rmi tts-ui:latest          # 删除镜像

# 数据管理
docker volume ls                   # 查看数据卷
docker volume inspect tts_data    # 查看数据卷详情
```

## 💻 源代码部署详解

### 1. 环境准备

#### Python 环境
```bash
# 检查 Python 版本 (需要 3.11+)
python --version

# 创建虚拟环境 (推荐)
python -m venv tts-ui-env

# 激活虚拟环境
# Linux/macOS:
source tts-ui-env/bin/activate
# Windows:
tts-ui-env\Scripts\activate
```

#### 安装依赖
```bash
# 升级 pip
pip install --upgrade pip

# 安装项目依赖
pip install -r requirements.txt
```

### 2. 数据库初始化

```bash
# 自动初始化数据库和默认用户
python -c "from app import init_db; init_db()"
```

### 3. 应用启动

#### 开发模式
```bash
# 开发环境启动 (调试模式)
python app.py
# 访问: http://localhost:5000
```

#### 生产模式 (推荐)
```bash
# 生产环境启动 (使用 Waitress)
python app_production.py
# 访问: http://localhost:7280
```

### 4. 系统服务配置 (Linux)

#### 创建系统服务
```bash
# 复制服务文件 (需要修改路径)
sudo cp tts-gateway.service /etc/systemd/system/

# 编辑服务文件
sudo nano /etc/systemd/system/tts-gateway.service
```

#### 服务管理
```bash
# 重载服务配置
sudo systemctl daemon-reload

# 启用服务
sudo systemctl enable tts-gateway

# 启动服务
sudo systemctl start tts-gateway

# 查看状态
sudo systemctl status tts-gateway

# 查看日志
sudo journalctl -u tts-gateway -f
```

## ⚙️ 配置说明

### 1. 应用配置

#### 环境变量
```bash
# 基本配置
FLASK_ENV=production              # 运行环境
SECRET_KEY=your-secret-key       # 安全密钥
HOST=0.0.0.0                     # 监听地址
PORT=7280                        # 监听端口

# 数据库配置
DATABASE_PATH=./tts_gateway.db   # 数据库路径

# TTS 配置
DEFAULT_TTS_ENGINE=edge-tts      # 默认TTS引擎
MAX_TEXT_LENGTH=5000             # 最大文本长度
```

### 2. API 密钥配置

登录应用后，在"设置"页面配置各种TTS服务的API密钥：

#### OpenAI TTS
- **获取地址**: https://platform.openai.com/api-keys
- **模型**: tts-1, tts-1-hd
- **语音**: alloy, echo, fable, onyx, nova, shimmer

#### Gemini TTS
- **获取地址**: https://aistudio.google.com
- **模型**: gemini-2.5-flash-preview-tts

#### Gemini-balance 开源项目支持
- **项目地址**: https://github.com/snailyp/gemini-balance
- **特性**: 支持负载均衡的Gemini API代理服务
- **配置**: 使用Gemini-balance的端点URL替换官方API端点
- **兼容性**: 自动检测PCM音频格式，完美支持浏览器播放

## 🌐 开放API服务 (v2.0新增)

TTS-UI v2.0 提供完整的RESTful API服务，支持外部系统调用。

**📖 完整API文档**: [API-README.md](API-README.md) - 详细的API说明、认证方式、SDK示例和最佳实践

**🎛️ 在线测试**: 访问 `http://localhost:7280/api.html` 使用API控制台

### 1. API密钥管理

#### 创建API密钥
- 登录Web界面
- 进入"API管理"页面
- 点击"创建API密钥"生成新密钥
- 妥善保存密钥，页面关闭后无法再次查看

#### API密钥特性
- 🔐 **安全**: 随机生成，高强度加密
- 📊 **统计**: 详细的调用次数和使用统计
- 🎛️ **管理**: 支持创建、删除、查看统计
- 🔒 **访问控制**: 基于密钥的访问验证

### 2. API端点

#### 基础信息
- **Base URL**: `http://your-domain:7280/api/v1`
- **认证方式**: Bearer Token (API密钥)
- **内容类型**: `application/json`

#### 可用端点

##### 健康检查
```bash
GET /api/v1/health
# 响应: {"status": "healthy", "supported_providers": ["openai", "gemini"]}
```

##### 获取支持的服务商
```bash
GET /api/v1/providers
Authorization: Bearer YOUR_API_KEY
# 响应: {"providers": ["openai", "gemini"]}
```

##### TTS语音合成
```bash
POST /api/v1/tts/synthesize
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "text": "要转换的文本",
  "provider": "openai",  // openai 或 gemini
  "voice": "alloy",      // 语音类型
  "format": "mp3",       // 输出格式: mp3, wav, opus, aac, flac
  "return_base64": false // 是否返回base64编码
}
```

##### 使用统计
```bash
GET /api/v1/usage
Authorization: Bearer YOUR_API_KEY
# 响应: {"total_calls": 123, "this_month": 45, "today": 5}
```

### 3. 支持的语音

#### OpenAI TTS 语音
- `alloy` - 平衡的声音
- `echo` - 友好的声音  
- `fable` - 富有表现力
- `nova` - 温暖清晰
- `onyx` - 深沉权威
- `shimmer` - 明亮乐观

#### Gemini TTS 语音
- `Zephyr`, `Puck`, `Charon`, `Kore`, `Fenrir`, `Leda`
- `Orus`, `Aoede`, `Callirrhoe`, `Autonoe`, `Enceladus`
- `Iapetus`, `Umbriel`, `Algieba`, `Despina`, `Erinome`
- 更多语音选项请查看API控制台

### 4. 错误处理

API使用标准HTTP状态码：

- `200` - 成功
- `400` - 请求参数错误
- `401` - 认证失败 (API密钥无效)
- `403` - 访问被拒绝
- `429` - 请求过于频繁
- `500` - 服务器内部错误

### 5. 使用示例

#### cURL 示例
```bash
# 语音合成
curl -X POST "http://localhost:7280/api/v1/tts/synthesize" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is a test.",
    "provider": "openai",
    "voice": "alloy",
    "format": "mp3"
  }' \
  --output audio.mp3
```

#### Python 示例
```python
import requests

# API配置
base_url = "http://localhost:7280/api/v1"
api_key = "YOUR_API_KEY"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# 语音合成
data = {
    "text": "Hello, this is a test.",
    "provider": "openai", 
    "voice": "alloy",
    "format": "mp3"
}

response = requests.post(f"{base_url}/tts/synthesize", 
                        headers=headers, json=data)

if response.status_code == 200:
    with open("audio.mp3", "wb") as f:
        f.write(response.content)
    print("语音合成成功!")
else:
    print(f"错误: {response.status_code} - {response.text}")
```

#### JavaScript 示例
```javascript
// API配置
const baseUrl = "http://localhost:7280/api/v1";
const apiKey = "YOUR_API_KEY";

// 语音合成
async function synthesizeTTS(text, provider = "openai", voice = "alloy") {
    try {
        const response = await fetch(`${baseUrl}/tts/synthesize`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                provider: provider,
                voice: voice,
                format: "mp3"
            })
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // 播放音频
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error("合成失败:", await response.text());
        }
    } catch (error) {
        console.error("请求错误:", error);
    }
}

// 使用示例
synthesizeTTS("Hello, world!", "openai", "alloy");
```

### 6. API测试控制台

访问 `http://your-domain:7280/api.html` 使用美化的API测试控制台：

- 🎨 **现代化界面**: 专业的测试控制台
- 🔧 **在线测试**: 直接在浏览器中测试API
- 📋 **一键复制**: 复制API端点和示例代码
- 📊 **实时监控**: 查看服务状态和统计信息
- 🎵 **音频播放**: 直接播放合成的音频文件

### 3. 反向代理配置 (可选)

#### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:7280;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔒 安全配置

### 1. 强制安全措施

⚠️ **首次部署后必须执行的安全配置**:

1. **更改默认密码**:
   - 登录 `http://your-server:7280`
   - 使用默认账户: `admin` / `admin`
   - 立即在设置页面更改密码

2. **配置防火墙**:
```bash
# Ubuntu/Debian
sudo ufw allow 7280
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=7280/tcp
sudo firewall-cmd --reload
```

3. **更新密钥**:
```bash
# 生成强密钥
export SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
```

### 2. 生产环境安全建议

- 🔐 使用 HTTPS (配置 SSL 证书)
- 🛡️ 配置防火墙限制访问
- 🔑 定期更换API密钥
- 💾 定期备份数据
- 📊 监控系统资源
- 🔍 查看应用日志

## 📊 数据管理

### 1. 数据备份

#### Docker 部署备份
```bash
# 备份数据卷
docker run --rm -v tts_data:/data -v $(pwd):/backup alpine tar czf /backup/tts-backup-$(date +%Y%m%d).tar.gz -C /data .

# 恢复数据
docker run --rm -v tts_data:/data -v $(pwd):/backup alpine tar xzf /backup/tts-backup-YYYYMMDD.tar.gz -C /data
```

#### 源代码部署备份
```bash
# 备份数据目录
tar -czf tts-backup-$(date +%Y%m%d).tar.gz tts_gateway.db data/

# 恢复数据
tar -xzf tts-backup-YYYYMMDD.tar.gz
```

### 2. 数据库管理

```bash
# 查看数据库表
python -c "
import sqlite3
conn = sqlite3.connect('tts_gateway.db')
cursor = conn.cursor()
cursor.execute(\"SELECT name FROM sqlite_master WHERE type='table'\")
print(cursor.fetchall())
conn.close()
"

# 重置数据库 (谨慎操作)
rm tts_gateway.db
python -c "from app import init_db; init_db()"
```

## 🔧 故障排除

### 常见问题解决

#### 1. 端口冲突
```bash
# 查看端口占用
netstat -tlnp | grep 7280
# 或
lsof -i :7280

# 终止占用进程
sudo kill -9 <PID>
```

#### 2. 权限问题
```bash
# 修复文件权限
sudo chown -R $USER:$USER /path/to/tts-ui
chmod -R 755 /path/to/tts-ui
```

#### 3. 数据库问题
```bash
# 检查数据库文件
ls -la tts_gateway.db

# 重新初始化数据库
rm tts_gateway.db
python -c "from app import init_db; init_db()"
```

#### 4. Docker 问题
```bash
# 清理 Docker 缓存
docker system prune -f

# 重新构建镜像
docker build --no-cache -t tts-ui:latest .

# 查看容器日志
docker logs tts-ui-production
```

#### 5. 网络问题
```bash
# 测试网络连接
curl -I http://localhost:7280

# 检查容器网络
docker network ls
docker inspect bridge
```

### 日志查看

```bash
# Docker 容器日志
docker logs -f tts-ui-production

# 系统服务日志
sudo journalctl -u tts-gateway -f

# 应用日志 (如果配置了文件日志)
tail -f /var/log/tts-ui/app.log
```

## 📈 性能优化

### 1. 生产环境优化

#### 硬件优化
- 使用 SSD 存储提升I/O性能
- 增加内存减少磁盘交换
- 使用多核CPU提升并发处理

#### 软件优化
```bash
# 使用专业WSGI服务器
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:7280 app:app

# 配置负载均衡
# 使用 Nginx + 多个应用实例
```

### 2. 资源监控

```bash
# 查看容器资源使用
docker stats tts-ui-production

# 查看系统资源
htop
free -h
df -h
iostat -x 1
```

## 🔄 更新维护

### 1. 应用更新

#### Docker 部署更新
```bash
# 拉取最新镜像
docker pull tts-ui:latest

# 重启服务
docker-compose down
docker-compose up -d
```

#### 源代码部署更新
```bash
# 拉取最新代码
git pull origin main

# 更新依赖
pip install -r requirements.txt

# 重启服务
sudo systemctl restart tts-gateway
```

### 📢 v1.1.0 重大更新

**新增特性**:
- ✨ 支持 [Gemini-balance](https://github.com/snailyp/gemini-balance) 开源项目
- 🔊 智能PCM音频检测和WAV文件头处理
- 🔧 增强的音频兼容性，支持更多端点格式

**升级注意**:
- 无需额外配置，兼容现有设置
- 音频播放体验显著改善
- 支持更多Gemini API代理服务

### 2. 数据库迁移

如有数据库结构变更，请：
1. 备份现有数据
2. 查看更新说明
3. 执行迁移脚本
4. 验证数据完整性

## 🌐 API 文档

### 主要端点

```bash
# 用户认证
POST /api/login      # 用户登录
POST /api/logout     # 用户登出

# TTS 转换
POST /api/tts        # 文本转语音
GET  /api/history    # 获取历史记录

# 设置管理
GET  /api/settings   # 获取设置
POST /api/settings   # 保存设置
```

## 📞 技术支持

### 获取帮助

1. 📖 查看完整文档: [DEPLOYMENT.md](DEPLOYMENT.md)
2. 🚀 快速部署指南: [QUICKSTART.md](QUICKSTART.md)
3. 📋 版本信息: [VERSION.md](VERSION.md)
4. 🐛 问题反馈: 创建 GitHub Issue
5. 💬 社区讨论: 参与项目讨论

### 常用链接

- **项目仓库**: https://github.com/Besty0728/TTS-UI
- **Docker Hub**: https://hub.docker.com/r/betsy0728/tts-ui
- **Docker 使用指南**: [DOCKER-USAGE.md](DOCKER-USAGE.md)
- **快速部署指南**: [QUICKSTART.md](QUICKSTART.md)
- **问题反馈**: https://github.com/Besty0728/TTS-UI/issues

## 📄 许可证

本项目采用 Apache2.0 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。


---

<div align="center">
<h3>⭐ 如果这个项目对您有帮助，请给我们一个 Star！</h3>

**当前版本**: v1.1.0 | **最后更新**: 2025年8月18日
</div>
