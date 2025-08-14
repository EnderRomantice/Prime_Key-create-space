import "../output.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TechStackCard from "../computed/TechStackCard";
import SocialLink from "../computed/SocialLink";
import PixelTransition from "../computed/reactbits/PixelTransition";
import { GithubIcon, GmailIcon, WeChatIcon, QQIcon, GiteeIcon } from "../computed/Icons";

export default function About() {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [imgUrl, setImgUrl] = useState("https://foruda.gitee.com/avatar/1735578534702305405/15325054_rustlove_1735578534.png!avatar100");

  // useEffect(() => {        
  //   fetch("https://api.thecatapi.com/v1/images/search")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setImgUrl(data[0].url);
  //     });
  // }, []);

  // 动画配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center scroll-smooth">
      <main className="w-full py-24">
        {/* 头像区块 */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
        >
          <div className="relative group">
            <PixelTransition
              firstContent={
                <img
                  src={imgUrl}
                  alt="default pixel transition content, a cat!"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
              secondContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#111",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "3rem",
                      color: "#ffffff",
                    }}
                  >
                    Hum?
                  </p>
                </div>
              }
              gridSize={12}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>
        </motion.div>

        <motion.div className="flex justify-center gap-12 xl:flex-row flex-col mx-5">
          <motion.div
            ref={ref}
            className="bg-white/90 backdrop-blur-lg rounded-[2rem] p-12 border border-gray-200/80 shadow-sm transition hover:shadow-xl xl:w-1/3"
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
                PK
              </span>
                <span className="xl:visible invisible mx-4 text-gray-300">|</span>
                <span claKssName="xl:visible invisible text-gray-600">数字游民</span>

            </motion.h1>

            {/* 个人简介 */}
            <motion.div
              className="text-lg text-gray-600 leading-relaxed mb-12 space-y-6"
              variants={itemVariants}
            >
              <p>🚀 CS在读 期望实习与合作机会</p>
              <p>💡 技术栈覆盖前端生态、Python, Rust高性能后端开发</p>
              <p>🌱 热衷探索新鲜事物，持续成长中..</p>
            </motion.div>

            <motion.div>
              <motion.h2
                className="text-3xl font-bold text-gray-800 mb-8"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r text-gray-600">联络</span>
              </motion.h2>

              <motion.div
                className="grid grid-cols-2 gap-4 mb-12"
                variants={itemVariants}
              >
                <SocialLink
                  href="https://github.com/EnderRomantice"
                  icon={<GithubIcon />}
                  label="Github"
                ></SocialLink>
                <SocialLink
                  href="https://enderromantic@gmail.com"
                  icon={<GmailIcon />}
                  label="Gmail"
                ></SocialLink>
                <SocialLink
                  href="https://1537871968@qq.com"
                  icon={<QQIcon />}
                  label="QQ"
                ></SocialLink>
                <SocialLink
                  href="https://u.wechat.com/MA8QZaY06xvoIu8dOzrcH60?s=2"
                  icon={<WeChatIcon />}
                  label="Wechat"
                ></SocialLink>
                <SocialLink
                  href="https://gitee.com/Prime_Key"
                  icon={<GiteeIcon />}
                  label="Gitee"
                ></SocialLink>
              </motion.div>
            </motion.div>
          </motion.div>
          <TechStackCard />

          <motion.div
            ref={ref}
            className="bg-white/90 backdrop-blur-lg rounded-[2rem] p-12 border border-gray-200/80 shadow-sm transition hover:shadow-xl xl:w-1/3"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl font-bold text-gray-800 mb-8"
              variants={itemVariants}
            >
              <span className="text-gray-600">现在</span>
            </motion.h1>

            <motion.div
              className="text-lg text-gray-600 leading-relaxed mb-12 space-y-6 flex-nowrap"
              variants={itemVariants}
            >
              <p>⛽ 接单续命中...</p>
              <p>💼 准备暑假的实习ing</p>
              <p>🤔 构思未来，等待机会</p>
              <p>🎸 抽空练习吉他！</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
