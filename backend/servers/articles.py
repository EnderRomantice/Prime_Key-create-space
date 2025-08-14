from tools.link_db import get_db_connection
from tools.select_all import getSelectAll

async def getArtclesList() -> list:
    return await getSelectAll('articleList')