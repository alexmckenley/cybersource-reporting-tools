var request = require('request');

request.post(
	{uri: 'https://ebctest.cybersource.com/ebctest/TransactionExceptionDetailReportRequest.do',
	 form: {	
		username:'test',
		merchantID: 'mckenley1',
		password: 'password123',
		startDate: '2013-10-22',
		endDate: '2013-10-23',
		startTime: '07:00:00',
		endTime: '07:00:00',
		format: 'xml'
		}
	},
	function(error, response, body){
		console.log("Finished: ", body);
	}
);