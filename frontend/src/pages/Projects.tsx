import "../output.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import resMethod from "../tools/resMethod";

export default function Projects() {
  // 模拟项目数据
  const [projects, setProjects] = useState([
    {
      id: 0,
      title: "Lording..",
      descript: "Lording..",
      tech: ["Lording.."],
      progress: "Lording..",
      status: "Lording..",
      thumbnail: ""
    }
  ]);

  useEffect(()=>{
    resMethod('/projects', 'GET')
    .then(
      res => setProjects(res)
    )
    // fetch('http://127.0.0.1:8500/projects')
    //   .then(
    //     res => res.json()
    //   )
    //   .then(
    //     data => setProjects(data)
    //   )
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <main className="max-w-6xl mx-auto px-8 py-20">
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
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
            创意项目
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm">
              共 {projects.length} 个项目
            </span>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                全部
              </button>
              <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                进行中
              </button>
              <button className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors">
                已完成
              </button>
            </div>
          </div>
        </header>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {
          projects.map(project => (
            <article 
              key={project.id}
              className="group bg-white/90 backdrop-blur-sm rounded-[1.5rem] p-10 border-2 border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="space-y-8">
                {/* 项目封面 */}
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-1.5 rounded-full text-sm shadow-sm">
                    {project.status === "进行中" ? (
                      <span className="text-amber-600">🚧 {project.status}</span>
                    ) : (
                      <span className="text-emerald-600">✅ {project.status}</span>
                    )}
                  </div>
                </div>

                {/* 内容区块 */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h2>
                    <div className="flex space-x-3">
                      <Link 
                        to={`/projects/${project.id}`} 
                        className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>开发进度</span>
                      <span>{project.progress}%</span>
                    </div>
                  </div>

                  {/* 项目描述 */}
                  <p className="text-gray-600 leading-relaxed">
                    {project.descript}
                  </p>

                  {/* 技术栈标签 */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}