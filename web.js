// _require_ all the libraries!
var express = require('express'),
	mO 		= require('method-override'),
	bP 		= require('body-parser'),
	crypto	= require('crypto'),
	exec	= require('child_process').exec,
	os		= require('os');
// on mac os x - our dev environment - the binary is in $path... 
// in linux we use our own binary 
var wkhtmltopdf = {
		'darwin': 'wkhtmltopdf',
		'linux':  './bin/wkhtmltopdf-amd64',
		'linux2': './bin/wkhtmltopdf-amd64'
	};
// on heroku we host 4 different versions of wkhtmltopdf
// on darwin we just use wkhtmltopdf.app
var versions = {
		'darwin': 		'',
		'default': 		'.0.12.3',
		'0.9.9': 		'.0.9.9',
		'0.11.0rc1': 	'.0.11.0rc1',
		'0.12.3': 		'.0.12.3'
	};
// the actual function to render the PDF
// @TODO: Provide name for file and maybe hooks with file actions....
var renderPDF = function(url, cb, params){
	var version = (os.platform()=='darwin'?'darwin':'default');
	var params = params || '-B 0 -L 0 -R 0 -T 0 -O Portrait -q --image-quality 80 --disable-external-links --print-media-type --javascript-delay 350';
	// lets hash the url so we have a unique filename
	var sha1_hash = crypto.createHash('sha1').update(url);
	var name = sha1_hash.digest('hex');
	// lets exec the wkhtmltopdf command
	// but first get a timestamp to messure the performance
	var start_time = new Date().getTime();
	// this is where the magic happens... lol
	var child = exec(
		wkhtmltopdf[os.platform()] + versions[version] + ' ' + params + ' ' + url + ' ./assets/' + name + '.pdf', 
		// heroku gives us 30 seconds, so we do it in 20 seconds
		{ timeout: 29000, killSignal: 'SIGTERM' },
		function (error, stdout, stderr) {
			if (error !== null) {
				// is everything goes wrong!
				// show the user/client the error and leave him alone
				console.log('exec error: ' + error);
				//response.send('exec error: '+ JSON.stringify(error));
				cb(error, null);
			}else{
				// ah, great it worked!
				// how much time did we need? log it to console
				console.log( '###', 'processing took', (new Date().getTime())-start_time, 'ms' );
				// send the user/client to the asset
				//response.redirect('/assets/'+name+'.pdf');
				cb(null, name);
			}
		}
	);
}
//	                                                       
//   _____ __ __ _____ _____ _____ _____ _____    __ _____ 
//  |   __|  |  |  _  | __  |   __|   __|   __|__|  |   __|
//  |   __|-   -|   __|    -|   __|__   |__   |  |  |__   |
//  |_____|__|__|__|  |__|__|_____|_____|_____|_____|_____|
//	                                                       
// a server with express... ah such a nice library!
var app = express();
// _configure_ all the parameters!
app.use(mO());
// static files for our "frontend"
app.use(express.static(__dirname + '/public'));
// static files for our assets. 
// remember: files on heroku are just temporary -> http://goo.gl/5qWdt
app.use('/assets', express.static(__dirname + '/assets'));
// and last but not least the body Parser for our post route
app.use(bP());
// our namespace sould be api
app.get('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	// do we have a url?
	if(url !== '' ){
		renderPDF(url, function(error, success){
			if (error !== null) {
				console.log('exec error: ' + error);
				response.send('exec error: '+ JSON.stringify(error));		
			}else{
				response.redirect('/assets/'+success+'.pdf');
			}
		}, null);
	}else{
		// hmmm, no url? than go back to begin
		response.redirect('/');
	}
});
// now exactly the same for post requests 
// with optional parameters for the padding
app.post('/api/:url?', function(request, response) {
	var url = request.params.url || '';
	// are any parameters provided?
	// no escaping, but whatever...
	var flags = request.body.parameters;
	// do we have a url?
	if(url !== '' ){
		renderPDF(url, function(error, success){
			if (error !== null) {
				console.log('exec error: ' + error);
				response.send('exec error: '+ JSON.stringify(error));		
			}else{
				response.redirect('/assets/'+success+'.pdf');
			}
		}, flags);
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