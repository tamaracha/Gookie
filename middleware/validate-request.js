_=require('lodash');
module.exports=function(config){
  return function(req,res,next){
    if(!req.body.repository||!req.body.repository.url){
      return next('invalid JSON!');
    }
    var repo=_.find(config.repositories,{url: req.body.repository.url});
    if(!repo){
      return next(req.body.repository.url+' sent a webhook but is not configured.');
    }
    req.repository=repo;
    return next();
  };
}