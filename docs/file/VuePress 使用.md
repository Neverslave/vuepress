# VuePress 使用

## 安装

[Vue press文档](https://www.vuepress.cn/guide/)

1. 新建文件夹

2. 进行初始化

   ```bash
   yarn init # npm init
   ```

   

3. 安装依赖

   `yarn add -D vuepress # npm install -D vuepress`

4. 创建docs文件夹及文件

   ```bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

5. 在package.json中添加一些scripts

   ```javascript
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",
       "docs:build": "vuepress build docs"
     }
   }
   ```

6. 启动服务

   ```
   yarn docs:dev # npm run docs:dev
   ```

   

   ## 主题配置

