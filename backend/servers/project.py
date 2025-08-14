from tools.select_all import getSelectAll

async def getProjectList() -> list:
    return await getSelectAll("projects")