var rawBody = require('raw-body');
module.exports=function*(next){
  var body=yield rawBody(this.req,{
    length: this.headers['content-length'],
    limit: '1mb',
    encoding: 'utf-8'
  });
  this.request.rawBody=body.toString();
  var json=JSON.parse(body);
  this.request.body=json;
  yield next;
};
