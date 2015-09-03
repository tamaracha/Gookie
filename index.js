'use strict';
const child = require('child_process');
const githubhook = require('githubhook');
const config = require('config');
const server = config.get('server');
const repos = config.get('repositories');
const github = githubhook(server);
github.listen();
github.on('push',function(repo,ref,data){
  const repoConfig = repos[repo];
  if(!repoConfig){
    return;
  }
  child.exec(repoConfig.deploy,{cwd: repoConfig.path},function(err,stdout,stderr){
    if(err){
      console.error(err);
    }
    if(stdout){
      console.log(stdout);
    }
    if(stderr){
      console.warn(stderr);
    }
  });
});
