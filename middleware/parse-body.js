var rawBody = require('raw-body');
module.exports=function*(next){
  var body=yield rawBody(this.req,{
    length: this.length,
    limit: '1mb',
    encoding: this.charset
  });
  this.request.rawBody=body;
  var json=JSON.parse(body);
  this.request.body=json;
  yield next;
};
