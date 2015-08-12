const calculate = require('./calculate');
module.exports=function *(next){
  if(!this.request.rawBody){
    this.throw('no content');
  }
  if(this.state.repository.secret){
    const result = calculate(this.state.repository.secret,this.request.rawBody);
    if (this.headers['x-hub-signature'] !== 'sha1=' + result) {
      this.throw('signature and secret do not match');;
    }
  }
  yield next;
};
