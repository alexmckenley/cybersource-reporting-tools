var request = require('request');

request.post('https://ebctest.cybersource.com/ebctest/TransactionExceptionDetailReportRequest.do', function(error, response, body){
	console.log("Finished: ", body);
})
.form({
	username:'test',
	merchantID: 'mckenley1',
	password: 'password123',
	startDate: '2013-10-22',
	endDate: '2013-10-23',
	startTime: '10:45:00',
	endTime: '06:00:00',
	format: 'xml'
});