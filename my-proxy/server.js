const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');  // Include CORS package

const app = express();

// Use CORS middleware to handle CORS requests
app.use(cors({
  origin: '*', // Adjust according to your needs
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', createProxyMiddleware({
  target: 'https://service-index-ai.ethics.hse.ru',
  changeOrigin: true,
  pathRewrite: { '^/api': '/' }
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000/api');
});
