export default async function resMethod(url :string, method: string, params?: object): Promise<any> {

    // 生产环境与测试环境
    // const api = 'http://127.0.0.1:8500'

    const api = '/api'

        return await fetch(api + url,
             {
                 method: method,
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(params)
             })
        .then(
        res => res.json()
    )
}