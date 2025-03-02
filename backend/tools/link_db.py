import sqlite3
# python已内置sqlite3的驱动
def get_db_connection():
    conn = sqlite3.connect('C:\\projects\\Prime_Key-create-space\\backend\\database.db')
    conn.row_factory = sqlite3.Row

    return conn