from fastapi import APIRouter
from servers.login import githubCallback, giteeCallback

router = APIRouter()

@router.get("/login/github")
async def loginGithubCallback(code: str):
    return await githubCallback(code)

@router.get("/login/gitee")
async def loginGiteeCallback(code: str):
    return await giteeCallback(code)