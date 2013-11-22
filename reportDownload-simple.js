var request = require('request');
var fs = require('fs');
//var index = fs.readFileSync('reporting.html');

//Padding function for date and month
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array((width - n.length) + 1).join(z) + n;
}

var params = {
	year: 2013,
	month: pad((new Date()).getUTCMonth() + 1, 2),
	day: pad((new Date()).getUTCDate() - 1, 2),
	merchantID: 'mckenley1',
	reportType: 'TransactionExceptionDetailReport',
	reportFormat: 'csv',
	username: 'test',
	password: 'password123'
};

var url = "https://ebctest.cybersource.com"
	+ '/ebctest/DownloadReport/'
	+ params.year + '/'
	+ params.month + '/'
	+ params.day + '/'
	+ params.merchantID + '/'
	+ params.reportType + '.'
	+ params.reportFormat;

console.log(url);
var filename = params.reportType + '_' + params.month + '_' + params.day + '.' + params.reportFormat;

request.get(url, {
	auth: {
		user: params.username,
		pass: params.password
	}
},
function(error, response, body){
	console.log(error ? error : response.statusCode);
  if(response.statusCode === 200){
  	fs.writeFile(filename, body, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("Filename: ", filename);
          console.log("The file was downloaded successfully!");
          
      }

  	});
  }
  else{
    console.log("Fetch URL:");
    console.log(url);
    console.log("There was a problem with the request!");
  }
});