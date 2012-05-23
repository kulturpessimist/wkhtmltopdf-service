// _require_ all the libraries!
var express = require('express'),
	crypto	= require('crypto'),
	exec	= require('child_process').exec,
	os		= require('os');
// on mac os x - our dev environment - the binary is in Applications... 
// in linux we use our own binary 
var wkhtmltopdf = {
		'darwin': '/Applications/wkhtmltopdf.app/Contents/MacOS/wkhtmltopdf',
		'linux': './bin/wkhtmltopdf-amd64',
		'linux2': './bin/wkhtmltopdf-amd64'
	},
	// some flags for nicer PDFs
	// @todo we sould make this a request parameter in the future
	flags = '-B 0 -L 0 -R 0 -T 0 -q --no-outline --disable-external-links',
	// a server with express... ah such a nice library!
	app = express.createServer(express.logger());
// _configure_ all the parameters!
app.configure(function(){
	app.use(express.methodOverride());
	// static files for our "frontend"
	app.use(express.static(__dirname + '/public'));
	// static files for our assets. 
	// remember: files on heroku are just temporary -> http://goo.gl/5qWdt
	app.use('/assets', express.static(__dirname + '/assets'));
});
// our namespace sould be api
app.get('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	// do we have a url?
	if(url !== '' ){
		// lets hash the url so we have a unique filename
		var sha1_hash = crypto.createHash('sha1').update(url);
		var hex = sha1_hash.digest('hex');
		// lets exec the wkhtmltopdf command
		// this is where the magic happens... lol
		var child = exec(wkhtmltopdf[os.platform()]+' '+flags+" "+url+' ./assets/'+hex+'.pdf', 
			function (error, stdout, stderr) {
				if (error !== null) {
					// is everything goes wrong!
					// show the user/client the error and leave him alone
					console.log('exec error: ' + error);
					response.send('exec error: '+ JSON.stringify(error));
				}else{
					// ah, great it worked!
					// send the user/client to the asset
					response.redirect('/assets/'+hex+'.pdf');
				}
			}
		);
	}else{
		// hmmm, no url? than go back to begin
		response.redirect('/');
	}
});
// blitz.io made me doing this
app.get('/mu-3398791d-9410f6e1-1a6b44de-32a09019?', function(request, response) {
	response.send('42');
});

// launch our server on the ENV Port or 3000...
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});