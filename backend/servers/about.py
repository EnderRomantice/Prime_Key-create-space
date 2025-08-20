from tools.select_all import getSelectAll

async def getAllNow() -> list:
    return await getSelectAll("now")

async def getAllAbout() -> list:
    return await getSelectAll("about")