var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var help = require('./help');
module.exports = (PORT) => {
	var server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		var realPath = path.join("mock", pathname);
		var ext = path.extname(realPath);
		ext = ext ? ext.slice(1) : 'unknown';
		fs.exists(realPath, function(exists) {
			if(!exists) {
				response.writeHead(404, {
					'Content-Type': 'text/plain'
				});

				response.write("This request URL " + pathname + " was not found on this server.");
				response.end();
			} else {

				if(realPath.indexOf('.') !== -1) {
					fs.readFile(realPath, "binary", function(err, file) {
						if(err) {
							response.writeHead(500, {
								'Content-Type': 'text/plain'
							});
							response.end(err);
						} else {
							var contentType = mine[ext] || "text/plain";
							response.writeHead(200, {
								'Content-Type': contentType
							});
							response.write(file, "binary");
							response.end();
						}
					});
				} else {
					response.write("This request URL " + pathname + " was not found on this server.");
					response.end();
				}
			}
		});
	});
	server.listen(PORT);
	help.info(`mockServer 已经开启 本地端口: ${PORT}.`);
}