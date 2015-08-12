var childProcess=require('child-process-promise');
module.exports=function *(next){
  var command = `cd "${this.state.repository.path}" && ${this.state.repository.deploy}`;
  var result=yield childProcess.exec(command);
  if(result.stdout){console.log(result.stdout);}
  if(result.stderr){console.warn(result.stderr);}
  yield next;
};
