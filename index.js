const githubhook = require('githubhook');
const config = require('config');
const server = config.get('server');
server.logger = console;
const github = githubhook(server);
github.listen();
github.on('push',function(repo,ref,data){
  console.log({repo, ref, data});
});
