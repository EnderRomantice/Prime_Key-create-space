import "../output.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import resMethod from "../tools/resMethod.ts";

export default function Master() {

  //等待响应时数据
  const [MasterData, setMasterData] = useState({
      "title": "Loading...",
      "readme": "Loading...",
      "tips": "Loading...",      
      "artCount": "Loading...",
      "objectCount":"Loading...",
      "grow": {
        "read": "Loading...",
        "comment": "Loading...",
        "day": "Loading..."
      },
      "latestUpdates": [
        {
          "id": "Loading...",
          "title": "Loading...",
          "excerpt": "Loading...",
          "tag": "Loading...",
          "date": "Loading...",
          "readTime": "Loading...",
          "views": "Loading..."
      }
      ]
  
  });

  //副作用：获取数据
  useEffect(() => {
    resMethod('/master', 'GET')
    .then(
      data => 
        setMasterData(data)
    )
    // fetch('http://127.0.0.1:8500/master')
    // .then(
    //     res => res.json()
    //     .then(data => {
    //       setMasterData(data)
    //       console.log(data)
    //     })
    // )
  }, [])


  return (
  
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* 主内容容器 */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* 头部区域 */}
        <header className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 border border-gray-200/80">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            {MasterData.title}
            <span className="text-amber-600 ml-2">✨</span>
          </h1>
          <p className="text-gray-800 text-xl py-4 font-bold">
            {MasterData.readme} 😽
          </p>
          <p className="text-gray-400 text-lg leading-relaxed italic">
            每日Tips 🎻: <br/>{MasterData.tips}
          </p>
        </header>

        {/* 特色卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* 技术文章卡片 */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-amber-50 rounded-xl mr-4 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                技术文章
              </h2>
            </div>
            <p className="text-gray-600 mb-4">探索最新技术实践与深度解析</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>📚 已更新 {MasterData.artCount} 篇</span>
              <button className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
              <Link to={"/articles"}>查看全部 →</Link>
              </button>
            </div>
          </div>

          {/* 项目展示卡片 */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-purple-200 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-50 rounded-xl mr-4 group-hover:-rotate-12 transition-transform">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                创意项目
              </h2>
            </div>
            <p className="text-gray-600 mb-4">实践驱动的创新作品集合</p>
            <div className="animate-progress-bar h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>🚀 进行中项目 {MasterData.objectCount} 个</span>
              <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                <Link to={"/projects"}>探索项目 →</Link>
              </button>
            </div>
          </div>

          {/* 数据统计卡片 */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-emerald-200 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl mr-4 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                成长轨迹
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-amber-600">{MasterData.grow.read}</div>
                <div className="text-sm text-gray-500">累计阅读</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-purple-600">{MasterData.grow.comment}</div>
                <div className="text-sm text-gray-500">互动评论</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-emerald-600">{MasterData.grow.day}</div>
                <div className="text-sm text-gray-500">持续天数</div>
              </div>
            </div>
          </div>
        </div>

        {/* 最新动态区域 */}
        <section className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2">📌</span>
              最新动态
            </h2>
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
                <span>全部分类</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 动态列表 */}
          <div className="space-y-6">
        {MasterData.latestUpdates.map((update: any) => (
          <div 
            key={update.id}
            className="group p-6 rounded-xl border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                  {update.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {update.content}
                </p>
                <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
                  <span>📅 {update.date}</span>
                  <span>🕒 已阅读{update.readTime}分钟</span>
                  <span>🏷 {update.tag}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        </section>
      </main>
    </div>
  )
}