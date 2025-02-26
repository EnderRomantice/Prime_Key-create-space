import "../output.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {useInView } from "react-intersection-observer";
import TechStackCard from "./TechStackCard";
import SocialLink from "./SocialLink";


export default function About() {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [imgUrl, setImgUrl] = useState("")

  useEffect(()=> {
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(
      res => res.json()
    )
    .then(
      data => {
        setImgUrl(data[0].url)
      }
    )
  }, [])

  // 动画配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* 头像区块 */}
        <motion.div 
          className="flex justify-center mb-20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
        >
          <div className="relative group">
            <img
              src={imgUrl}
              alt="个人头像"
              className="w-48 h-48 rounded-2xl object-cover shadow-2xl border-4 border-white/20 hover:border-amber-100 transition-colors"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>
        </motion.div>

        {/* 主要内容容器 */}
        <motion.div
          ref={ref}
          className="bg-white/90 backdrop-blur-lg rounded-[2rem] p-12 border border-gray-200/80 shadow-xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* 标题 */}
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-8"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              Prime_Key
            </span>
            <span className="mx-4 text-gray-300">|</span>
            <span className="text-gray-600">开源贡献者</span>
          </motion.h1>

          {/* 个人简介 */}
          <motion.div 
            className="text-lg text-gray-600 leading-relaxed mb-12 space-y-6"
            variants={itemVariants}
          >
            <p>🚀 CS在读 期望实习与合作机会</p>
            <p>💡 技术栈覆盖React生态、Node.js后端开发及Python图形化工具与数据科学</p>
            <p>🌱 持续探索前沿技术并在开源社区分享实践成果</p>
          </motion.div>

          {/* 技术栈卡片 */}
          <TechStackCard />

          {/* 社交链接 */}
          <motion.div 
            className="flex justify-center space-x-8 mt-16"
            variants={containerVariants}
          >
            <SocialLink 
              icon={<GithubIcon />} 
              href="https://github.com//EnderRomantice" 
              label="GitHub主页" 
            />
            <SocialLink
              icon={<TwitterIcon />}
              href="https://x.com/EnderRoman18112"
              label="Twitter账号"
            />
            <SocialLink
              icon={<GmailIcon />}
              href="https://enderromantic@gmail.com"
              label="Gmail邮箱"
            />
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}


// 图标组件 避免过度解耦所以不抽离
function GithubIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.448-2.51z"/>
    </svg>
  )
}

function GmailIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 18h-2V9.25L12 13 6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
    </svg>
  )
}
