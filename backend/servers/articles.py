# servers/articles.py

from tools.link_db import get_db_connection
from tools.select_all import getSelectAll, getSelectAllByID


async def getArticlesList() -> list:
    return await getSelectAll('articleList')


async def getArticleByID(id: int) -> dict:
    info = await getSelectAllByID('articleList', id)
    return info[0]


async def getArticleInfoByID(id: int) -> dict:
    info = await getSelectAllByID('artConnect', id)
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



async def addArticleLike(id: int) -> None:
    db = await get_db_connection()
    try:
        await db.execute('UPDATE artConnect SET likes = likes + 1 WHERE id = ?', (id,))
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise e
    finally:
        await db.close()



async def removeArticleLike(id: int) -> None:
    db = await get_db_connection()
    try:
        await db.execute('UPDATE artConnect SET likes = likes - 1 WHERE id = ?', (id,))
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise e
    finally:
        await db.close()