import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tabbar from "./computed/Tabbar.tsx";
import Master from "./pages/Master.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleItem from "./computed/ArticleItem.tsx";
import Projects from "./pages/Projects.tsx";
import About from "./pages/About.tsx";
import Life from "./pages/Life.tsx";
import "./output.css";
import "./font.css";
import { backColorList } from "./tools/backColorList"


function AouterMotion({ children, keyProp }: {children: ReactNode, keyProp: string}) {
  return (
    <motion.div 
      key={keyProp} 
      initial={{ opacity: 0, x: '3%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '-3%' }} 
      transition={{ type: 'tween', duration: 0.3 }} 
    >
      
      {children}
    </motion.div>
  );
}



export default function App() {

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





 let backColor = backColorList[getRandomInt(0,4)]
  return (
    <Router>
      {/* 背景渲染 */}


      
      {/* 主内容区 - 为底部Tabbar留出空间 */}
      <main className={"min-h-full pb-20 bg-gradient-to-br text-white overflow-x-hidden bg-black-100" + backColor}>
        <AnimatePresence mode="wait"> {/* 使用 AnimatePresence 包裹 Routes */}
          <Routes location={window.location} key={window.location.pathname}>
            <Route path="*" element={
              <AouterMotion keyProp="master" children={<Master/>} />
            } />
            <Route path="/" element={
              <AouterMotion keyProp="home" children={<Master/>} />
            } />
            <Route path="/articles" element={
              <AouterMotion keyProp="articles" children={<Articles />} />
            } />
            <Route path="/life" element={
              <AouterMotion keyProp="life" children={<Life />} />
            } />
            <Route path="/projects" element={
              <AouterMotion keyProp="projects" children={<Projects />} />
            } />
            <Route path="/about" element={
              <AouterMotion keyProp="about" children={<About />} />
            } />
            <Route path="/articles/:id" element={
              <AouterMotion keyProp="articleItem" children={<ArticleItem />} />
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 底部导航栏 */}
      <Tabbar />
    </Router>
  )
}


