import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import resMethod from '../tools/resMethod';
import { useParams } from 'react-router-dom';
import Markdown from '../tools/Markdown';

export default function ArticleItem() {
  const params = useParams();

  // 文章详情状态
  const [artConnect, setConnect] = useState({
    id: undefined,
    title: 'Loading..',
    excerpt: 'Loading..',
    tag: 'Loading..',
    date: 'Loading..',
    connect: 'Loading..',
    views: 'Loading..',
    likes: 0,
  });

  // 点赞状态管理
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 加载状态
  const [isLoading, setIsLoading] = useState(true);

  const setLike = (method: string, type: string) => {
      resMethod(`/articles/like/${type}/${params.id}` ,method)
  }

  // 点赞功能
   const handleLike = async () => {
    setIsLiked(!isLiked); //reacthooks是异步 会先执行增减逻辑
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    return isLiked ? setLike('GET', 'remove'): setLike('GET', 'add');
  };

  useEffect(() => {
    async function fetchArticleDatas() {
      try {
        // 获取文章详情
        const articleResponse = await resMethod(`/articles/${params.id}`, 'GET');

        // 获取文章关联数据
        const connectResponse = await resMethod(`/articles/connect/${params.id}`, 'GET');

        // 合并数据并更新状态
        setConnect({
          ...articleResponse,
          id: connectResponse.id,
          connect: connectResponse.connect,
          likes: connectResponse.likes,
        });

        // 初始化点赞状态
        setLikes(connectResponse.likes);
        setIsLiked(false);

        // 加载完成
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching article data:', error);
        setIsLoading(false); // 确保加载状态结束
      }
    }

    fetchArticleDatas();
    resMethod(`/articles/views/${params.id}`, "GET")
    console.log(artConnect)
  
  }, []);

  if (isLoading) {
    // 加载中
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 文章内容区块 */}
      <article className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/80 mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{artConnect.title}</h1>
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
          {artConnect.tag}
        </span>
        <span className='text-gray-500 leading-relaxed space-y-6 mx-3'>
          📅 {artConnect.date}
        </span>
        <span className='text-gray-500 leading-relaxed space-y-6 mx-3'>
          👀 {artConnect.views}
        </span>
        <br />
        <span className='text-gray-400 leading-relaxed space-y-6'>
          📝 {artConnect.excerpt}
        </span>
      <Markdown connect={artConnect.connect}></Markdown>
      </article>

      {/* 互动功能区域 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/80">
        {/* 点赞功能 */}
        <div className="flex items-center space-x-4 mb-8">
          <motion.button
            onClick={handleLike}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-rose-100 text-rose-500' : 'bg-gray-100 text-gray-600'
              }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.button>
          <span className="text-gray-600 font-medium">{likes} 人觉得很赞</span>
        </div>

        {/* 评论列表 */}
        <div className="space-y-6 mb-8">
          {/* TODO: 实现评论列表功能 */}
        </div>
      </div>
    </div>
  );
}