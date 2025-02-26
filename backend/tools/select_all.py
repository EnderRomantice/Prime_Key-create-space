from tools.link_db import get_db_connection
def getSelectAll(table: str, start: int = None, end: int = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    #任一参数为空时，查询所有数据，否则分页查询
    if start is None or end is None:
        cursor.execute(f"SELECT * FROM {table}")
        rows = cursor.fetchall()
        conn.close()
        datas = [dict(row) for row in rows]
        return datas
    else:
        cursor.execute(f"SELECT * FROM {table} LIMIT {start} OFFSET {end}")
        rows = cursor.fetchall()
        conn.close()
        datas = [dict(row) for row in rows]
        return datas

def getSelectAllByID(table: str, id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table} WHERE id = {id}")
    rows = cursor.fetchall()
    conn.close()
    datas = [dict(row) for row in rows]
    return datas

def CRUDByID(table :str, data: str, id: int, count: int, type: str):
    #万用函数，用于增删改
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"UPDATE {table} SET {data} = {data} {type} {count} WHERE id = {id}")
    conn.commit()
    conn.close()
