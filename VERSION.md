# TTS-UI 正式版本 v1.1.0

## 版本信息
- **版本号**: v1.1.0
- **构建时间**: 2025年8月18日
- **Docker镜像**: tts-ui:latest
- **端口**: 7280

## 更新内容 (v1.1.0)
- 🚀 新增支持开源项目 [Gemini-balance](https://github.com/snailyp/gemini-balance) 调用TTS
- 🔊 自动检测PCM音频格式并添加WAV文件头，确保浏览器兼容性
- 🔧 优化音频响应处理，支持图片URL格式的音频数据
- ✨ 增强多格式请求兼容性，适配更多Gemini端点
- 📝 完善错误日志和调试信息

## 历史更新 (v1.0.0)
- 🔧 修复了源代码部署时的字符编码问题
- 🐳 重新构建了Docker镜像，确保稳定性
- 📦 简化镜像名称为 `tts-ui`
- ✅ 验证了所有功能正常工作

## 镜像详情
- **基础镜像**: python:3.11-slim
- **镜像大小**: 720MB
- **架构**: linux/amd64
- **健康检查**: 已启用

## 部署状态
- ✅ Docker镜像构建成功
- ✅ 本地镜像 tts-ui:latest 可用
- ✅ 数据库初始化正常
- ✅ 源代码部署编码问题已修复
- ✅ 健康检查通过
- ✅ 应用启动成功
- ✅ 端口7280可访问
- ✅ CSS错误已修复
- ✅ 用户登录功能正常

## 默认配置
- **用户名**: admin
- **密码**: admin
- **访问地址**: http://localhost:7280

## 快速启动
```bash
# 使用本地镜像
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  tts-ui:latest

# 使用docker-compose
docker-compose up -d
```

## 镜像标签
- `tts-ui:latest` - 唯一稳定版本
## 重要提醒
⚠️ **首次部署后请立即更改默认密码！**

---
*构建完成时间: 2025年8月18日*
