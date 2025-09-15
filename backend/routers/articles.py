from fastapi import APIRouter, Body
from servers.articles import getArticlesList, getArticleInfoByID, getArticleByID, addArticleView, getAllComments, addComment

router = APIRouter()

@router.get("/articles/list")
async def getArtcles() -> list:
    return await getArticlesList()

@router.get("/articles/{id}")
async def getArticlesInfo(id: int) -> dict:
    return await getArticleByID(id)

@router.get("/articles/content/{id}")
async def getArticleInfo(id: int) -> dict:
    return await getArticleInfoByID(id)

@router.get("/articles/views/{id}")
async def addView(id: int) -> None:
    return await addArticleView(id)

@router.get("/articles/comment/{id}")
async def getComments(id: str) -> list:
    return await getAllComments(id)

@router.post("/articles/comment")
async def submitComment(name: str = Body(),
                        avatar: str = Body(),
                        content: str = Body(),
                        art_id: int = Body()):
    return await addComment(name, avatar, content, art_id)