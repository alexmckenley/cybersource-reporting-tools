var request = require('request');
var fs = require('fs');

console.log("searching for Transaction...");

request.post({
	uri: 'https://ebctest.cybersource.com/ebctest/Query',
	auth: {

		//Enter your credentials here
		user: "USERNAME",
		pass: "PASSWORD"
	},
	form: {	

		//Enter your merchant ID here
		merchantID: 'MERCHANTID',
		
		type: 'transaction',
		subtype: 'transactionDetail',
		versionNumber: '1.7',

		//Enter your search parameters here (request ID or Merch. Ref. No.)
		requestID: 'REQUESTID',
		//includeExtendedDetail: 'Related',
		//merchantReferenceNumber: '1385499359317',
		//targetDate: '20131126'
		}
		
	},
	function(error, response, body){
		var name = 'output.xml'
		fs.writeFile(name, body);
		console.log("Status Code: ", response.statusCode);
		console.log(body);
		console.log("Wrote xml to ", name);
	}
);