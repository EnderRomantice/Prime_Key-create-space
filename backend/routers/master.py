from fastapi import APIRouter
from servers.master import getMasterInfo, getFriendList

router = APIRouter()
@router.get("/master")
async def getMaster() -> dict:
    return await getMasterInfo()

@router.get("/master/friend")
async def getFriend() -> list:
    return await getFriendList()