from tools.select_all import getSelectAll

async def getLifeList() -> list:
    return await getSelectAll("lifeList")