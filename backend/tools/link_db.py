import aiosqlite
import os

URL = os.getcwd()

async def get_db_connection():
    conn = await aiosqlite.connect(f'{URL}\\database.db')
    conn.row_factory = aiosqlite.Row

    return conn