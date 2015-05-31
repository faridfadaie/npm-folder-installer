/*!
 * npm-installer - lib/npm-installer.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */
var fs = require('fs'),
	path = require('path'),
	exec = require('child_process').exec,
	async = require('async');

(function(){
	module.exports = function(callback) {
		function getDirectories(srcpath) {
			return fs.readdirSync(srcpath).filter(function(file) {
				return fs.statSync(path.join(srcpath, file)).isDirectory();
			});
		}
		var folders = getDirectories('.');
		var installers = [];
		for (var i = 0; i < folders.length; i++) {
			installers.push(
			function(callback) {
				exec('npm --prefix ' + this + ' install', function(error, stdout, stderr) {
					callback(error, stdout, stderr)
				});
			}.bind(folders[i]));
		}
		async.parallel(installers, callback);
	}
}());
