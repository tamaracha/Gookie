const child = require('child_process');
const githubhook = require('githubhook');
const config = require('config');
const server = config.get('server');
const repos = config.get('repositories');
server.logger = console;
const github = githubhook(server);
github.listen();
github.on('push',function(repo,ref,data){
  const repoConfig = repos[repo];
  if(!repoConfig){
    return;
  }
  const command = `cd ${repoConfig.path} && ${repoConfig.deploy}`;
  return child.exec(command,function(err,result){
    if(err){return err;}
    if(result.stdout){
      console.log(result.stdout);
    }
    if(result.stderr){
      console.error(result.stderr);
    }
  });
});
