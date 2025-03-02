import sqlite3
import os

URL = os.getcwd()

def get_db_connection():
    conn = sqlite3.connect(f'{URL}\\database.db')
    conn.row_factory = sqlite3.Row

    return conn