<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=160&section=header&text=🌈%20你好啊，欢迎来到TTS-UI%20API文档%20✨&fontSize=28&fontColor=fff&animation=twinkling&fontAlignY=40" />

# TTS-UI v2.0 API 完整文档

## 📋 概述

TTS-UI v2.0 提供完整的RESTful API服务，支持外部系统调用文本转语音功能。API使用Bearer Token认证，支持多种TTS服务商和音频格式。

## 🔑 认证系统

### API密钥获取

1. **登录Web界面**
   - 访问: `http://localhost:7280`
   - 使用管理员账户登录

2. **创建API密钥**
   - 进入"API管理"页面
   - 点击"创建API密钥"按钮
   - 复制生成的密钥（关闭页面后无法再次查看）

3. **使用API密钥**
   ```bash
   # 在请求头中包含认证信息
   Authorization: Bearer YOUR_API_KEY
   ```

### 密钥管理功能

- ✅ **创建密钥**: 生成新的API访问密钥
- ✅ **删除密钥**: 撤销现有的API密钥
- ✅ **使用统计**: 查看详细的调用统计数据
- ✅ **访问控制**: 基于密钥的权限验证

## 🌐 API端点

### Base URL
```
http://localhost:7280/api/v1
```

### 1. 健康检查

**端点**: `GET /health`

**描述**: 检查服务健康状态和支持的服务商

**认证**: 不需要

**请求示例**:
```bash
curl "http://localhost:7280/api/v1/health"
```

**响应示例**:
```json
{
  "status": "healthy",
  "supported_providers": ["openai", "gemini"],
  "timestamp": "2025-08-18T15:30:00.000Z",
  "version": "2.0.0"
}
```

### 2. 获取支持的服务商

**端点**: `GET /providers`

**描述**: 获取当前支持的TTS服务商列表

**认证**: 需要API密钥

**请求示例**:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "http://localhost:7280/api/v1/providers"
```

**响应示例**:
```json
{
  "providers": [
    {
      "name": "openai",
      "display_name": "OpenAI TTS",
      "available": true,
      "voices": ["alloy", "echo", "fable", "nova", "onyx", "shimmer"]
    },
    {
      "name": "gemini",
      "display_name": "Gemini TTS",
      "available": true,
      "voices": ["Zephyr", "Puck", "Charon", "Kore", "Fenrir", "Leda"]
    }
  ]
}
```

### 3. TTS语音合成 (核心端点)

**端点**: `POST /tts/synthesize`

**描述**: 将文本转换为语音文件

**认证**: 需要API密钥

**请求参数**:
| 参数 | 类型 | 必需 | 描述 | 默认值 |
|------|------|------|------|--------|
| text | string | ✅ | 要转换的文本内容 | - |
| provider | string | ✅ | TTS服务商 (`openai` 或 `gemini`) | - |
| voice | string | ✅ | 语音类型 | - |
| format | string | ❌ | 音频格式 (`mp3`, `wav`, `opus`, `aac`, `flac`) | `mp3` |
| return_base64 | boolean | ❌ | 是否返回base64编码 | `false` |

**请求示例**:
```bash
curl -X POST "http://localhost:7280/api/v1/tts/synthesize" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is a test message.",
    "provider": "openai",
    "voice": "alloy",
    "format": "mp3",
    "return_base64": false
  }' \
  --output audio.mp3
```

**响应**:
- **成功**: 返回音频文件二进制数据
- **Content-Type**: `audio/mpeg` (根据format变化)
- **失败**: 返回JSON错误信息

### 4. 使用统计

**端点**: `GET /usage`

**描述**: 获取API密钥的使用统计信息

**认证**: 需要API密钥

**请求示例**:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "http://localhost:7280/api/v1/usage"
```

**响应示例**:
```json
{
  "api_key": "sk-****",
  "total_calls": 1250,
  "this_month": 320,
  "today": 45,
  "last_call": "2025-08-18T14:30:00.000Z",
  "created_at": "2025-08-01T10:00:00.000Z"
}
```

## 🎤 支持的语音

### OpenAI TTS 语音选项

| 语音名称 | 特征描述 | 适用场景 |
|----------|----------|----------|
| `alloy` | 平衡自然的声音 | 通用场景 |
| `echo` | 友好温暖的声音 | 客服、教育 |
| `fable` | 富有表现力 | 故事讲述 |
| `nova` | 温暖清晰 | 新闻播报 |
| `onyx` | 深沉权威 | 正式场合 |
| `shimmer` | 明亮乐观 | 广告宣传 |

