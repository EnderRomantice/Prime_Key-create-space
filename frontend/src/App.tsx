import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState} from "react";
import Tabbar from "./computed/Tabbar.tsx";
import Master from "./pages/Master.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleItem from "./computed/ArticleItem.tsx";
import Projects from "./pages/Projects.tsx";
import About from "./pages/About.tsx";
import Aurora from "./computed/reactbits/Aurora.tsx";
import Life from "./pages/Life.tsx";
import "./output.css";
import "./font.css";

export default function App() {

  const [backColor] = useState<string[]>(
    ["#BBFFFF", "#7FFFD4", "#00FFFF"]
 )
  return (
    <Router>
      {/* 背景渲染 */}


      <Aurora colorStops={backColor}></Aurora>
      {/* 主内容区 - 为底部Tabbar留出空间 */}
      <main className="min-h-full pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <Routes>
          <Route path="*" element={<Master />} />
          <Route path="/" element={<Master />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/life" element={<Life />} />
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


