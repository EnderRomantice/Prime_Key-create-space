import { motion } from 'framer-motion'

// 社交链接组件
export default function SocialLink({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) {
    return (
      <motion.a
        href={href}
        target="_blank"
        className="p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-amber-400 transition-colors shadow-sm hover:shadow-md flex flex-col items-center"
        whileHover={{ y: -3 }}
      >
        <div className="w-8 h-8 text-gray-800 hover:text-amber-600 transition-colors">
          {icon}
        </div>
        <span className="mt-2 text-sm text-gray-600">{label}</span>
      </motion.a>
    )
  }