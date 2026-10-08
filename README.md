# HelloWorld 网站（Node.js）

我的第一个AI开发的网站：浏览器访问显示问候语 + 当前服务器时间。

## 运行

```bash
node server.js
# 或
npm start
```

然后浏览器打开：http://localhost:3000

## 项目结构

```
hello-world-website/
├── package.json        # 项目描述与启动脚本
├── server.js           # HTTP 服务器（零第三方依赖）
├── public/
│   └── index.html      # 首页 HTML 模板
└── README.md           # 本说明
```

## 说明

- 使用 Node.js 内置 `http` 模块，无需 `npm install`，开箱即跑。
- 服务器时间在每次请求时由 `server.js` 动态生成（东八区），替换 HTML 中的 `{{SERVER_TIME}}` 占位符。
