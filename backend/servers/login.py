import httpx
async def githubLogin(token: str):
    if not token:
        return {"msg": "未找到token"}

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url="https://api.github.com/user",
            headers={
                "accept": "application/json",
                "Authorization": f"Bearer {token}"
            }
        )
        user_data = response.json()
        if response.status_code == 200:
            user = {
                "username": user_data["login"],
                "avatar": user_data["avatar_url"]
            }

            print(user)

            return user

        else:
            return {"msg": "获取用户信息失败", "error": user_data}

async def giteeLogin(token: str):
    if not token:
        return {"msg": "未找到token"}

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url="https://gitee.com/api/v5/user",
            headers={
                "accept": "application/json",
                "Authorization": f"token {token}"
            }
        )
        user_data = response.json()
        if response.status_code == 200:
            user = {
                "username": user_data["login"],
                "avatar": user_data["avatar_url"]
            }

            print(user)

            return user

        else:
            return {"msg": "获取用户信息失败", "error": user_data}

async def githubCallback(code: str):

    DATA = {
                "client_id": "Ov23liinjTY2DRWkuYqW",
                "client_secret": "242dbc748b6334f8fcb1f71d7df83d3d25f79ad2",
                "code": code
            }

    DATA_DEMO = {
        "client_id": "Ov23liWpcaK2Woi7fV26",
        "client_secret": "e936bbcbe329278df4e1df024c9515d5f445d1df",
        "code": code
    }

    if not code:
        return {"msg": "未找到code"}

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url="https://github.com/login/oauth/access_token",
            data=DATA,
            headers={
                "accept": "application/json"
            }
        )
        token_data = response.json()
        print(token_data)

        return await githubLogin(token_data.get("access_token"))

async def giteeCallback(code: str):

    DATA = {
                "grant_type": "authorization_code",
                "client_id": "01b84a7a90d75b0b09e13a0062251b33710c896a7254fb9f0aaf7262c60ac2bb",
                "client_secret": "38f8bca5079034564535952fff5dbf436ea1bc014ba828628037bb50213ed5d6",
                "code": code,
                "redirect_uri": "https://rustlove.cn/login"
            }

    DATA_DEMO = {
                "grant_type": "authorization_code",
                "client_id": "405919d7eef4b20affdc4dc8704b49e62489f50fc75d9ca46d2a46b1567e2e77",
                "client_secret": "f78d49922140588e718d71dd394b6c6106f862e4ace07ab04ecff5f4e6ee86c2",
                "code": code,
                "redirect_uri": "http://localhost:5173/login"
            }


    if not code:
        return {"msg": "未找到code"}

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url="https://gitee.com/oauth/token",
            data=DATA,
            headers={
                "accept": "application/json"
            }
        )
        token_data = response.json()
        print(token_data)

        return await giteeLogin(token_data.get("access_token"))
