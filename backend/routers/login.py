from fastapi import APIRouter
from servers.login import githubCallback

router = APIRouter()

@router.get("/login/github")
async def loginGithubCallback(code: str):
    return await githubCallback(code)