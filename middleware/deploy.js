var childProcess=require('child_process');
module.exports=function(req,res,next){
  var command = 'cd "' + req.repository.path+'" && '+req.repository.deploy;
  childProcess.exec(command,function(err,stdout,stderr){
    return next();
  });
};