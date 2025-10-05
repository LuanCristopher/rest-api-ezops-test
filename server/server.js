const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://app.luanoliveira.exam.ezopscloud.tech',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

app.use('/', require('./route/postsRoute'));

app.use(function (error, req, res, next) {
  console.error('❌ Error handler:', error.message);

  if (error.message === 'Post already exists') {
    return res.status(409).send(error.message);
  }
  if (error.message === 'Post not found') {
    return res.status(404).send(error.message);
  }
  res.status(500).send(error.message);
});

app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
//teste de pipe run argo
