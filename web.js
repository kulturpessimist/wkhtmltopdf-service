var express = require('express'),
	exec	= require('child_process').exec,
	os		= require('os');

var wkhtmltopdf = {
	'darwin': '/Applications/wkhtmltopdf.app/Contents/MacOS/wkhtmltopdf',
	'linux': './bin/wkhtmltopdf-amd64',
	'linux2': './bin/wkhtmltopdf-amd64'
}

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	response.send('Hello World!');
});

app.get('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	if(url !== '' ){
		var child = exec(wkhtmltopdf[os.platform()]+' '+url+' ./tmp/oup.pdf',
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
		});
		console.log(child);
		response.send(url);	
	}else{
		response.send('Hello World! @'+os.platform());
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(os.platform());
	console.log("Listening on " + port);
});