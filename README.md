### Prime_Key-create-space

![页面展示](https://gitee.com/rustlove/Prime_Key-create-space/raw/master/backend/assets/Master.png)
![页面展示2](https://gitee.com/rustlove/Prime_Key-create-space/raw/master/backend/assets/About.png)

#### 使用方法

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


#### 技术选型

##### 前端

基本组件: React + TSX, 部分特效来自reactbits, 所有CSS样式使用Tailwind CSS

Markdown渲染 + 代码高亮: react-markdown, prism-react-renderer

网络请求: fetch

##### 后端

Python + FastAPI + SQLite
