var fs = require("fs");
var path = require('path');

var reverseProxy = function(domain,socket,user) {
  fs.readFile('./template.conf', 'utf-8', function(err, data){
    if (err) throw err;
    console.log("file is read");
    console.log(domain);    

    var newValue = data.replace("#domain#", domain).replace("#port#",8080);
    console.log(newValue);

    fs.writeFile('./reverse-proxy/proxy/root/etc/nginx/conf.d/' + user + '-' + domain + '.conf',
     newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');

  });
});

}

module.exports = reverseProxy;
