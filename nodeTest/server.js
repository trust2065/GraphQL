var http = require("http");
var url = require("url");


function start(route, handle) {
    function onRequest(request, response) {
        var pathName = url.parse(request.url).pathname;
        if (pathName !== '/favicon.ico') {
            console.log(`Request for ${pathName} received`);

            var content = route(pathName, handle);

            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(content);
            response.end();
        }
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;