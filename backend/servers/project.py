from tools.select_all import getSelectAll

async def getProjectList() -> list:
    projectList = await getSelectAll("projects")

    for i in projectList:
        i["tech"] = i["tech"].split(",")

    return projectList