const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/auth', // The path you want to proxy (the backend API path)
        createProxyMiddleware({
            target: 'http://127.0.0.1:3003', // The address of your backend server
            changeOrigin: true,
        })
    );
};
