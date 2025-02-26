from fastapi import APIRouter
from tools.select_all import getSelectAll, getSelectAllByID, CRUDByID

router = APIRouter()
@router.get("/articles/list/{page}")
async def getArticlesList(page: int) -> list:
    datas = getSelectAll("articleList", 2, (page - 1) * 2)
    return [
    {
      "id": data["id"],
      "title": data["title"],
      "excerpt": data["excerpt"],
      "tag": data["tag"],
      "date": data["date"],
      "readTime": data["readTime"],
      "views": data["views"]
    }
        for data in datas
  ]

@router.get("/articles/{id}")
async def getArticleItem(id: int) -> dict:
   datas = getSelectAllByID('articleList', id)
   data = datas[0]
   return {
    "id": data["id"],
    "title": data["title"],
    "excerpt": data["excerpt"],
    "tag": data["tag"],
    "date": data["date"],
    "readTime": data["readTime"],
    "views": data["views"],
   }

@router.get("/articles/connect/{id}")
async def getArticleItemConnect(id: int) -> dict:
   datas = getSelectAllByID('artConnect', id)
   data = datas[0]
   return {
    "id": data["id"],
    "connect": data["connect"],
    "like": data["like"]
  }

@router.post("/articles/like/{type}/{id}")
async def setLike(id: int, type: str) -> dict:
   datas= CRUDByID("artConnect", "like", id, 1, type)
   return {"data":datas}

@router.post("/articles/views/+/{id}")
async def setView(id: int) -> dict:
    datas= CRUDByID("articleList","views", id, 1, "+")
    return {"data":datas}