const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/auth', // The path you want to proxy (the backend API path)
        createProxyMiddleware({
            target: 'https://ec2-54-167-106-27.compute-1.amazonaws.com:3000', // The address of your backend server
            changeOrigin: true,
        })
    );
};
