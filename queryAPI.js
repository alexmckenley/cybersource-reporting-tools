var request = require('request');

request.post('https://ebctest.cybersource.com/ebctest/TransactionExceptionDetailReportRequest.do')
.form({
	username:'test',
	merchantID: 'mckenley1',
	password: 'password123',
	startDate: '2013-10-21',
	endDate: '2013-10-22',
	startTime: '07:00:00',
	endTime: '07:00:00',
	format: 'csv'
})
.pipe(process.stdout);