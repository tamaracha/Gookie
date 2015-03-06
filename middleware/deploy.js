var childProcess=require('child_process');
module.exports=function(req,res,next){
  var command = 'cd "' + req.repository.directory + '" && ' + req.repository.command;
  childProcess.exec(command,function(err,stdout,stderr){
    return next();
  });
};