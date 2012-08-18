// _require_ all the libraries!
var express = require('express'),
	sprintf = require('sprintf').sprintf,
	crypto	= require('crypto'),
	exec	= require('child_process').exec,
	os		= require('os');
// on mac os x - our dev environment - the binary is in Applications... 
// in linux we use our own binary 
var wkhtmltopdf = {
		'darwin': '/Applications/wkhtmltopdf.app/Contents/MacOS/wkhtmltopdf',
		'linux':  './bin/wkhtmltopdf-amd64',
		'linux2': './bin/wkhtmltopdf-amd64'
	},
	versions = {
		'darwin':'',
		'default': '.0.10.0_beta5',
		'099': '.0.9.9',
		'096': '.0.9.6',
		'10': '.0.10.0_beta5',
		'11': '.0.11.0rc1'
	},
	// some flags for nicer PDFs
	pflags = '-B %(B)d -L %(L)d -R %(R)d -T %(T)d -O %(O)s -q --disable-external-links',
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
	// and last but not least the body Parser for our post route
	app.use(express.bodyParser());
});
// our namespace sould be api
app.get('/api/:url/:version?', function(request, response) {
	var url = request.params.url || '';
	var version = request.params.version || (os.platform()=='darwin'?'darwin':'default');
	var flags = sprintf(pflags, {B:0, L:0, R:0, T:0, O:"Portrait"});
	// do we have a url?
	if(url !== '' ){
		// lets hash the url so we have a unique filename
		var sha1_hash = crypto.createHash('sha1').update(url);
		var hex = sha1_hash.digest('hex');
		// lets exec the wkhtmltopdf command
		// but first get a timestamp to messure the performance
		var start_time = new Date().getTime();
		// this is where the magic happens... lol
		var child = exec(wkhtmltopdf[os.platform()]+versions[version]+' '+flags+" "+url+' ./assets/'+hex+'.pdf', 
			function (error, stdout, stderr) {
				if (error !== null) {
					// is everything goes wrong!
					// show the user/client the error and leave him alone
					console.log('exec error: ' + error);
					response.send('exec error: '+ JSON.stringify(error));
				}else{
					// ah, great it worked!
					// how much time did we need? log it to console
					console.log( '###', 'processing took', (new Date().getTime())-start_time, 'ms' );
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
// now exactly the same for post requests 
// with optional parameters for the padding
app.post('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	console.log(request.body);
	// are any parameters provided?
	var version =  request.body.version || (os.platform()=='darwin'?'darwin':'default');
	var B =  parseInt(request.body.B, 10) || 0;
	var L =  parseInt(request.body.L, 10) || 0;
	var R =  parseInt(request.body.R, 10) || 0;
	var T =  parseInt(request.body.T, 10) || 0;
	var O =  request.body.O || "Portrait";
	O = (O!="Portrait" && O!="Landscape")?"Portrait":O;
	var flags = sprintf(pflags, {B:B, L:L, R:R, T:T, O:O});
	
	// do we have a url?
	if(url !== '' ){
		// lets hash the url so we have a unique filename
		var sha1_hash = crypto.createHash('sha1').update(url);
		var hex = sha1_hash.digest('hex');
		// lets exec the wkhtmltopdf command
		// but first get a timestamp to messure the performance
		var start_time = new Date().getTime();
		// this is where the magic happens... lol
		var child = exec(wkhtmltopdf[os.platform()]+versions[version]+' '+flags+" "+url+' ./assets/'+hex+'.pdf', 
			function (error, stdout, stderr) {
				if (error !== null) {
					// is everything goes wrong!
					// show the user/client the error and leave him alone
					console.log('exec error: ' + error);
					response.send('exec error: '+ JSON.stringify(error));
				}else{
					// ah, great it worked!
					// how much time did we need? log it to console
					console.log( '###', 'processing took', (new Date().getTime())-start_time, 'ms' );
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
// launch our server on the ENV Port or 3000...
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});