import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import resMethod from "../tools/resMethod.ts";
import TextType from "../computed/reactbits/TextType.tsx";
import DecryptedText from "../computed/reactbits/DecryptedText.tsx";

export default function Master() {
  const [masterData, setMasterData] = useState({
    tips: "Loading...",
    articleCount: 3,
    projectCount: 1,
    readCount: 0,
    lifeCount: 0,
    friendCount: 0,
  });

  const [friendList, setFriendList] = useState([
    {
      id: 0,
      name: "Loading..",
      title: "Loading..",
      descript: "Loading..",
      img: "Loading...",
      contact: "",
      contact_type: "email",
    },
  ]);

  useEffect(() => {
    resMethod("/master", "get").then((res) => {
      setMasterData(res);
    });

    resMethod("/master/friend", "get").then((res) => {
      setFriendList(res);
    });
  }, []);

  return (
    <div>
      {/* 主内容容器 */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* 头部区域 */}
        <header className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 border border-gray-200/80">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            <TextType
              text={[
                "Hi !",
                "I am PK.",
                "Software engineer",
                "quantitative researcher",
                "Minecraft player",
              ]}
              typingSpeed={150}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              textColors={["black"]}
            />
          </h1>
          <p className="text-gray-800 text-xl py-4 font-bold">
            <DecryptedText
              text="Welcome to my blog 😽"
              animateOn="view"
              speed={150}
              revealDirection="center"
            />
          </p>

          <p className="text-gray-400 text-lg leading-relaxed italic">
            <DecryptedText
              text={masterData.tips}
              animateOn="view"
              speed={180}
              revealDirection="center"
            />

            <br />
          </p>
        </header>

        {/* 特色卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* 技术文章卡片 */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-amber-200 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-amber-50 rounded-xl mr-4 group-hover:rotate-12 transition-transform">
                <svg
                  className="w-8 h-8 text-amber-600"
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
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                articles
              </h2>
            </div>
            <p className="text-gray-600 mb-4">Public learn</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>total article {masterData.articleCount}</span>
              <button className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                <Link to={"/articles"}>any article →</Link>
              </button>
            </div>
          </div>

          {/* 项目展示卡片 */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-purple-200 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-50 rounded-xl mr-4 group-hover:-rotate-12 transition-transform">
                <svg
                  className="w-8 h-8 text-purple-600"
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
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                projects
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              The cycle of learning and practice
            </p>
            <div className="animate-progress-bar h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-1000"
                style={{ width: "75%" }}
              />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>total project {masterData.projectCount}</span>
              <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                <Link to={"/projects"}>explore →</Link>
              </button>
            </div>
          </div>

          {/* 数据统计卡片 */}
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 hover:border-emerald-200 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl mr-4 group-hover:rotate-12 transition-transform">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                milestone
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors flex flex-col items-center">
                <div className="text-2xl font-bold text-amber-600 text-center">
                  {masterData.readCount}
                </div>
                <div className="text-sm text-gray-500">read</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-purple-600">
                  {masterData.lifeCount}
                </div>
                <div className="text-sm text-gray-500">life</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-emerald-600">
                  {masterData.friendCount}
                </div>
                <div className="text-sm text-gray-500">Friends</div>
              </div>
            </div>
          </div>
        </div>

        {/* 友链 */}
        <section className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2"></span>
              Friend links
            </h2>
            Add
          </div>

          <div className="space-y-6 lg:flex flex-wrap justify-around">
            {friendList.map((friend: any) => (
              <a href={friend.contact} key={friend.id}>
                <div className="group p-6 m-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img
                      src={friend.img}
                      className="w-15 h-15 rounded-full flex-shrink-0"
                      alt={friend.name}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-600 transition-colors truncate">
                        {friend.name}
                      </h3>
                      <p className="text-gray-600 mt-2 truncate">
                        {friend.title}
                      </p>
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {friend.descript}
                      </p>
                      <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
                        <span>{friend.contact_type}:</span>
                        <span className="truncate">{friend.contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
