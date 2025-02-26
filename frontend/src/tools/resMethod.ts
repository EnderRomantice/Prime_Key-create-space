export default async function resMethod(url :string, method: string, params?: object): Promise<any> {

    const api = 'http://127.0.0.1:8500'

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