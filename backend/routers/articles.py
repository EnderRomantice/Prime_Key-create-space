from fastapi import APIRouter
from servers.articles import getArtclesList

router = APIRouter()

@router.get("/articles/list")
async def getArtcles() -> list:
    return await getArtclesList()