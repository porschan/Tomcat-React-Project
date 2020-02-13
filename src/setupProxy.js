const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/VideoResourceServer', {
      // target: 'http://47.96.4.72:80',
      target: 'http://localhost:8282',
      changeOrigin: true,
      cookieDomainRewrite: {'*': 'localhost:3000'},
      cookiePathRewrite: {'*': '/'},
    }));
};
