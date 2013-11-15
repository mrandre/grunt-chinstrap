/*
 * grunt-chinstrap
 * 
 *
 * Copyright (c) 2013 Andre Behrens
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var path = require('path');	
	var chinstrap = require("chinstrap-engine");
	var VERSION = require(path.join('..','node_modules','chinstrap-engine','package.json')).version;

	grunt.log.writeln('Rendering with Chinstrap version ' + VERSION);

	grunt.registerMultiTask('chinstrap', 'Compile chinstrap templates into built config files', function() {
		var bannerText, options, now;

		now = new Date().toString();

		bannerText = '/* Compiled with Chinstrap ' +
			VERSION + ' ' + now + ' */\n\n';

		options = this.options({
			wrap: null,
			skipRender: false,
			banner: bannerText
		});

		this.files.forEach(generateOutputFile);

		function processFiles(f) {
			return f.src
				.filter(validFile)
				.map(compileTemplateToFunction)
				.join(',');
		}

		function validFile(filepath) {
			if (!grunt.file.exists(filepath)) {
				grunt.log.warn('Source file "' + filepath + '" not found.');
				return false;
			} else {
				return true;
			}
		}

		function compileTemplateToFunction(filepath) {
			var compiled, template, templateName, fn;
			// Read file source.
			grunt.verbose.writeln("Template: " + filepath)
			templateName = extractName(filepath);
			grunt.verbose.writeln("Template name: " + templateName);
			template = grunt.file.read(filepath);
			grunt.verbose.writeln("Template content: " + template);
			if (options.skipRender) {
				compiled = template;
			} else {
				fn = new Function("config", chinstrap.render(template));
				compiled = fn.toString();
			}
			grunt.verbose.writeln("Compiled " + compiled);
			return "'" + templateName + "':" + compiled;
		}

		function generateOutputFile(f) {
			var strResult = processFiles(f);
			grunt.verbose.writeln("Source: " + strResult);
			strResult = "{" + strResult + "}";

			if (options.wrap) {
				strResult = options.wrap.replace("***", strResult);
			}

			if (options.banner) {
				strResult = options.banner + strResult;
			}
			// Write the destination file.
			grunt.file.write(f.dest, strResult);
			grunt.log.writeln('File "' + f.dest + '" created.');
		}

		function extractName(filePath) {
			var parts = filePath.split("/");
			var fileBase = parts[parts.length - 1];
			var name = fileBase.split(".")[0];
			return name;
		}
	});
};
