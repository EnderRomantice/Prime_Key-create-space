import sqlite3
# python已内置sqlite3的驱动
def get_db_connection():
    conn = sqlite3.connect('E:\\forum-project\\backend\\database.db')
    conn.row_factory = sqlite3.Row

    return conn