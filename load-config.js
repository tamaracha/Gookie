var fs,yaml,_,winston,defaults;
fs=require('fs');
yaml=require('js-yaml');
winston=require('winston');
_=require('lodash');
defaults={
  port: 8001,
  host: "localhost",
  repositories: [],
  loggers: []
};

function formatUrl(url) {
  var match = url.match(/https?:\/\/(?:(?:www|api)\.)?github\.com\/(?:repos\/)?([a-zA-Z0-9\-]+)\/([a-zA-Z0-9\-]+)\/?/);
  try{
    return 'https://github.com/' + match[1].toLowerCase() + '/' + match[2].toLowerCase();
  }
  catch(e){
    throw 'Invalid repo URL ' + url;
  }
}

module.exports=function(){
  var config=yaml.safeLoad(fs.readFileSync('./config.yml','utf8'));
  config=_.merge(defaults,config);
  _.forEach(config.repositories,function(repo){
    repo.url=formatUrl(repo.url);
  });
  if(config.loggers.length>0){
    _.forEach(config.loggers,function(transport){
      var str=transport.name.charAt(0).toUpperCase();
      transport.name=str+transport.name.slice(1);
      winston.add(winston.transports[transport.name],transport);
    });
  }
  return config;
}