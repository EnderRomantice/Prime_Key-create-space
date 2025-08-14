import "../output.css";
import { Link, useLocation } from "react-router-dom";

export default function Tabbar() {
  const location = useLocation();

  // 路由配置数据
  const navItems = [
    {
      path: "/",
      name: "首页",
      icon: (
        <svg
          className="w-7 h-7 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      )
    },
    {
      path: "/articles",
      name: "文章",
      icon: (
        <svg
          className="w-7 h-7 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      )
    },
    {
      path: "/life",
      name: "生活",
      icon: (
        <svg
          className="w-7 h-7 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      )
    },
    {
      path: "/projects",
      name: "项目",
      icon: (
        <svg
          className="w-7 h-7 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      )
    },
    {
      path: "/about",
      name: "关于",
      icon: (
        <svg
          className="w-7 h-7 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )
    }
  ];

  return (
    <nav className="z-10 fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-3 border border-gray-200/80">
      <div className="flex gap-6">
        {/* 常规导航项 */}
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className={`group p-3 rounded-xl flex flex-col items-center transition-all duration-300
              ${
                location.pathname === item.path
                  ? "bg-amber-100 text-amber-600" // 选中状态
                  : "text-gray-600 hover:bg-gray-100" // 默认状态
              }
              hover:scale-105 active:scale-95`}
          >
            <div className="relative">
              {item.icon}
              {/* 当前路由指示点 */}
              {location.pathname === item.path && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
              )}
            </div>
            <span className="text-xs mt-1.5 font-medium transition-colors">
              {item.name}
            </span>
          </Link>
        ))}

      </div>
    </nav>
  );
}