-- TTS Gateway 数据库架构

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TTS历史记录表
CREATE TABLE IF NOT EXISTS tts_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    provider TEXT NOT NULL,
    voice TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- API配置表
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
