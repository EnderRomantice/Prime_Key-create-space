# backend/tools/select_all.py

from typing import List, Dict, Any, Optional
import aiosqlite
from .link_db import get_db_connection


async def getSelectAll(
    table: str,
    start: Optional[int] = None,
    end: Optional[int] = None
) -> List[Dict[Any, Any]]:
    """
    查询表中所有数据或分页数据
    :param table: 表名
    :param start: 每页条数 (LIMIT)
    :param end: 偏移量 (OFFSET)
    :return: 字典列表
    """
    conn = await get_db_connection()
    try:
        # 如果任意参数为 None，查询所有
        if start is None or end is None:
            async with conn.execute(f"SELECT * FROM {table}") as cursor:
                rows = await cursor.fetchall()
        else:
            # ✅ 使用参数化 LIMIT/OFFSET，避免注入（虽然 LIMIT 不支持参数化，但这里假设 start/end 是可信的整数）
            async with conn.execute(
                f"SELECT * FROM {table} LIMIT ? OFFSET ?", (start, end)
            ) as cursor:
                rows = await cursor.fetchall()

        return [dict(row) for row in rows]

    except aiosqlite.Error as e:
        print(f"数据库查询错误: {e}")
        raise
    finally:
        await conn.close()  # ✅ await close


async def getSelectAllByID(
    table: str,
    id: int
) -> List[Dict[Any, Any]]:
    """
    根据 ID 查询数据
    :param table: 表名
    :param id: ID
    :return: 字典列表（可能为空）
    """
    conn = await get_db_connection()
    try:
        # ✅ 使用 ? 占位符防止 SQL 注入
        async with conn.execute(f"SELECT * FROM {table} WHERE id = ?", (id,)) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]
    except aiosqlite.Error as e:
        print(f"根据 ID 查询错误: {e}")
        raise
    finally:
        await conn.close()


# ✅ 增删改通用函数（异步 + 安全参数化）
async def CRUDByID(
    table: str,
    field: str,
    value: Any,
    id: int,
    operator: str = "+"
) -> bool:
    """
    通用增删改操作（例如：点赞数 +1，库存 -1）
    示例：UPDATE articleList SET views = views + 1 WHERE id = 5

    :param table: 表名
    :param field: 字段名（如 views, likes）
    :param value: 增加/设置的值
    :param id: 记录 ID
    :param operator: 操作符，如 '+', '-', '=', '*'
    :return: 是否成功
    """
    conn = await get_db_connection()
    try:
        # 先验证 operator 白名单，防止注入
        if operator not in ('+', '-', '=', '*', '/'):
            raise ValueError("非法操作符")

        # 构造 SQL（表名和字段名不能用 ? 参数化，需白名单校验或信任）
        # 建议：在实际项目中对 table 和 field 做白名单校验
        sql = f"UPDATE {table} SET {field} = {field} {operator} ? WHERE id = ?"

        # 执行
        cursor = await conn.cursor()
        await cursor.execute(sql, (value, id))
        await conn.commit()

        # 返回是否影响了行
        return cursor.rowcount > 0

    except (aiosqlite.Error, ValueError) as e:
        print(f"CRUD 操作失败: {e}")
        await conn.rollback()
        return False
    finally:
        await conn.close()