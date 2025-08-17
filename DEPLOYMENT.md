# TTS-UI 部署指南

## 简介

TTS-UI 是一个基于 Flask 的文本转语音 (TTS) Web 应用程序，支持多种TTS引擎和语音配置。本指南提供三种主要的部署方式：公共镜像部署、Docker 容器部署和源代码部署。

## 系统要求

- **操作系统**: Linux, Windows, macOS
- **Docker**: 20.10+ (推荐)
- **Python**: 3.11+ (源代码部署)
- **内存**: 最少 2GB RAM
- **存储**: 最少 5GB 可用空间

## 方式零：公共镜像部署 (最快)

### 优势
- 🚀 **最快部署**: 无需构建，直接拉取公共镜像
- 📦 **已验证**: 经过测试的稳定版本
- 🔄 **自动更新**: 拉取最新镜像即可更新

### 快速开始
```bash
# 创建数据卷
docker volume create tts_data

# 启动应用
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  betsy0728/tts-ui:latest

# 访问应用: http://localhost:7280
# 默认登录: admin / admin
```

### 镜像信息
- **仓库**: `betsy0728/tts-ui`
- **标签**: `latest` (最新稳定版本)
- **大小**: 720MB
- **详细使用指南**: [DOCKER-USAGE.md](DOCKER-USAGE.md)

## 方式一：Docker 容器部署 (自定义构建)

### 1. 使用 Docker Compose (推荐)

#### 快速启动
```bash
# 克隆项目
git clone <your-repo-url>
cd TTS-UI

# 启动容器
docker-compose up -d
```

#### 配置说明
`docker-compose.yml` 已配置：
- **端口映射**: 主机 7280 → 容器 7280
- **数据持久化**: `./data` 目录映射到容器内
- **健康检查**: 自动检测服务状态
- **自动重启**: 容器异常时自动重启

#### 访问应用
```
http://localhost:7280
```

默认登录凭据：
- 用户名: `admin`
- 密码: `admin`

### 2. 直接使用 Docker

#### 构建镜像
```bash
docker build -t tts-ui:latest .
```

#### 运行容器
```bash
# 基本运行
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v $(pwd)/data:/app/data \
  tts-ui:latest

# 带环境变量的运行
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v $(pwd)/data:/app/data \
  -e FLASK_ENV=production \
  -e DATABASE_PATH=/app/data/tts_gateway.db \
  tts-ui:latest
```

### 3. Docker 管理命令

```bash
# 查看容器状态
docker ps

# 查看容器日志
docker logs tts-ui

# 停止容器
docker stop tts-ui

# 重启容器
docker restart tts-ui

# 删除容器
docker rm tts-ui

# 进入容器调试
docker exec -it tts-ui /bin/bash
```

## 方式二：源代码部署 (完全自定义)

### 1. 环境准备

#### 安装 Python 依赖
```bash
# 克隆项目
git clone <your-repo-url>
cd TTS-UI

# 创建虚拟环境 (推荐)
python -m venv venv

# 激活虚拟环境
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt
```

### 2. 数据库初始化

```bash
# 自动初始化数据库
python -c "from app import init_db; init_db()"

# Windows 系统注意事项:
# 如果遇到编码错误，请在PowerShell中先设置编码:
# $env:PYTHONIOENCODING="utf-8"
# 然后再运行初始化命令

# 验证初始化是否成功
python test_db_init.py
```

**重要提示**: 
- Windows 用户如果遇到 `UnicodeDecodeError` 错误，这是字符编码问题
- 解决方法：在 PowerShell 中设置 `$env:PYTHONIOENCODING="utf-8"` 
- 或者使用提供的测试脚本：`python test_db_init.py`

### 3. 启动应用

#### 开发模式
```bash
python app.py
```

#### 生产模式 (推荐)
```bash
# 使用生产配置
python app_production.py

# 或使用 Waitress 服务器
waitress-serve --port=7280 --call app:create_app
```

#### 使用系统服务 (Linux)

1. 复制服务文件:
```bash
sudo cp tts-gateway.service /etc/systemd/system/
```

