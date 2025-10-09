import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import resMethod from "../tools/resMethod";

export default function Login({type}: {type: string}) {
  const navigate = useNavigate();
  const location = useLocation();
  let callback = localStorage.getItem("callback");

  console.log(window.location.href)

  useEffect(() => {

    if (!callback) {
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

        let user;

        const login_list: Record<string, string> = {
          "github": `/login/github?code=${code}`,
          "gitee": `/login/gitee?code=${code}`,
        }

           user = await resMethod(login_list[type], "GET");

         if (user.username || user.avatar) {
          console.log("登录成功:", user);
          localStorage.setItem("name", user.username);
          localStorage.setItem("avatar", user.avatar);

        setTimeout(() => {
          navigate(`/articles/${callback}`);
        }, 1000);

        }

        
      } catch (error: any) {
        console.error("登录失败:", error);
        navigate(`/articles/${callback}`);
      }
    };

    logining();
  }, [navigate, location, callback]); 
  return <div>正在登录...</div>;
}