### Gemini TTS 语音选项

| 语音类别 | 语音名称 |
|----------|----------|
| **经典语音** | `Zephyr`, `Puck`, `Charon`, `Kore` |
| **神话语音** | `Fenrir`, `Leda`, `Orus`, `Aoede` |
| **星座语音** | `Callirrhoe`, `Autonoe`, `Enceladus`, `Iapetus` |
| **天体语音** | `Umbriel`, `Algieba`, `Despina`, `Erinome` |
| **星名语音** | `Algenib`, `Rasalgethi`, `Laomedeia`, `Achernar` |
| **更多选项** | `Alnilam`, `Schedar`, `Gacrux`, `Pulcherrima` |

## 🔧 SDK和示例代码

### Python SDK

```python
import requests
import json

class TTSAPI:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def synthesize(self, text, provider="openai", voice="alloy", format="mp3"):
        """语音合成"""
        url = f"{self.base_url}/tts/synthesize"
        data = {
            "text": text,
            "provider": provider,
            "voice": voice,
            "format": format
        }
        
        response = requests.post(url, headers=self.headers, json=data)
        
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")
    
    def get_usage(self):
        """获取使用统计"""
        url = f"{self.base_url}/usage"
        response = requests.get(url, headers=self.headers)
        return response.json()

# 使用示例
api = TTSAPI("http://localhost:7280/api/v1", "YOUR_API_KEY")

# 合成语音
audio_data = api.synthesize("Hello, world!", "openai", "alloy")
with open("output.mp3", "wb") as f:
    f.write(audio_data)

# 查看统计
usage = api.get_usage()
print(f"总调用次数: {usage['total_calls']}")
```

### JavaScript SDK

```javascript
class TTSAPI {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };
    }

    async synthesize(text, provider = 'openai', voice = 'alloy', format = 'mp3') {
        const url = `${this.baseUrl}/tts/synthesize`;
        const data = { text, provider, voice, format };

        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.blob();
        } else {
            const error = await response.text();
            throw new Error(`API Error: ${response.status} - ${error}`);
        }
    }

    async getUsage() {
        const url = `${this.baseUrl}/usage`;
        const response = await fetch(url, { headers: this.headers });
        return await response.json();
    }
}

// 使用示例
const api = new TTSAPI('http://localhost:7280/api/v1', 'YOUR_API_KEY');

// 合成语音并播放
api.synthesize('Hello, world!', 'openai', 'alloy')
    .then(audioBlob => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    })
    .catch(error => console.error('Error:', error));
```

### cURL 示例集合

```bash
#!/bin/bash
# TTS API 测试脚本

API_KEY="YOUR_API_KEY"
BASE_URL="http://localhost:7280/api/v1"

# 1. 健康检查
echo "=== 健康检查 ==="
curl -s "${BASE_URL}/health" | jq

# 2. 获取服务商
echo -e "\n=== 支持的服务商 ==="
curl -s -H "Authorization: Bearer ${API_KEY}" \
     "${BASE_URL}/providers" | jq

# 3. OpenAI TTS 合成
echo -e "\n=== OpenAI TTS 合成 ==="
curl -X POST "${BASE_URL}/tts/synthesize" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello from OpenAI TTS!",
    "provider": "openai",
    "voice": "alloy",
    "format": "mp3"
  }' \
  --output openai_test.mp3

# 4. Gemini TTS 合成
echo -e "\n=== Gemini TTS 合成 ==="
curl -X POST "${BASE_URL}/tts/synthesize" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello from Gemini TTS!",
    "provider": "gemini",
    "voice": "Zephyr",
    "format": "wav"
  }' \
  --output gemini_test.wav

# 5. 使用统计
echo -e "\n=== 使用统计 ==="
curl -s -H "Authorization: Bearer ${API_KEY}" \
     "${BASE_URL}/usage" | jq

echo -e "\n=== 测试完成 ==="
```

## ❌ 错误处理

### HTTP状态码

| 状态码 | 含义 | 处理建议 |
|--------|------|----------|
| `200` | 成功 | 请求正常处理 |
| `400` | 请求错误 | 检查请求参数 |
| `401` | 认证失败 | 检查API密钥 |
| `403` | 访问被拒绝 | 检查权限设置 |
| `429` | 请求过于频繁 | 降低请求频率 |
| `500` | 服务器错误 | 联系技术支持 |

