var crypto=require('crypto');
module.exports=function *(next){
  const payload = this.request.rawBody.toString();
  const hmac = crypto.createHmac('sha1', this.state.repository.secret)
  .update(payload);
  const calculatedSignature = 'sha1=' + hmac.digest('hex');
  if (this.headers['x-hub-signature'] !== calculatedSignature) {
    this.throw('signature and secret do not match');;
  }
  /*
  var secret=this.state.repository.secret;
  if(!secret){return;}
  var signature=this.headers['x-hub-signature'];
  if(!signature){this.throw('secret is configured but no signature was found');}
  var hmac=crypto.createHmac('sha1',secret);
  hmac.setEncoding('hex');
  hmac.write(this.request.rawBody.toString());
  hmac.end();
  if('sha1='+hmac.read()!==signature){
    this.throw('secret and signature do not match');
  }
  */
  yield next;
};
