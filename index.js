var express,bodyParser,methodOverride,winston,config,app;
express=require('express');
bodyParser=require('body-parser');
methodOverride=require('method-override');
winston=require('winston');
config=require('./load-config')();
app=express();
app.use(methodOverride());
app.route('/')
.get(function(req,res){
  return res.sendStatus(200);
})
.post(
  bodyParser.text({type: 'application/json'}),
  require('./middleware/parse-body'),
  require('./middleware/validate-request')(config),
  require('./middleware/github-token'),
  require('./middleware/deploy'),
function(req,res){
  if(req.body.zen){
    winston.info('Ping event from ' + req.body.repository.url + ' with zen: ' + req.body['zen']);
  }
  else{
    winston.verbose('User ' + req.body.pusher.name + ' pushed to ' + req.body.repository.url);
  }
  return res.sendStatus(204);
});
app.use(function(err,req,res,next){
  winston.error(err);
  return res.sendStatus(err.status||500);
});
app.listen(config.port);
winston.info('listening on port %d',config.port);