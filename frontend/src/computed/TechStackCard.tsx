import { motion } from "framer-motion";
import LegendItem from "./LegendItem";

export default function TechStackCard() {

    // 技术栈数据类型
    interface Technology {
        name: string;
        level: number;
        category: 'frontend' | 'backend' | 'styling' | 'database' | 'build';
    }

    const technologies: Technology[] = [
      { name: "React.js", level: 71, category: 'frontend' },
      { name: "Vue.js", level: 61, category: 'frontend' },
      { name: "TypeScript", level: 60, category: 'frontend' },
      { name: "Tailwind CSS", level: 60, category: 'styling' },
      { name: "Node.js", level: 71, category: 'backend' },
      { name: "Python", level: 72, category: 'backend' },
      { name: "FastAPI", level: 60, category: 'backend' },
      { name: "SQLite", level: 70, category: 'database' },
      { name: "Vite", level: 30, category: 'build' },
    ];
  
    const getColor = (category: string) => {
      switch(category) {
        case 'frontend': return 'bg-blue-500';
        case 'backend': return 'bg-green-500';
        case 'styling': return 'bg-cyan-400';
        case 'database': return 'bg-purple-400';
        case 'build' : return 'bg-amber-500';
        default: return 'bg-amber-500';
      }
    }
  
    return (
      <motion.div 
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg 
            className="w-6 h-6 text-amber-600 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          技术能力矩阵
        </h3>
  
        <div className="space-y-6">
          {technologies.map((tech, index) => (
            <motion.div 
              key={tech.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">{tech.name}</span>
                <span className="text-amber-600 font-medium">{tech.level}%</span>
              </div>
              
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`${getColor(tech.category)} h-full rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 50
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
  
        {/* 图例说明 */}
        <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-wrap gap-6">
          <LegendItem color="bg-blue-500" label="前端技术" />
          <LegendItem color="bg-green-500" label="后端技术" />
          <LegendItem color="bg-cyan-400" label="样式设计" />
          <LegendItem color="bg-purple-400" label="数据库" />
          <LegendItem color="bg-amber-500" label="构建工具" />
        </div>
      </motion.div>
    )
  }