from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tools.select_all import getSelectAll, getSelectAllByID
from routers import articles, projects, assets
import random

app = FastAPI()

app.include_router(articles.router)
app.include_router(projects.router)
app.include_router(assets.router)

origins = [
    "http://localhost:5173",  # 允许的源
]

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # 允许发送凭据（如cookies）
    allow_methods=["*"],     # 允许所有的HTTP方法
    allow_headers=["*"],     # 允许所有的请求头
)

@app.get("/master", summary="获取master组件数据", tags=["master"], description="获取master主页面，渲染的最新消息列表。")
async def get_latest_updates():
    tipsRandom = len(getSelectAll('tips'))
    RandomCount = random.randint(1, tipsRandom)
    tips = getSelectAllByID('tips',RandomCount)[0]

    master = getSelectAll('master')[0]
    datas = getSelectAll('articleList', 2, 0)
    project = getSelectAll('projects')
    return {
            "title": master["title"],
            "readme": master["readme"],
            "tips": tips['content'],
            "artCount": len(datas),
            "objectCount": len(project),
            "grow": {
                "read": 101,
                "comment": 5,
                "day": 15
            },
            "latestUpdates": [
                {
                    "id": data["id"],
                    "title": data["title"],
                    "excerpt": data["excerpt"],
                    "tag": data["tag"],
                    "date": data["date"],
                    "readTime": data["readTime"],
                    "views": data["views"],
                }
                for data in datas
            ]
        }
