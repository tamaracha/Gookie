var path,winston,transports,Logger;
path=require('path');
winston=require('winston');
transports=winston.transports;
Logger=winston.Logger;

module.exports=logger;
function logger(config){
  var folder,filename,filepath,ConsoleTransport,fileTransport;
  folder=config.log.directory||'logs';
  filename=config.log.filename||'gookie.log';
  filepath=path.join(folder,filename);
  consoleTransport=new transports.Console({
    name: 'console',
    json: false,
    colorize: true,
    level: 'info'
  });
  fileTransport=new transports.File({
    name: 'file',
    //datePattern: '.yyyy-MM-dd',
    filename: filepath,
    timestamp: false,
    json: false,
    level: 'info'
  });
  return new Logger({transports: [consoleTransport,fileTransport]});
}