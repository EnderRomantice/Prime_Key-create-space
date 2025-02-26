import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import { useState,  useEffect } from "react";
import Tabbar from "./computed/Tabbar.tsx";
import Master from "./computed/Master.tsx";
import Articles from "./computed/Articles.tsx";
import ArticleItem from "./computed/ArticleItem.tsx";
import Projects from "./computed/Projects.tsx";
import About from "./computed/About.tsx";
import Aurora from "./computed/reactbits/Aurora.tsx";
import "./output.css";

export default function App() {

  const [backColor, setBackColor] = useState(
    ["#BBFFFF", "#7FFFD4", "#00FFFF"]
 )
  return (
    <Router>
      {/* 主内容区 - 为底部Tabbar留出空间 */}
      <Aurora colorStops={backColor}></Aurora>
      <main className="min-h-screen pb-24">
        <Routes>
          <Route path="*" element={<Master />} />
          <Route path="/" element={<Master />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles/:id" element={<ArticleItem />} />
        </Routes>
      </main>

      {/* 底部导航栏 */}
      <Tabbar />
    </Router>
  )
}


