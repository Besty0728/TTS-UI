# TTS-UI Docker 镜像使用指南

## 📦 公共镜像信息

**Docker Hub 仓库**: `betsy0728/tts-ui`

**镜像标签**: `betsy0728/tts-ui:latest` - 最新稳定版本

**镜像大小**: 720MB  
**基础镜像**: python:3.11-slim  
**架构**: linux/amd64

## 🚀 快速开始

### 方式一：直接运行 (推荐)

```bash
# 拉取并运行最新版本
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

### 方式二：使用 Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
services:
  tts-ui:
    image: betsy0728/tts-ui:latest
    container_name: tts-ui-app
    ports:
      - "7280:7280"
    environment:
      - FLASK_ENV=production
      - SECRET_KEY=${SECRET_KEY:-tts-ui-production-secret-key}
      - HOST=0.0.0.0
      - PORT=7280
    volumes:
      - tts_data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:7280/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  tts_data:
    driver: local
```

启动服务：
```bash
docker-compose up -d
```

### 方式三：持久化数据

```bash
# 创建数据卷
docker volume create tts_data

# 运行容器并挂载数据卷
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

## 🔧 配置选项

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `FLASK_ENV` | `production` | 运行环境 |
| `SECRET_KEY` | 自动生成 | 应用密钥 |
| `HOST` | `0.0.0.0` | 监听地址 |
| `PORT` | `7280` | 监听端口 |
| `DATABASE_PATH` | `/app/data/tts_gateway.db` | 数据库路径 |

### 端口说明

- **7280**: HTTP服务端口
- **容器内路径**: `/app/data` - 数据存储目录

## 📋 使用说明

### 1. 访问应用

启动容器后，在浏览器中访问：
```
http://localhost:7280
```

### 2. 默认登录

- **用户名**: `admin`
- **密码**: `admin`

⚠️ **重要**: 首次登录后请立即更改默认密码！

### 3. 基本管理命令

```bash
# 查看容器状态
docker ps | grep tts-ui

# 查看容器日志
docker logs tts-ui

# 重启容器
docker restart tts-ui

# 停止容器
docker stop tts-ui

# 删除容器
docker rm tts-ui

# 查看镜像信息
docker inspect betsy0728/tts-ui:latest
```

## 🔄 版本更新

### 更新到最新版本

```bash
# 停止现有容器
docker stop tts-ui
docker rm tts-ui

# 拉取最新镜像
docker pull betsy0728/tts-ui:latest

# 启动新容器
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

### 使用特定版本

```bash
# 使用稳定版本
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

## 🛡️ 安全建议

1. **更改默认密码**: 首次登录后立即更改
2. **限制网络访问**: 配置防火墙规则
3. **使用HTTPS**: 配置反向代理和SSL证书
4. **定期备份**: 备份 `/app/data` 目录
5. **监控日志**: 定期查看容器日志

## 🔍 故障排除

### 常见问题

#### 1. 容器无法启动
```bash
# 检查端口占用
netstat -tlnp | grep 7280

# 查看详细错误
docker logs tts-ui
```

#### 2. 无法访问应用
```bash
# 检查容器状态
docker ps -a | grep tts-ui

# 检查端口映射
docker port tts-ui
```

#### 3. 数据丢失
```bash
# 检查数据卷
docker volume ls | grep tts

# 查看数据卷详情
docker volume inspect tts_data
```

## 📞 技术支持

- **GitHub**: https://github.com/your-repo/tts-ui
- **Docker Hub**: https://hub.docker.com/r/betsy0728/tts-ui
- **问题反馈**: 创建 GitHub Issue

## 📄 许可证

本项目采用 MIT 许可证。

---

**镜像版本**: v1.0.0  
**发布时间**: 2025年8月17日  
**维护者**: betsy0728
