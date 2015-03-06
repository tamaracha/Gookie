var _,defaults;
_=require('lodash');
defaults=require('./default-config');

function formatUrl(url) {
  var match = url.match(/https?:\/\/(?:(?:www|api)\.)?github\.com\/(?:repos\/)?([a-zA-Z0-9\-]+)\/([a-zA-Z0-9\-]+)\/?/);
  try{
    return 'https://github.com/' + match[1].toLowerCase() + '/' + match[2].toLowerCase();
  }
  catch(e){
    throw 'Invalid repo URL ' + url;
  }
}

module.exports=loadConfig;
function loadConfig(){
  var config=require('../config.json');
  config=_.merge(defaults,config);
  _.forEach(config.repositories,function(repo){
    repo.url=formatUrl(repo.url);
  });
  return config;
}