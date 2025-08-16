from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import articles, life, project, master, about
from tools.access_logs import DatabaseLogMiddleware

app = FastAPI()

app.include_router(articles.router)
app.include_router(life.router)
app.include_router(project.router)
app.include_router(master.router)
app.include_router(about.router)


origins = [
    "*",  # 允许的源
]

# 添加CORS中间件
app.add_middleware(DatabaseLogMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # 允许发送凭据（如cookies）
    allow_methods=["*"],     # 允许所有的HTTP方法
    allow_headers=["*"],     # 允许所有的请求头
)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8500,)