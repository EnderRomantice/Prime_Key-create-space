from fastapi import APIRouter
from tools.link_db import get_db_connection
from tools.select_all import getSelectAll

router = APIRouter()

@router.get("/projects")
async def getProjects():
    datas = getSelectAll("projects")
    for data in datas:
        data["tech"] = data["tech"].split(",")
    return [
    {
      "id": data["id"],
      "title": data["title"],
      "descript": data["descript"],
      "tech": data["tech"],
      "progress": data["progress"],
      "status": data["status"],
      "thumbnail": data["thumbnail"]
    }
        for data in datas
  ]