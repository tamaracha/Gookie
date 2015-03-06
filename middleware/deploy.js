var winston,childProcess;
winston=require('winston');
childProcess=require('child_process');
module.exports=function(req,res,next){
  var command = 'cd "' + req.repository.path+'" && '+req.repository.deploy;
  childProcess.exec(command,function(err,stdout,stderr){
    if(err){return next(err);}
    if(stdout){winston.info(stdout);}
    if(stderr){winston.warn(stderr);}
    return next();
  });
};