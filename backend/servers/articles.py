from datetime import datetime

from tools.link_db import get_db_connection
from tools.select_all import getSelectAll, getSelectAllByID


async def getArticlesList() -> list:
    return await getSelectAll('articleList')


async def getArticleByID(id: int) -> dict:
    info = await getSelectAllByID('articleList', id)
    return info[0]


async def getArticleInfoByID(id: int) -> dict:
    info = await getSelectAllByID('artContent', id)
    return info[0]



async def addArticleView(id: int) -> None:
    db = await get_db_connection()
    try:

        await db.execute('UPDATE articleList SET views = views + 1 WHERE id = ?', (id,))
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise e
    finally:
        await db.close()

async def getAllComments(id: str) -> list:
    db = await get_db_connection()
    try:

        async with db.execute(f"SELECT * FROM artComment WHERE art_id = ?", (id,)) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]
    except:
        print(f"获取评论失败")
        raise
    finally:
        await db.close()

async def addComment(name: str, avatar: str, content: str, art_id: int):

    db = await get_db_connection()
    try:
        current_date = datetime.now().strftime('%Y.%m.%d %H:%M:%S')
        await db.execute("INSERT INTO artComment (username, avatar, content, date, art_id) VALUES (?, ?, ?, ?, ?) ", (name, avatar, content, current_date, art_id))
        await db.commit()
        return {"msg": "评论已提交"}
    except:
        raise
    finally:
        await db.close()