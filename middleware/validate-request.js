module.exports=validateRequest;
function validateRequest(config){
  console.log('validating request');
  return function(req,res,next){
    if(!req.body.repository||!req.body.repository.url){
      return next(new Error({status: 400, message: 'invalid JSON!'}));
    }
    var repo=_.find(config.repositories,{url: req.body.repository.url});
    if(!repo){
      return next(req.body.repository.url+' sent a webhook but is not configured.');
    }
    req.repository=repo;
    return next();
  };
}