import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// eslint-disable-next-line no-undef
const { createProxyMiddleware } = require('http-proxy-middleware');

const token = Cookies.get(ACCESS_TOKEN_KEY);
const router = {
  '/api': 'https://api-training.hrm.div4.pgtest.co/api/v1',
};
const attachToken = (proxyReq, req, res) => {
  proxyReq.setHeader(`Authorization`, `Bearer ${token}`);
};
// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-training.hrm.div4.pgtest.co/api/v1',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: attachToken,
      router,
      logLevel: 'debug',
    }),
  );
};
