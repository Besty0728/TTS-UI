#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据库初始化测试脚本
用于测试数据库初始化是否正常工作
"""

import os
import sys

# 确保能够导入app模块
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

def test_db_init():
    """测试数据库初始化"""
    try:
        # 删除现有数据库文件（如果存在）
        db_file = "tts_gateway.db"
        if os.path.exists(db_file):
            os.remove(db_file)
            print(f"已删除现有数据库文件: {db_file}")
        
        # 导入并初始化数据库
        from app import init_db, get_db, app
        
        print("开始测试数据库初始化...")
        init_db()
        
        # 验证表是否正确创建
        with app.app_context():
            db = get_db()
            
            # 检查users表
            users = db.execute("SELECT COUNT(*) FROM users").fetchone()[0]
            print(f"users表中的记录数: {users}")
            
            # 检查默认用户
            admin_user = db.execute("SELECT username FROM users WHERE username = 'admin'").fetchone()
            if admin_user:
                print("✅ 默认管理员用户创建成功")
            else:
                print("❌ 默认管理员用户创建失败")
            
            # 检查其他表
            tables = ["tts_history", "api_settings"]
            for table in tables:
                try:
                    db.execute(f"SELECT COUNT(*) FROM {table}").fetchone()
                    print(f"✅ {table} 表创建成功")
                except Exception as e:
                    print(f"❌ {table} 表创建失败: {e}")
        
        print("\n🎉 数据库初始化测试完成！")
        return True
        
    except Exception as e:
        print(f"❌ 数据库初始化测试失败: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_db_init()
    sys.exit(0 if success else 1)
