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
  return child.exec(repoConfig.deploy,{cwd: repoConfig.path},function(err,stdout,stderr){
    if(err){return err;}
    if(stdout){
      console.log(stdout.toString());
    }
    if(stderr){
      console.error(stderr.toString());
    }
  });
});
