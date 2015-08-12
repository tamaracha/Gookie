const githubhook = require('githubhook');
const github = githubhook({
  host: '127.0.0.1',
  port: 9000,
  path: '/',
  logger: console
});
github.listen();
github.on('*',function(e,repo){
  console.log(e);
});
