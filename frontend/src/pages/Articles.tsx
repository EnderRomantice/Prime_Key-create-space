import "../output.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import resMethod from "../tools/resMethod";
import { motion } from "framer-motion"; 

export default function Articles() {
  const [articles, setArticles] = useState([
    {
      id: 0,
      title: "Loading...",
      excerpt: "Loading...",
      tag: "Loading...",
      date: "Loading...",
      views: "Loading...",
    },
  ]);

  useEffect(() => {
    resMethod(`/articles/list`, "GET").then((res) => {
      setArticles(res.data || res); 
    }).catch(() => {
      setArticles([]); 
    });
  }, []);

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
          {articles.length === 0 ? (
            <p className="text-center py-8 text-gray-500 col-span-3">
              暂无文章
            </p>
          ) : (
            articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 // 每个卡片依次出现
                }}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
              >
                <Link to={`/articles/${article.id}`} className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                      {article.tag}
                    </span>
                    <span className="text-gray-500 text-sm">📅 {article.date}</span>
                  </div>

                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👀 {article.views}</span>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                          />
                        </svg>
                      </button>
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