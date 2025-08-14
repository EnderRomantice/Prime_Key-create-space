from tools.get_count import get_count
from tools.select_all import getSelectAll
from tools.link_db import get_db_connection

async def getMasterInfo() -> dict:

    return {
        "tips": await get_random_tip(),
        "projectCount": await get_count("projects"),
        "articleCount": await get_count("articleList"),
        "lifeCount": await get_count("lifeList"),
        "friendCount": await get_count('friend'),
        "readCount": await get_count("access_logs", "access"),
    }

async def getFriendList() -> list:
    return await getSelectAll("friend")
async def get_random_tip() -> dict:
    db = await get_db_connection()
    try:
        async with db.execute("SELECT content FROM tips ORDER BY RANDOM() LIMIT 1") as cursor:
            row = await cursor.fetchone()
            if row:
                return row["content"]
            else:
                return {"tip": "暂无提示"}
    finally:
        await db.close()