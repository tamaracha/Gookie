var express,bodyParser,methodOverride,config,logger,app;
express=require('express');
bodyParser=require('body-parser');
methodOverride=require('method-override');
config=require('./lib/load-config')();
logger=require('./lib/logger')(config);
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
    logger.info('Ping event from ' + req.body.repository.url + ' with zen: ' + req.body['zen']);
  }
  else{
    logger.verbose('User ' + req.body.pusher.name + ' pushed to ' + req.body.repository.url);
  }
  return res.sendStatus(204);
});
app.use(function(err,req,res,next){
  logger.error(err);
  return res.sendStatus(err.status||500);
});
app.listen(config.port);
logger.info('listening on port %s',config.port);