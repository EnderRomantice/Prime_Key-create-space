import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import resMethod from "../tools/resMethod";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    let callback = localStorage.getItem("callback");

    if (callback == null || callback == "") {
      console.error("callback 为空");
      navigate("/articles");
      return;
    }
    const logining = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");

        if (!code) {
          console.error("URL 中没有 code:", location.search);
          navigate(`/articles/${callback}`);
          return;
        }


        const user = await resMethod(`/login/github?code=${code}`, "GET");

        if (!user.username || !user.avatar) {
          console.error("用户信息不完整:", user);
          throw new Error("用户信息缺失");
        }

        localStorage.setItem("username", user.username);
        localStorage.setItem("avatar", user.avatar);

          navigate(`/articles/${callback}`);
      } catch (error: any) {
        console.error("登录失败:", error);
          navigate(`/articles/${callback}`);
      }
    };

    logining();
  }, [navigate, location]); 

  return (
<></>
  );
}