from fastapi import APIRouter
from servers.about import getAllNow, getAllAbout

router = APIRouter()

@router.get("/about/now")
async def getNow() -> list:
    return await getAllNow()

@router.get("/about")
async def getAbout() -> list:
    return await getAllAbout()