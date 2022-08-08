const { createProxyMiddleware } = require("http-proxy-middleware");
const PORT = process.env.PORT || 5000;
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: `http://localhost:${PORT}/`,
      chageOrigin: true,
      secure: false,
    })
  );
};
