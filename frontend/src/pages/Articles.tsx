import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import resMethod from "../tools/resMethod";
import { motion } from "framer-motion";

export default function Articles() {
  interface artItem {
    id: number;
    title: string;
    excerpt: string;
    tag: string;
    date: string;
    views: string;
  }
  const resArts = async () => {
    return await resMethod("/articles/list", "GET");
  };

  const { data } = useQuery({
    queryKey: ["articles"],
    queryFn: resArts,
    refetchInterval: 1000 * 60 * 5, // 每 5 分钟刷新一次
    staleTime: 1000 * 60 * 5, // 5 分钟内数据过期
  });

  return (
    <div className={"min-h-screen"}>
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* 头部区域 */}
        <header className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 border border-gray-200/80">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-8 h-8 text-amber-600 mr-3"
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
            Public learn
          </h1>
          <p className="text-gray-600 text-lg"> The science of thinking </p>
        </header>

        {/* 文章网格布局容器 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data === undefined ? (
            <p className="text-center py-8 text-gray-500 col-span-3">
              暂无文章
            </p>
          ) : (
            data.map((art: artItem, index: number) => (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1, // 每个卡片依次出现
                }}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
              >
                <Link
                  to={`/articles/${art.id}`}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                      {art.tag}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="pt-1">{art.date}</span>
                    </span>
                  </div>

                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {art.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4  border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>watch: {art.views}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
