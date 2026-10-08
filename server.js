// server.js —— 极简 Node.js HTTP 服务器（零第三方依赖，开箱即跑）
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0'; // 监听所有网卡，局域网内也可访问

const server = http.createServer((req, res) => {
  // 只处理首页请求，其余路径一律返回 404
  if (req.url === '/' || req.url === '/index.html') {
    try {
      // 读取 HTML 模板
      const htmlPath = path.join(__dirname, 'public', 'index.html');
      let html = fs.readFileSync(htmlPath, 'utf-8');

      // 生成当前服务器时间（东八区）
      const serverTime = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      // 用服务器时间替换模板中的占位符
      html = html.replace('{{SERVER_TIME}}', serverTime);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('服务器内部错误：' + err.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, HOST, () => {
  console.log('==============================================');
  console.log('  HelloWorld 网站已启动！');
  console.log('  本机访问: http://localhost:' + PORT);
  console.log('  局域网访问: http://' + getLocalIP() + ':' + PORT);
  console.log('  按 Ctrl+C 停止服务');
  console.log('==============================================');
});

// 获取本机局域网 IP（用于提示，不影响功能）
function getLocalIP() {
  const os = require('os');
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}
