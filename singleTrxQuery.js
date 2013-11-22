var request = require('request');
var fs = require('fs');

request.post(
	{uri: 'https://ebctest.cybersource.com/ebctest/Query',
	auth: {
		user: "test",
		pass: 'password123'
	},
	form: {	
		merchantID: 'mckenley1',
		type: 'transaction',
		subtype: 'transactionDetail',
		//includeExtendedDetail: 'Related',
		//merchantReferenceNumber: '1382467240290',
		//targetDate: '20131022',
		requestID: '3824672402900176056166',
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