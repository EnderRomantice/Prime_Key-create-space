from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()
@router.get("/assets/{fileName}")
async def getP1(fileName :str):
    #获取资源
    return FileResponse(f"E:/forum-project/backend/assets/{fileName}")