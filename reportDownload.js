var https = require('https');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('reporting.html');

var params = {};
params.year = 2013;
params.month = 10;
params.day = 17;
params.merchantID = 'mckenley1';
params.reportType = 'PaymentBatchDetailReport';
params.reportFormat = 'csv';
params.username = 'username';
params.password = 'password';

saveReport(params, function(result){
	console.log("Response: ", result);
});

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
	  auth: params.username + ':' + params.password;
	};

	var req = https.request(options, function(res) {
	  response.statusCode = res.statusCode;
	  console.log(res.statusCode);
	  response.headers = res.headers;
	  res.setEncoding('utf8');
	  res.on('data', function(d) {
	    response.body += d;
	  });
	  res.on('end', function(){
	  	callback(response);
	  });
	}).on('error', function(e) {
	  console.log('problem with request: ' + e);
	}).end(); //not sure if this the the correct thing to do?

};