var _=require('lodash');
var repositories=require('config').get('repositories');
module.exports=function *(){
  if(!this.request.body.repository||!this.request.body.repository.url){
    this.throw('invalid json');
  }
  var repo=_.find(repositories,{url: this.request.body.repository.url});
  if(!repo){
    this.throw(this.request.body.repository.url+' sent a webhook but is not configured.');
  }
  this.state.repository=repo;
};