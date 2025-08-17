# TTS-UI 快速部署指南

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

---

## 重要提醒

⚠️ **首次部署后请立即更改默认密码！**

🔧 **如需详细配置，请参考 [完整部署指南](DEPLOYMENT.md)**

� **推荐使用 Docker 部署，更简单可靠**
