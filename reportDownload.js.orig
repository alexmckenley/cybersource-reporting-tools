var https = require('https');
var http = require('http');
var fs = require('fs');
//var index = fs.readFileSync('reporting.html');


var params = {};
params.year = 2013;
params.month = 11;
params.day = 10;
params.merchantID = 'mckenley1';
params.reportType = 'TransactionExceptionDetailReport';
params.reportFormat = 'csv';
params.username = 'test';
params.password = 'password123';



var saveReport = function(params, callback){
	var response = {};

	//Create the URL
	var path = '/ebctest/DownloadReport/'
	+ params.year + '/'
	+ params.month + '/'
	+ params.day + '/'
	+ params.merchantID + '/'
	+ params.reportType + '.'
	+ params.reportFormat;

	//console.log(path);

	//Set the options for the GET request
	var options = {
	  hostname: "ebctest.cybersource.com",
	  path: path,
	  method: 'GET',
	  //Basic Authentication Credentials
	  auth: params.username + ':' + params.password
	};

	
	//Send the request and save the output as a file.
	var req = https.request(options, function(res) {
	  console.log('STATUS CODE: ', res.statusCode);
	  if(res.statusCode !== 200){
	  	console.log("Non Successful response code! ");
	  	  res.on('data', function(d) {
		    process.stdout.write(d);
		  });
		  res.on('end', function(){
		  	callback(res.statusCode);
		  });
	  }
	  else{
		  res.setEncoding('utf8');
		  res.on('data', function(d) {
		    output.write(d);
		  });
		  res.on('end', function(){
		  	output.end();
		  	callback(res.headers);
		  });
	  }


	}).on('error', function(e) {
	  console.log('error: ' + e);
	}).end(); //not sure if this the the correct thing to do?

};
var filename = params.reportType + '_' + params.month + '_' + params.day + '.' + params.reportFormat;

var output = fs.createWriteStream(filename);
console.log('Creating file', filename);

saveReport(params, function(result){
	console.log("Response: ", result);

});