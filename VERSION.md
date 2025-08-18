# TTS-UI 企业级版本 v2.0.0

## 版本信息
- **版本号**: v2.0.0
- **构建时间**: 2025年8月18日
- **Docker镜像**: betsy0728/tts-ui:latest
- **端口**: 7280
- **重大更新**: 开放API服务上线

**📚 相关文档**: [完整API文档](API-README.md) - 详细使用说明和开发指南

## 🆕 更新内容 (v2.0.0)

### 核心功能增强
- 🌐 **开放API服务**: 全新RESTful API，支持外部系统调用
- 🔑 **API密钥管理**: 独立的密钥系统，支持创建、删除、统计
- 📊 **使用监控**: 详细的API调用统计和使用分析
- 🎨 **美化控制台**: 全新设计的API测试界面 (`/api.html`)
- 🔒 **安全增强**: API访问控制和速率限制
- 📈 **监控面板**: 实时的服务状态和性能监控

### API端点
- `GET /api/v1/health` - 健康检查
- `GET /api/v1/providers` - 获取支持的服务商
- `POST /api/v1/tts/synthesize` - TTS语音合成
- `GET /api/v1/usage` - 使用统计查询

### 技术改进
- 🏗️ **架构优化**: 分离的API管理模块
- 🎛️ **UI重构**: 独立的API管理页面
- 📋 **一键复制**: API端点和代码示例复制功能
- 🔐 **认证系统**: Bearer Token认证机制
- 📱 **响应式设计**: 移动端适配优化

## 历史更新 (v1.1.0)
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
- **Docker Hub**: betsy0728/tts-ui:latest

## 部署状态 (v2.0.0)
- ✅ Docker镜像构建成功并推送到Docker Hub
- ✅ 开放API服务正常运行
- ✅ API密钥管理系统可用
- ✅ 美化API控制台正常访问
- ✅ 使用统计功能正常
- ✅ 健康检查通过
- ✅ 认证系统正常工作
- ✅ 所有端点响应正常
- ✅ 容器化部署验证通过

## 默认配置
- **用户名**: admin
- **密码**: admin
- **Web访问**: http://localhost:7280
- **API控制台**: http://localhost:7280/api.html
- **API端点**: http://localhost:7280/api/v1/

## API使用指南
1. **登录Web界面**: 使用默认账户登录
2. **创建API密钥**: 在"API管理"页面创建密钥
3. **测试API**: 访问 `/api.html` 使用测试控制台
4. **集成开发**: 参考README.md中的API文档

## 安全建议
- 🔐 首次部署后立即更改默认密码
- 🔑 定期轮换API密钥
- 🛡️ 配置防火墙限制访问
- 📊 定期检查使用统计
- 💾 定期备份数据库

## 快速启动
```bash
# 使用Docker Hub镜像
docker run -d \
  --name tts-ui \
  -p 7280:7280 \
  -v tts_data:/app/data \
  --restart unless-stopped \
  betsy0728/tts-ui:latest
```

## 升级说明
如果从v1.x升级到v2.0：
1. 备份现有数据
2. 停止旧容器
3. 拉取新镜像
4. 启动新容器
5. 配置API密钥管理功能
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
