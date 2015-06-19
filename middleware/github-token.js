var crypto=require('crypto');
module.exports=function *(){
  var secret=this.state.repository.secret;
  if(!secret){return;}
  var signature=this.headers['x-hub-signature'];
  if(!signature){this.throw('secret is configured but no signature was found');}
  var hmac=crypto.createHmac('sha1',secret);
  hmac.setEncoding('hex');
  hmac.write(this.request.rawBody);
  hmac.end();
  if('sha1='+hmac.read()!==signature){
    this.throw('secret and signature do not match');
  }
};