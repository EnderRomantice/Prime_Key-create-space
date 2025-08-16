import aiosqlite
import os

async def get_db_connection():
    # 使用 os.path.join 自动适配 / 或 \
    db_path = os.path.join(os.getcwd(), "database.db")
    conn = await aiosqlite.connect(db_path)
    conn.row_factory = aiosqlite.Row
    return conn