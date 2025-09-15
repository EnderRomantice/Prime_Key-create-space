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
async def githubCallback(code: str):
    if not code:
        return {"msg": "未找到code"}

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url="https://github.com/login/oauth/access_token",
            data={
                "client_id": "Ov23liinjTY2DRWkuYqW",
                "client_secret": "242dbc748b6334f8fcb1f71d7df83d3d25f79ad2",
                "code": code
            },
            headers={
                "accept": "application/json"
            }
        )
        token_data = response.json()
        print(token_data)

        return await githubLogin(token_data.get("access_token"))


