<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=160&section=header&text=🌈%20你好啊，欢迎来到TTS-UI%20v2.0快速部署指南%20✨&fontSize=28&fontColor=fff&animation=twinkling&fontAlignY=40" />

## 重要提醒

⚠️ **首次部署后请立即更改默认密码！**

🔧 **如需详细配置，请参考 [完整部署指南](DEPLOYMENT.md)**

🐳 **推荐使用 Docker 部署，更简单可靠**

## 🎉 v2.0 重大更新

🌐 **开放API服务**: 支持外部系统调用TTS服务  
🔑 **API密钥管理**: 独立的密钥系统，支持统计监控  
🎨 **美化测试控制台**: 全新设计的API测试界面  
� **使用监控**: 详细的调用统计和分析  
� **安全增强**: API访问控制和认证系统  

#### 企业级功能上线，支持大规模外部调用！

# TTS-UI v2.0 快速部署指南

## 方式一：公共镜像部署 (最快，2分钟完成)

### 前提条件
- 已安装 Docker

### 步骤
```bash
# 直接运行公共镜像
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  betsy0728/tts-ui:latest

# 访问应用
# 浏览器打开: http://localhost:7280
# 默认登录: admin / admin
```

## 方式二：Docker Compose 部署 (推荐，5分钟完成)

### 前提条件
- 已安装 Docker 和 Docker Compose

### 步骤
1. **获取代码**
```bash
git clone https://github.com/Besty0728/TTS-UI.git
cd TTS-UI
```

2. **启动服务**
```bash
docker-compose up -d
```

3. **访问应用**
打开浏览器访问: `http://localhost:7280`

默认登录: `admin` / `admin`

### 管理命令
```bash
# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart
```

---

## 源代码部署 (10分钟完成)

### 前提条件
- Python 3.11+

### 步骤
1. **获取代码**
```bash
git clone https://github.com/Besty0728/TTS-UI.git
cd TTS-UI
```

2. **安装依赖**
```bash
# 创建虚拟环境 (可选但推荐)
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# 安装依赖
pip install -r requirements.txt
```

3. **初始化数据库**
```bash
python -c "from app import init_db; init_db()"

# Windows用户注意: 如果遇到编码错误，请先运行:
# PowerShell: $env:PYTHONIOENCODING="utf-8"
# 或使用测试脚本: python test_db_init.py
```

4. **启动应用**
```bash
# 开发模式
python app.py

# 生产模式 (推荐)
python app_production.py
```

5. **访问应用**
打开浏览器访问: `http://localhost:7280`

默认登录: `admin` / `admin`

## 🚀 v2.0 API快速使用

### 1. 创建API密钥
1. 登录Web界面 (`http://localhost:7280`)
2. 进入"API管理"页面
3. 点击"创建API密钥"
4. 复制保存生成的密钥

### 2. 测试API
访问API控制台: `http://localhost:7280/api.html`

或使用命令行测试:
```bash
# 健康检查
curl "http://localhost:7280/api/v1/health"

# 语音合成 (需要API密钥)
curl -X POST "http://localhost:7280/api/v1/tts/synthesize" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is a test.",
    "provider": "openai",
    "voice": "alloy",
    "format": "mp3"
  }' \
  --output test_audio.mp3
```

### 3. 集成到您的项目
参考 [完整API文档](API-README.md) 中的详细说明、示例代码和SDK。

---

## 重要提醒

⚠️ **首次部署后请立即更改默认密码！**

🔑 **妥善保管API密钥，关闭页面后无法再次查看**

🔧 **如需详细配置，请参考 [完整部署指南](DEPLOYMENT.md)**

� **推荐使用 Docker 部署，更简单可靠**
