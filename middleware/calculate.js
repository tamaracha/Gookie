const crypto=require('crypto');
function calculate(secret,body){
  return crypto.createHmac('sha1', secret)
  .update(body)
  .digest('hex');
}
module.exports = calculate;