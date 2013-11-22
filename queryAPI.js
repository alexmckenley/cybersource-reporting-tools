var request = require('request');

var today = new Date();

request.post({
		uri: 'https://ebctest.cybersource.com/ebctest/TransactionExceptionDetailReportRequest.do',
		form: {
			username: 'test',
			merchantID: 'mckenley1',
			password: 'password123',
			startDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()),
			endDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1),
			startTime: '07:00:00',
			endTime: '07:00:00',
			format: 'xml'
		}
	},
	function(error, response, body) {
		console.log("Finished: ", body);
	}
);