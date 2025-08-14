from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tools.select_all import getSelectAll, getSelectAllByID
import random

app = FastAPI()

app.include_router()


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
async def getMasterInfo() -> dict:

    pass

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8500,)