2. 修改服务文件中的路径:
```bash
sudo nano /etc/systemd/system/tts-gateway.service
```

3. 启用并启动服务:
```bash
sudo systemctl daemon-reload
sudo systemctl enable tts-gateway
sudo systemctl start tts-gateway
```

4. 检查服务状态:
```bash
sudo systemctl status tts-gateway
```

### 4. 使用 Nginx 反向代理 (可选)

#### 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 配置 Nginx
```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/tts-ui

# 创建软链接
sudo ln -s /etc/nginx/sites-available/tts-ui /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

## 环境变量配置

创建 `.env` 文件进行自定义配置：

```bash
# 复制示例配置
cp .env.example .env
```

可配置的环境变量：
```bash
# 应用设置
FLASK_ENV=production
SECRET_KEY=your-secret-key-here

# 数据库设置
DATABASE_PATH=./tts_gateway.db

# 服务器设置
PORT=7280
HOST=0.0.0.0

# TTS 设置
DEFAULT_TTS_ENGINE=edge-tts
MAX_TEXT_LENGTH=5000
```

## 安全配置

### 1. 更改默认密码
首次部署后，请立即：
1. 访问 `http://your-server:7280`
2. 使用默认凭据登录 (admin/admin)
3. 在设置页面更改管理员密码

### 2. 网络安全
- 使用防火墙限制访问端口
- 配置 SSL/TLS 证书 (生产环境)
- 使用反向代理隐藏应用端口

### 3. 数据备份
定期备份数据目录：
```bash
# 备份数据
tar -czf tts-ui-backup-$(date +%Y%m%d).tar.gz data/

# 恢复数据
tar -xzf tts-ui-backup-YYYYMMDD.tar.gz
```

## 故障排除

### 常见问题

1. **端口被占用**
```bash
# 查看端口占用
netstat -tlnp | grep 7280
# 或
lsof -i :7280

# 杀死占用进程
sudo kill -9 <PID>
```

2. **权限问题**
```bash
# 修复文件权限
sudo chown -R www-data:www-data /path/to/tts-ui
sudo chmod -R 755 /path/to/tts-ui
```

3. **数据库问题**
```bash
# 重新初始化数据库
rm tts_gateway.db
python -c "from app import init_db; init_db()"

# Windows系统字符编码问题
# 如果遇到 UnicodeDecodeError，请确保:
# 1. 系统区域设置支持UTF-8
# 2. 或者在PowerShell中设置编码:
$env:PYTHONIOENCODING="utf-8"
python -c "from app import init_db; init_db()"

# 测试数据库初始化
python test_db_init.py
```

4. **Docker 问题**
```bash
# 清理 Docker 缓存
docker system prune -f

# 重新构建镜像
docker build --no-cache -t tts-ui:latest .
```

### 日志查看

```bash
# Docker 日志
docker logs -f tts-ui

# 系统服务日志
sudo journalctl -u tts-gateway -f

# 应用日志 (如果配置了日志文件)
tail -f /var/log/tts-ui/app.log
```

## 性能优化

### 1. 生产环境配置
- 使用专业的 WSGI 服务器 (Gunicorn, uWSGI)
- 配置负载均衡器
- 使用缓存系统 (Redis, Memcached)

### 2. 资源监控
```bash
# 查看容器资源使用
docker stats tts-ui

# 查看系统资源
htop
free -h
df -h
```

## 更新和维护

### 更新应用
```bash
# Docker 部署
docker-compose pull
docker-compose up -d

# 源代码部署
git pull origin main
pip install -r requirements.txt
sudo systemctl restart tts-gateway
```

### 数据库迁移
如有数据库结构变更，请查看更新说明并执行相应的迁移脚本。

## 技术支持

如遇到问题，请：
1. 查看本部署指南
2. 检查应用日志
3. 提交 Issue 到项目仓库

---

**注意**: 在生产环境中，请确保：
- 更改默认密码
- 配置适当的防火墙规则
- 定期备份数据
- 监控系统资源使用情况
