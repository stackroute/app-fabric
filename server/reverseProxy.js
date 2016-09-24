var fs = require("fs");
var path = require('path');

var reverseProxy = function(domain,socket) {
  fs.readFile('./template.conf', 'utf-8', function(err, data){
    if (err) throw err;
    console.log("file is read");

    var newValue = data.replace("#domanin#", domain).replace("#port#",8080);

    fs.writeFile('./reverse-proxy/proxy/root/etc/nginx/conf.d/jyotirmani-site1.conf',
     newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');
  });
});

}

module.exports = reverseProxy;
