var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');
var util = require('util');

console.log("searching for Transaction...");

var parser = new xml2js.Parser();


request.post({
	uri: 'https://ebctest.cybersource.com/ebctest/Query',
	auth: {
		user: "test",
		pass: 'password123'
	},
	form: {	
		merchantID: 'mckenley1',
		type: 'transaction',
		subtype: 'transactionDetail',
		//includeExtendedDetail: 'Related',
		//merchantReferenceNumber: '1385499359317',
		//targetDate: '20131126',
		requestID: '3854998584920176056166',
		versionNumber: '1.7',
		}
	},
	function(error, response, body){
		parser.parseString(body, function (err, result) {
			console.log(util.inspect(result.Report.Requests, false, null));
			console.log('Done');
		});

		// var name = 'output.xml'
		// fs.writeFile(name, body);
		console.log("Status Code: ", response.statusCode);
		// console.log(body);
		// console.log("Wrote xml to ", name);
	}
);

    


