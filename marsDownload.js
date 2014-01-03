var request = require('request');
var fs = require('fs');

request.post({
		uri: 'https://ebc.cybersource.com/ebc/DownloadReport',
		auth: {
			user: "USERNAME",
			pass: "PASSWORD"
		},
		form: {
			merchantID: "hipsandcurves",
			organizationId: "hipsandcurves", //either the merchant id or merchant id_acct
			nodeValue: "1010110024710001", //the hierarchy level. eg: 1010001101001101
			startDate: "12/14/2013", // MM/dd/yyyy
			endDate: "12/15/2013", // MM/dd/yyyy
			reportId: "75",
			format: "xml",
			currency: "usd"
		}
	},
	function(error, response, body) {
		var filename = "MARSOutput.xml";
		console.log(error ? error : "HTTP Response Code: " + response.statusCode);
		if (response.statusCode === 200) {
			fs.writeFile(filename, body, function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Filename: ", filename);
					console.log("The file was downloaded successfully!");

				}

			});
		} else {
			console.log("There was a problem with the request!");
			console.log(body);
		}
	});

// Possible reportId values:
// 74 - Payment Activity Summary Report
// 75 - Purchase & Refund Detail Report
// 76 - Chargeback & Representment Detail Report
// 77 - Transfer Log Report
// 78 - Summary of Fees Report
// 79 - Retrieval Request Detail Report
// 80 - Chargeback Analysis Report
// 82 - Authorization Analysis Report
// 83 - Interchange Qualification Analysis Report