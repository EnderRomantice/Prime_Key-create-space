from fastapi import APIRouter
from servers.project import getProjectList

router = APIRouter()

@router.get("/projects")

async def getProject() -> list:
    return await getProjectList()