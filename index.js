'use strict';
const pm2 = require('pm2');
const githubhook = require('githubhook');
const config = require('config');
const server = config.get('server');
const repos = config.get('repositories');
const github = githubhook(server);
github.listen();
function pushHandler(repo,ref,data){
  const repoConfig = repos[repo];
  if(!repoConfig){
    return;
  }
  pm2.connect(function(){
    pm2.pullAndRestart(repo,function(err,out){
      if(err){
        console.error(err);
      }
      console.log(out);
      pm2.disconnect();
    });
  });
}
github.on('push',pushHandler);
