# wkhtmltopdf

@todo write a README.md

# Used Libraries & Tools

* Frontend
	* jQuery 1.7.2 http://jquery.com/
	* jQuery Shortcuts http://github.com/ambethia/jquery-shortcuts 
* Backend
	* wkhtmltopdf 0.11.0 http://code.google.com/p/wkhtmltopdf/
	* Express 2.5.6 http://expressjs.com/
	* jake 0.2.33 https://github.com/mde/jake

# Documentation

Documentation is generated with the awesome [groc](https://github.com/nevir/groc)!
You can find alle docs for this project in the folder "/doc"

# package.json
	
	{
		"name": "wkhtmltopdf-service",
		"version": "0.6.0",
		"engines": {
			"node": "0.6.17",
			"npm": 	"1.1.9"
		},
		"dependencies": {
			"express": "2.5.6",
			"jake": "0.3.14"
		}
	}
	
# wkhtmltopdf parameters

	Global Options:
		  --collate                       Collate when printing multiple copies
										  (default)
		  --no-collate                    Do not collate when printing multiple
										  copies
		  --cookie-jar <path>             Read and write cookies from and to the
										  supplied cookie jar file
		  --copies <number>               Number of copies to print into the pdf
										  file (default 1)
	  -d, --dpi <dpi>                     Change the dpi explicitly (this has no
										  effect on X11 based systems)
	  -H, --extended-help                 Display more extensive help, detailing
										  less common command switches
	  -g, --grayscale                     PDF will be generated in grayscale
	  -h, --help                          Display help
		  --htmldoc                       Output program html help
		  --image-dpi <integer>           When embedding images scale them down to
										  this dpi (default 600)
		  --image-quality <integer>       When jpeg compressing images use this
										  quality (default 94)
	  -l, --lowquality                    Generates lower quality pdf/ps. Useful to
										  shrink the result document space
		  --manpage                       Output program man page
	  -B, --margin-bottom <unitreal>      Set the page bottom margin (default 10mm)
	  -L, --margin-left <unitreal>        Set the page left margin (default 10mm)
	  -R, --margin-right <unitreal>       Set the page right margin (default 10mm)
	  -T, --margin-top <unitreal>         Set the page top margin (default 10mm)
	  -O, --orientation <orientation>     Set orientation to Landscape or Portrait
										  (default Portrait)
		  --output-format <format>        Specify an output format to use pdf or ps,
										  instead of looking at the extention of the
										  output filename
		  --page-height <unitreal>        Page height
	  -s, --page-size <Size>              Set paper size to: A4, Letter, etc.
										  (default A4)
		  --page-width <unitreal>         Page width
		  --no-pdf-compression            Do not use lossless compression on pdf
										  objects
	  -q, --quiet                         Be less verbose
		  --read-args-from-stdin          Read command line arguments from stdin
		  --readme                        Output program readme
		  --title <text>                  The title of the generated pdf file (The
										  title of the first document is used if not
										  specified)
	  -V, --version                       Output version information an exit
	
	Outline Options:
		  --dump-default-toc-xsl          Dump the default TOC xsl style sheet to
										  stdout
		  --dump-outline <file>           Dump the outline to a file
		  --outline                       Put an outline into the pdf (default)
		  --no-outline                    Do not put an outline into the pdf
		  --outline-depth <level>         Set the depth of the outline (default 4)
	
	Page Options:
		  --allow <path>                  Allow the file or files from the specified
										  folder to be loaded (repeatable)
		  --background                    Do print background (default)
		  --no-background                 Do not print background
		  --checkbox-checked-svg <path>   Use this SVG file when rendering checked
										  checkboxes
		  --checkbox-svg <path>           Use this SVG file when rendering unchecked
										  checkboxes
		  --cookie <name> <value>         Set an additional cookie (repeatable)
		  --custom-header <name> <value>  Set an additional HTTP header (repeatable)
		  --custom-header-propagation     Add HTTP headers specified by
										  --custom-header for each resource request.
		  --no-custom-header-propagation  Do not add HTTP headers specified by
										  --custom-header for each resource request.
		  --debug-javascript              Show javascript debugging output
		  --no-debug-javascript           Do not show javascript debugging output
										  (default)
		  --default-header                Add a default header, with the name of the
										  page to the left, and the page number to
										  the right, this is short for:
										  --header-left='[webpage]'
										  --header-right='[page]/[toPage]' --top 2cm
										  --header-line
		  --encoding <encoding>           Set the default text encoding, for input
		  --disable-external-links        Do not make links to remote web pages
		  --enable-external-links         Make links to remote web pages (default)
		  --disable-forms                 Do not turn HTML form fields into pdf form
										  fields (default)
		  --enable-forms                  Turn HTML form fields into pdf form fields
		  --images                        Do load or print images (default)
		  --no-images                     Do not load or print images
		  --disable-internal-links        Do not make local links
		  --enable-internal-links         Make local links (default)
	  -n, --disable-javascript            Do not allow web pages to run javascript
		  --enable-javascript             Do allow web pages to run javascript
										  (default)
		  --javascript-delay <msec>       Wait some milliseconds for javascript
										  finish (default 200)
		  --load-error-handling <handler> Specify how to handle pages that fail to
										  load: abort, ignore or skip (default
										  abort)
		  --disable-local-file-access     Do not allowed conversion of a local file
										  to read in other local files, unless
										  explecitily allowed with --allow
		  --enable-local-file-access      Allowed conversion of a local file to read
										  in other local files. (default)
		  --minimum-font-size <int>       Minimum font size
		  --exclude-from-outline          Do not include the page in the table of
										  contents and outlines
		  --include-in-outline            Include the page in the table of contents
										  and outlines (default)
		  --page-offset <offset>          Set the starting page number (default 0)
		  --password <password>           HTTP Authentication password
		  --disable-plugins               Disable installed plugins (default)
		  --enable-plugins                Enable installed plugins (plugins will
										  likely not work)
		  --post <name> <value>           Add an additional post field (repeatable)
		  --post-file <name> <path>       Post an additional file (repeatable)
		  --print-media-type              Use print media-type instead of screen
		  --no-print-media-type           Do not use print media-type instead of
										  screen (default)
	  -p, --proxy <proxy>                 Use a proxy
		  --radiobutton-checked-svg <path> Use this SVG file when rendering checked
										  radiobuttons
		  --radiobutton-svg <path>        Use this SVG file when rendering unchecked
										  radiobuttons
		  --run-script <js>               Run this additional javascript after the
										  page is done loading (repeatable)
		  --disable-smart-shrinking       Disable the intelligent shrinking strategy
										  used by WebKit that makes the pixel/dpi
										  ratio none constant
		  --enable-smart-shrinking        Enable the intelligent shrinking strategy
										  used by WebKit that makes the pixel/dpi
										  ratio none constant (default)
		  --stop-slow-scripts             Stop slow running javascripts (default)
		  --no-stop-slow-scripts          Do not Stop slow running javascripts
		  --disable-toc-back-links        Do not link from section header to toc
										  (default)
		  --enable-toc-back-links         Link from section header to toc
		  --user-style-sheet <url>        Specify a user style sheet, to load with
										  every page
		  --username <username>           HTTP Authentication username
		  --window-status <windowStatus>  Wait until window.status is equal to this
										  string before rendering page
		  --zoom <float>                  Use this zoom factor (default 1)

# Licence 

Copyright (c) 2012, consumr
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.