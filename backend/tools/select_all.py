
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
            async with conn.execute(
                f"SELECT * FROM {table} LIMIT ? OFFSET ?", (start, end)
            ) as cursor:
                rows = await cursor.fetchall()

        return [dict(row) for row in rows]

    except aiosqlite.Error as e:
        print(f"数据库查询错误: {e}")
        raise
    finally:
        await conn.close()


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

        async with conn.execute(f"SELECT * FROM {table} WHERE id = ?", (id,)) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]
    except aiosqlite.Error as e:
        print(f"根据 ID 查询错误: {e}")
        raise
    finally:
        await conn.close()
