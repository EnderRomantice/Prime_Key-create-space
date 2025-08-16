from tools.select_all import getSelectAll

async def getAllNow() -> list:
    return await getSelectAll("now")