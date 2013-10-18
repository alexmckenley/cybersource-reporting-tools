var https = require('https');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('reporting.html');

http.createServer(function(req, res){
	console.log("Request Received.", req.method);
	if(req.method === 'POST'){
		postRequest(req, res, function(){
			console.log("Completed posting back.")
		});
	}
	if(req.method === 'GET'){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(index);
		res.end();
	}
		

	// res.writeHead(200, { 
 //        'Content-Type': 'application/json',
 //        'Access-Control-Allow-Origin': '*' // implementation of CORS
 //    });


}).on('error', function(e){console.log("ERROR:", e)}).listen(80);
console.log("Server Running...");



var postRequest = function(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
        	saveReport(JSON.parse(queryData), function(data){
	        	response.writeHead(data.statusCode, data.headers);
	            response.write(data.body);
	            response.end();
	            callback();
        	});


        });

    } else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}

var buildData = function(query){
	query.ITWORKS = "SUCCESS WOO HOO!";
	return query;
};

var saveReport = function(params, callback){
	var response = {};

	var path = '/ebctest/DownloadReport/'
	+ params.year + '/'
	+ params.month + '/'
	+ params.day + '/'
	+ params.merchantID + '/'
	+ params.reportType + '.'
	+ params.reportFormat;

	//console.log(path);

	var options = {
	  hostname: "ebctest.cybersource.com",
	  path: path,
	  method: 'GET',
	  auth: 'alexmckenley' + ':' + 'Iaamo18245'
	};	



	var req = https.request(options, function(res) {
	  response.statusCode = res.statusCode;
	  console.log(res.statusCode);
	  response.headers = res.headers;
	  res.on('data', function(d) {
	    response.body += d;
	  });
	  res.on('end', function(){
	  	callback(response);


	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e);
	});

	req.end();

	return response;
};