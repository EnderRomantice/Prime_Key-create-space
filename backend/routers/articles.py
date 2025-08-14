from fastapi import APIRouter
from servers.articles import getArticlesList, getArticleInfoByID, getArticleByID, addArticleView, addArticleLike, removeArticleLike

router = APIRouter()

@router.get("/articles/list")
async def getArtcles() -> list:
    return await getArticlesList()

@router.get("/articles/{id}")
async def getArtclesInfo(id: int) -> dict:
    return await getArticleByID(id)

@router.get("/articles/connect/{id}")
async def getArtclesInfo(id: int) -> dict:
    return await getArticleInfoByID(id)

@router.get("/articles/views/{id}")
async def addView(id: int) -> None:
    return await addArticleView(id)

@router.get("/articles/like/add/{id}")
async def addLike(id: int) -> None:
    return await addArticleLike(id)

@router.get("/articles/like/remove/{id}")
async def removeLike(id: int) -> None:
    return await removeArticleLike(id)