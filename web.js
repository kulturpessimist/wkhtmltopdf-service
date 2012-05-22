var express = require('express'),
	crypto	= require('crypto'),
	exec	= require('child_process').exec,
	os		= require('os');

var wkhtmltopdf = {
		'darwin': '/Applications/wkhtmltopdf.app/Contents/MacOS/wkhtmltopdf',
		'linux': './bin/wkhtmltopdf-amd64',
		'linux2': './bin/wkhtmltopdf-amd64'
	},
	flags = '-B 0 -L 0 -R 0 -T 0 -q --no-outline --disable-external-links',
	
	app = express.createServer(express.logger());

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use('/assets', express.static(__dirname + '/assets'));
});

app.get('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	if(url !== '' ){
		var sha1_hash = crypto.createHash('sha1').update(url);
		var hex = sha1_hash.digest('hex');
		var child = exec(wkhtmltopdf[os.platform()]+' '+flags+" "+url+' ./assets/'+hex+'.pdf', function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
				response.send('exec error: '+ JSON.stringify(error));
			}else{
				
			}
			//response.send('<a href="/assets/'+hex+'.pdf" target="_blank">open</a>');
			response.redirect('/assets/'+hex+'.pdf');
		});
	}else{
		response.redirect('/');
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});