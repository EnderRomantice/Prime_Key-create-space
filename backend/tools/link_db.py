import aiosqlite
import os

async def get_db_connection():
    # 使用 os.path.join 自动适配 / 或 \
    db_path = os.path.join(os.getcwd(), "database.db")
    conn = await aiosqlite.connect(db_path)
    await conn.execute("PRAGMA journal_mode=WAL;")
    await conn.execute("PRAGMA cache_size=10000;")
    await conn.execute("PRAGMA synchronous=NORMAL;")
    conn.row_factory = aiosqlite.Row
    return conn