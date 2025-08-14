import aiosqlite
import os

URL = os.getcwd()
async def get_count( table: str, database: str = "database", where_clause: str = "", params: tuple = ()) -> int:
    """
    通用方法：获取指定表的记录数量（支持条件查询）

    :param database: 数据库
    :param table: 表名
    :param where_clause: WHERE 条件部分（不含 WHERE），例如 "path = ?"
    :param params: 参数元组，防止 SQL 注入
    :return: 记录数量
    """
    if not table.isidentifier():
        raise ValueError("Invalid table name")

    # 构建 SQL
    sql = f"SELECT COUNT(*) FROM {table}"
    if where_clause:
        sql += f" WHERE {where_clause}"

    try:
        async with aiosqlite.connect(f"{URL}\\{database}.db") as conn:  # 替换为你的数据库名
            async with conn.execute(sql, params) as cursor:
                result = await cursor.fetchone()
                return result[0] if result else 0
    except aiosqlite.Error as e:
        print(f"❌ 查询 {table} 记录数失败: {e}")
        raise