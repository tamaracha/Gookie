var crypto=require('crypto');
module.exports=function(req,res,next){
  console.log('validating token');
  var secret=req.repository.secret;
  if(!secret){return next();}
  var signature=req.headers['x-hub-signature'];
  if(!signature){return next('secret is configured but no signature was found');}
  var hmac=crypto.createHmac('sha1',secret);
  hmac.setEncoding('hex');
  hmac.write(req.rawBody);
  hmac.end();
  if('sha1='+hmac.read()!==signature){
    return next('secret and signature do not match');
  }
  next();
};