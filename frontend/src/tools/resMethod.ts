export default async function resMethod(
  url: string,
  method: string,
  params?: object
): Promise<any> {

  // const api = "http://127.0.0.1:8500";
  const api = "/api"

  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (params && ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())) {
    config.body = JSON.stringify(params);
  }


  try {
    const response = await fetch(api + url, config);
    return await response.json();
  } catch (error) {
    console.error("请求失败:", error);
    throw error;
  }
}