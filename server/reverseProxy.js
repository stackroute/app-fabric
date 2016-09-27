var fs = require("fs");
var path = require('path');
var yaml = require('js-yaml');
var reverseDeploy = require('./reverseDeploy.js');


var reverseProxy = function(domain,socket,user,repoName) {
  var yamldata=fs.readFileSync(repoName + "/docker-compose.yml",{encoding: 'utf-8'});
  console.log(yamldata.toString());
  const yamlDataLines = yamldata.toString().split('\n').map((line) => { return line.trim(); });
  const portEntry = yamlDataLines[yamlDataLines.indexOf('ports:')+1].split(' ')[1].split(':')[0];
  console.log('portEntry: ' + portEntry);
  fs.readFile('./template.conf', 'utf-8', function(err, data){
    if (err) throw err;
    console.log("file is read");
    console.log(domain);    

    var newValue = data.replace("#domain#", domain).replace("#port#",portEntry);
    console.log(newValue);

    fs.writeFile('./reverse-proxy/proxy/root/etc/nginx/conf.d/' + user + '-' + domain + '.conf',
     newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');
      reverseDeploy(socket);

  });
});

}

module.exports = reverseProxy;
