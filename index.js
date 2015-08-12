'use strict';
const koa=require('koa');
const router=new require('koa-router')();
const app=koa();
require('koa-onerror')(app);
const config=require('config');
const server=config.get('server');
const parseBody = require('./middleware/parse-body');
const validateRequest = require('./middleware/validate-request');
const githubToken = require('./middleware/github-token');
const deploy = require('./middleware/deploy');

router.get('/',function *(){
  this.status=200;
});
router.post('/',
  parseBody,
  validateRequest,
  githubToken,
  function *(){
    this.status=204;
  }
);
app.use(router.routes())
.use(router.allowedMethods())
.listen(server.port,server.host,function(){
  console.log(`listening on ${server.host}:${server.port}`);
});