### 错误响应格式

```json
{
  "error": "详细错误信息",
  "code": "ERROR_CODE",
  "timestamp": "2025-08-18T15:30:00.000Z"
}
```

### 常见错误及解决方案

**1. 认证失败**
```json
{
  "error": "Invalid API key",
  "code": "INVALID_API_KEY"
}
```
**解决**: 检查API密钥是否正确，确保在请求头中正确设置

**2. 参数错误**
```json
{
  "error": "Missing required parameter: text",
  "code": "MISSING_PARAMETER"
}
```
**解决**: 检查请求参数是否完整

**3. 服务商不可用**
```json
{
  "error": "Provider 'openai' is not configured",
  "code": "PROVIDER_NOT_AVAILABLE"
}
```
**解决**: 确保在管理界面配置了相应的TTS服务商密钥

## 🔒 安全最佳实践

### 1. API密钥安全
- 🔐 **妥善保管**: API密钥具有完整的API访问权限
- 🚫 **避免泄露**: 不要在客户端代码中硬编码API密钥
- 🔄 **定期轮换**: 定期更换API密钥以提高安全性
- 📝 **访问日志**: 定期检查API使用统计和访问日志

### 2. 网络安全
- 🔒 **HTTPS**: 生产环境中使用HTTPS协议
- 🛡️ **防火墙**: 配置防火墙限制API访问
- 🌐 **域名限制**: 如需要可配置域名白名单
- 📊 **监控**: 实时监控API调用频率和异常

### 3. 使用限制
- ⏱️ **频率限制**: 控制API调用频率
- 📏 **文本长度**: 注意单次请求的文本长度限制
- 💾 **资源管理**: 合理管理生成的音频文件存储

## 📊 监控和调试

### 1. 使用API测试控制台

访问 `http://your-domain:7280/api.html` 使用Web控制台：

- 🎛️ **在线测试**: 直接在浏览器中测试API
- 📋 **代码生成**: 自动生成各种语言的示例代码
- 📊 **实时监控**: 查看服务状态和性能指标
- 🔍 **错误调试**: 详细的错误信息和调试建议

### 2. 日志和监控

- **服务状态**: 通过 `/health` 端点监控服务健康状态
- **使用统计**: 通过 `/usage` 端点查看详细的使用数据
- **错误日志**: 服务器端会记录详细的错误日志
- **性能监控**: 监控API响应时间和成功率

## 🚀 性能优化

### 1. 批量处理
对于大量文本转语音需求，建议：
- 🔄 **异步处理**: 使用异步方式处理多个请求
- ⏱️ **合理间隔**: 控制请求间隔避免频率限制
- 📦 **文本分段**: 将长文本分段处理以提高效率

### 2. 缓存策略
- 💾 **客户端缓存**: 缓存生成的音频文件避免重复请求
- 🎯 **智能缓存**: 根据文本内容和参数进行缓存判断
- 🗂️ **文件管理**: 定期清理不需要的音频文件

## 📞 技术支持

### 获取帮助
- 📚 **文档**: 查看完整的项目文档
- 💬 **Issue**: 在GitHub提交问题和建议
- 🔧 **调试**: 使用API控制台进行调试

### 联系方式
- **GitHub**: https://github.com/Besty0728/TTS-UI
- **Issues**: https://github.com/Besty0728/TTS-UI/issues
- **Wiki**: https://github.com/Besty0728/TTS-UI/wiki

## 📝 更新日志

### v2.0.0 (当前版本)
- ✨ 新增完整的RESTful API服务
- 🔑 实现独立的API密钥管理系统
- 📊 添加详细的使用统计功能
- 🎨 提供美化的API测试控制台
- 🔒 增强安全性和访问控制

### 后续版本规划
- 📦 批量处理API
- 🎵 更多音频格式支持
- 🌍 国际化多语言支持
- 🔗 Webhook回调功能

---

<p align="center">
  <strong>TTS-UI v2.0 - 企业级文本转语音API服务</strong>
</p>

<p align="center">
  <a href="https://github.com/Besty0728/TTS-UI">⭐ 给项目点个Star</a> | 
  <a href="https://github.com/Besty0728/TTS-UI/issues">🐛 报告问题</a> | 
  <a href="https://github.com/Besty0728/TTS-UI/wiki">📖 查看Wiki</a>
</p>
