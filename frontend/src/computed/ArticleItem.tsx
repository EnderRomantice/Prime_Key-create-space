import { useState, useEffect } from "react";
import resMethod from "../tools/resMethod";
import { useParams } from "react-router-dom";
import Markdown from "../tools/Markdown";

export default function ArticleItem() {

  const GITHUB_URL = "https://github.com/login/oauth/authorize?client_id=Ov23liinjTY2DRWkuYqW"

  // const GITHUB_DEMO_URL = "https://github.com/login/oauth/authorize?client_id=e936bbcbe329278df4e1df024c9515d5f445d1df"

  const GITEE_URL = "https://gitee.com/oauth/authorize?client_id=01b84a7a90d75b0b09e13a0062251b33710c896a7254fb9f0aaf7262c60ac2bb&redirect_uri=https://rustlove.cn/login&response_type=code"

  // const GITEE_DEMO_URL = "https://gitee.com/oauth/authorize?client_id=405919d7eef4b20affdc4dc8704b49e62489f50fc75d9ca46d2a46b1567e2e77&redirect_uri=http://localhost:5173/login&response_type=code"

  const params = useParams();

  const [avatar, setAvatar] = useState<string | null>("");

  const [name, setName] = useState<string | null>("");


  // 文章详情状态
  const [artConnect, setConnect] = useState({
    id: undefined,
    title: "Loading..",
    excerpt: "Loading..",
    tag: "Loading..",
    date: "Loading..",
    views: "Loading..",
    content: "Loading..",
    likes: 0,
  });

  // 评论状态
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "Loading..",
      avatar:
        "https://sns-webpic-qc.xhscdn.com/202509151309/0cbc6c5b49d2a1a84429d824da075d05/1040g2sg31cm977noh0dg5p9nb2p38lkl0budrlg!nc_n_webp_mw_1",
      content: "暂无内容",
      date: "2025.9.15",
      art_id: 1,
    },
  ]);

  // 现在的评论
  const [nowComment, setNowComment] = useState("");

  // 重新请求评论
  const [reloadComments, setReloadComments] = useState(false);

  const handleComment = async () => {
    if (nowComment.trim() === "") {
      return;
    }

    if (!name || !avatar) {
      return;
    }

    let data = {
      name: name,
      avatar: avatar,
      content: nowComment,
      art_id: params.id,
    };
    console.log(data);
    await resMethod(`/articles/comment`, "POST", data);

    setReloadComments(!reloadComments);

    setNowComment("");
  };

  // 加载状态
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let name = localStorage.getItem("name");
    let avatar = localStorage.getItem("avatar");
    setAvatar(avatar);
    setName(name);

    console.log(name, avatar);
    async function fetchArticleDatas() {
      try {
        // 获取文章详情
        const articleResponse = await resMethod(
          `/articles/${params.id}`,
          "GET"
        );

        // 获取文章关联数据
        const contentResponse = await resMethod(
          `/articles/content/${params.id}`,
          "GET"
        );

        // 合并数据并更新状态
        setConnect({
          ...articleResponse,
          id: contentResponse.id,
          content: contentResponse.content,
          likes: contentResponse.likes,
        });

        // 获取评论
        const commentsResponse = await resMethod(
          `/articles/comment/${params.id}`,
          "GET"
        );

        setComments(commentsResponse);

        console.log(commentsResponse);

        // 加载完成
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article data:", error);
        setIsLoading(false); // 确保加载状态结束
      }
    }

    fetchArticleDatas();
    resMethod(`/articles/views/${params.id}`, "GET");
    console.log(artConnect);
  }, [reloadComments, params]);

  if (isLoading) {
    // 加载中
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl min-h-screen mx-auto px-4 py-8 ">
      {/* 文章内容区块 */}
      <article className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/80 mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {artConnect.title}
        </h1>
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
          {artConnect.tag}
        </span>
        <span className="text-gray-500 leading-relaxed space-y-6 mx-3">
          📅 {artConnect.date}
        </span>
        <span className="text-gray-500 leading-relaxed space-y-6 mx-3">
          👀 {artConnect.views}
        </span>
        <br />
        <Markdown connect={artConnect.content}></Markdown>
      </article>

      {/* 互动功能区域 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/80">
        {/* 评论列表 */}
        <div className="space-y-6 mb-8 text-black">
          <h2 className="text-xl font-bold flex justify-center">
            Article Comments
          </h2>

          <div className="flex flex-col space-y-5">
            <input
              value={nowComment}
              onChange={(e) => setNowComment(e.target.value)}
              type="text"
              placeholder="think never die..."
              className="w-full border-2 border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-400 h-20 hover:border-gray-500 transition-colors"
            />

            {!name ? (
              <div className="flex md:justify-between justify-center items-center flex-wrap bg-amber-100 p-4 rounded-md w-full">
                <div
                  onClick={() => {
                    localStorage.setItem("callback", params.id || "1");
                    setTimeout(() => {
                      window.location.href = GITHUB_URL;
                    }, 100);
                  }}
                  className="flex items-center justify-around m-2 bg-black p-auto text-center rounded-md text-white px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors w-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className=""
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Login in Github
                </div>

                <div
                onClick={() => {
                    localStorage.setItem("callback", params.id || "1");
                    setTimeout(() => {
                      window.location.href = GITEE_URL;
                    }, 100);
                  }}
                 className="flex items-center justify-around m-2 bg-white p-auto text-center rounded-md text-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors w-50">
                    <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1459" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="1460"></path></svg>
                  Login in Gitee
                </div>

                  
              </div>
            ) : (
              <div className="flex items-center justify-cente w-full">
                <div className="flex space-x-6 items-center w-full">
                  <img
                    src={
                      avatar ? avatar : "https://via.placeholder.com/150x150"
                    }
                    className="align-middle rounded-full w-15 h-15"
                  />
                  <div className="align-middle flex flex-col space-x-2 w-full">
                    <span>{name}</span>
                    <span className="text-gray-500">想说点什么？</span>
                  </div>
                </div>

                <div className="w-full flex justify-end">
                  <button
                    onClick={handleComment}
                    className="bg-black p-auto text-center rounded-md text-white px-4 py-2 text-sm hover:bg-green-500 transition-colors w-20"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex items-center justify-center space-x-4 p-6 my-10 w-full h-30"
              >
                <img
                  src={
                    comment.avatar
                      ? comment.avatar
                      : "https://via.placeholder.com/150x150"
                  }
                  className="align-middle rounded-full w-15 h-15"
                />
                <div className="w-full">
                  <h3 className="hover:text-amber-600 transition-colors">
                    {comment.username}
                  </h3>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
