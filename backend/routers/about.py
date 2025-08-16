from fastapi import APIRouter
from servers.about import getAllNow

router = APIRouter()

@router.get("/about/now")
async def getNow() -> list:
    return await getAllNow()