/*
  服务器代码
  启动服务器指令
    node server.js
  访问服务器·地址：http://localhost:3035
*/ 
const express = require('express');
const app = express();

app.use(express.static('build',{maxAge:1000*3600}))

app.listen(3035)