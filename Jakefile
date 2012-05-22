desc('This is the default task.');
task('default', function(){
	jake.exec(['jake -T'], function () {
		complete();
	}, {stdout: true});
});

desc('Generate Documentation for wkhtmltopdf');
task('doc', function(){
	var cmds = [
		'groc README.md web.js',
		'open doc/index.html'
	];
	jake.exec(cmds, function () {
		console.log('Opening Documentation in Browser...');
		complete();
	}, {stdout: true});
});

desc('Sudo Generate Documentation for wkhtmltopdf');
task('sudoc', function(){
	var cmds = [
		'groc README.md web.js',
		'chown -R alex doc/',
		'open doc/index.html'
	];
	jake.exec(cmds, function () {
		console.log('Opening Documentation in Browser...');
		complete();
	}, {stdout: true});
});