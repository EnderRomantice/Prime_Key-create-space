from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

URL = os.getcwd()

router = APIRouter()
@router.get("/assets/{fileName}")
async def getP1(fileName :str):
    #获取资源
    return FileResponse(f"{URL}/assets/{fileName}")