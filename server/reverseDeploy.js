var path = require('path');
var log = require('fs');
var logfile = "./deployment_log.log";

var reverseDeploy = function(socket) {
  const spawn = require('child_process').spawn;
  var dockerComposeCommand = spawn('docker-compose', ['up','-d'], {cwd : "./reverse-proxy"});
  dockerComposeCommand.stdout.on('data', (data)=>{ 
    log.appendFile(logfile, "deployProject:dockerComposeCommand.stdout::" +data, function(error){
     if (error) return console.log(error);
   })
  }); 
  dockerComposeCommand.stderr.on('data', (data) => {
    log.appendFile(logfile, "deployProject:dockerComposeCommand.stderr::" +data, function(error){
     if (error) return console.log(error);
   })       
  });
  dockerComposeCommand.on('close', (code) => {  
    console.log(`child process exited with code ${code}`);
    log.appendFile(logfile, "Closer of docker compose.", function(error){
     if (error) return console.log(error);
   })        
  });
}

module.exports = reverseDeploy;