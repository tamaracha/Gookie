var koa=require('koa');
var router=new require('koa-router')();
var app=koa();
require('koa-onerror')(app);
var config=require('config');
var server=config.get('server');
router.get('/',function *(){
  this.status=200;
});
router.post('/',
  require('./middleware/parse-body'),
  require('./middleware/validate-request'),
  require('./middleware/github-token'),
  require('./middleware/deploy'),
  function *(){
    this.status=204;
  }
);
app.use(router.routes())
.use(router.allowedMethods())
.listen(server.port,server.host,function(){
  console.log(`listening on ${server.host}:${server.port}`);
});