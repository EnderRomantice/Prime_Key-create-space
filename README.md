### Prime_Key-create-space



### ![页面展示](https://rustlove.cn/file/Master.webp)

😉 **该项目已上线：rustlove.cn**

### 🎨 设计原则 

- 保证用户阅读体验，路径索引简单清晰，底部tabbar更符合直觉。
- 毛玻璃仿苹果UI，现代感设计比例。 

#### 📕 使用方法

##### 克隆仓库
`git clone https://github.com/EnderRomantice/Prime_Key-create-space`

##### 安装Node.js依赖
`cd frontend`

`pnpm install`

#### 安装Python依赖

`cd backend`

创建虚拟环境

`python -m venv blog` (可以在.gitignore中更改排除文件)

激活虚拟环境

`blog\Scripts\activate`

安装依赖

`pip install -r requirements.txt`


#### 🔧 技术选型

##### 前端

基本组件: React + TSX, 部分特效来自reactbits, 所有CSS样式使用Tailwind CSS

Markdown渲染 + 代码高亮: react-markdown, prism-react-renderer

网络请求: fetch

##### 后端

Python + FastAPI + SQLite

#### ❓ 为什么选择SQLite?

使用aiosqlite赋予SQLite异步能力，增加了连接池来避免触发文件锁问题。

