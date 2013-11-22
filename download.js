var request = require('request');

var params = {
  year: 2013,
  month: 10,//(new Date()).getMonth() + 1,
  day: 17, //(new Date()).getDate() - 1,
  merchantID: 'mckenley1',
  reportType: 'TransactionExceptionDetailReport',
  reportFormat: 'csv'
};

//Create URL
var url = "https://ebctest.cybersource.com/ebctest/DownloadReport/"
  + params.year + '/'
  + params.month + '/'
  + params.day + '/'
  + params.merchantID + '/'
  + params.reportType + '.'
  + params.reportFormat;

console.log("");
console.log("Downloading: ", url, "...");
console.log("");

//Begin Download
request.get({
  uri: url,
  auth: {
    user: "test",
    pass: "password123"
  }
},

function(error, response, body){

  console.log(body);
});