from fastapi import APIRouter
from servers.life import getLifeList

router = APIRouter()

@router.get("/life/list")
async def getLife() -> list:
    return await getLifeList()