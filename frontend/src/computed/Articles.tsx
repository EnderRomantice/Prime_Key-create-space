import "../output.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import resMethod from "../tools/resMethod";

export default function Articles() {
  const [pages, setPages] = useState(1)  // 模拟文章数据

  const pagesAdd = () => {
    articles.length > 1 ? setPages(pages + 1) : undefined
  }

  const pagesReduce = () => {
    pages != 1 ? setPages(pages - 1) : undefined
  }

  const [articles, setArticles] = useState( [
    {
      id: 0,
      title: "Lording..",
      excerpt: "Lording..",
      tag: "Lording..",
      date: "Lording..",
      readTime: "Lording..",
      views: "Lording.."
    },
  ]);

  useEffect(() => {
   
    resMethod(`/articles/list/${pages}`, 'GET')
    .then(
      res => {
      setArticles(res) 
    }
    )
    // fetch('http://127.0.0.1:8500/articles')
    // .then(
    //     res => res.json()
    // )
    // .then(
    //  data => setArticles(data)
    // )
  }, [pages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 文章列表容器 */}

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* 头部区域 */}
        <header className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 border border-gray-200/80">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-8 h-8 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            技术文章
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm">最新发布</span>
            <span>⚓ 第 {pages} 页</span>
          </div>
        </header>

        {/* 文章列表 */}
        <div className="space-y-8">
          {articles.map(article => (
            <article 
              key={article.id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-xl"
            >
              <Link to={"/articles/" + article.id}>
                <div className="flex justify-between items-start">
                  {/* 内容区块 */}
                  <div className="flex-1">
                    <div className="flex items-center mb-4 space-x-3">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                        {article.tag}
                      </span>
                      <span className="text-gray-500 text-sm">📅{article.date}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.readTime} 分钟前阅读
                      </span>
                      <span>👀 {article.views}</span>
                    </div>
                  </div>

                  {/* 交互按钮 */}
                  <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
              
            </article>
          ))}
        </div>

        {/* 分页控件 */} 
        <div className="mt-12 z-1 flex justify-center space-x-4">
          <button onClick={pagesReduce} className="z-2 px-5 py-2 bg-amber-100 text-amber-600 rounded-xl hover:bg-amber-200 transition-colors">
            上一页
          </button>
          <button onClick={pagesAdd} className="z-2 px-5 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
            下一页
          </button>
        </div>

      </main>
    </div>
  )
}


