var express = require('express'),
	crypto	= require('crypto'),
	exec	= require('child_process').exec,
	os		= require('os');

var wkhtmltopdf = {
		'darwin': '/Applications/wkhtmltopdf.app/Contents/MacOS/wkhtmltopdf',
		'linux': './bin/wkhtmltopdf-amd64',
		'linux2': './bin/wkhtmltopdf-amd64'
	};

var app = express.createServer(express.logger());

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/assets'));
});

app.get('/', function(request, response) {
	response.send('Hello World!');
});

app.get('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	if(url !== '' ){
		var sha1_hash = crypto.createHash('sha1').update(url);
		var hex = sha1_hash.digest('hex');
		var child = exec(wkhtmltopdf[os.platform()]+' '+url+' ./assets/'+hex+'.pdf', function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}else{
				
			}
			response.send('<a href="/'+hex+'.pdf" target="_blank">open</a>');
		});
	}else{
		response.send('Hello World! @'+os.platform());
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(os.platform());
	console.log("Listening on " + port);
});