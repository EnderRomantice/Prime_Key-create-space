# middleware.py
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import aiosqlite


class DatabaseLogMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        # 获取客户端 IP
        client_host = request.client.host
        forwarded = request.headers.get("X-Forwarded-For")
        ip = forwarded.split(",")[0].strip() if forwarded else client_host

        # 异步记录日志到 SQLite
        try:
            async with aiosqlite.connect("access.db") as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(
                        "INSERT INTO access_logs (ip, path, method) VALUES (?, ?, ?)",
                        (ip, request.url.path, request.method)
                    )
                await conn.commit()
        except Exception as e:
            print(f"⚠️ 日志写入失败: {e}")

        # 继续处理请求
        response = await call_next(request)
        return response