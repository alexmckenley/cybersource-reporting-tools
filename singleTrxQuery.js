var request = require('request');
var fs = require('fs');

console.log("searching for Transaction...");

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
		var name = 'output.xml'
		fs.writeFile(name, body);
		console.log("Status Code: ", response.statusCode);
		console.log(body);
		console.log("Wrote xml to ", name);
	}
);