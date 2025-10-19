import { motion } from "framer-motion";
import resMethod from "../tools/resMethod";
import { useQuery } from "@tanstack/react-query";

export default function Life() {
  interface LifeItem {
    id: number;
    title: string;
    excerpt: string;
    tag: string;
    date: string;
    url: string;
  }

  const resLifes = async () => {
    return await resMethod("/life/list", "GET");
  };

  const { data } = useQuery({
    queryKey: ["lifes"],
    queryFn: resLifes,
    refetchInterval: 1000 * 60 * 5, // 每 5 分钟刷新一次
    staleTime: 1000 * 60 * 5, // 5 minutes
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            live life
          </h1>
          <p className="text-gray-600 text-lg"> a little bit of everything </p>
        </header>

        {/* 卡片网格 */}

        {data === undefined ? (
          <p className="text-center py-8 text-gray-500 col-span-3">暂无动态</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((life: LifeItem, index: number) => (
              <motion.article
                key={life.id}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {/* 图片容器 */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={life.url}
                    alt={life.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm shadow-sm">
                    <span className="text-amber-600">{life.tag}</span>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors mb-3">
                    {life.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {life.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
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
                      <span className="text-center pt-1">{life.date}</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
