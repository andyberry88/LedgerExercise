'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		
		jasmine: {
			test: {
				src: 'src/**/*.js',
				options: {
					specs: 'tests/*.js',
				}
			}
		},
		watch: {
			files: ['src/**/*.js', 'tests/**/*.js'],
			tasks: ['test']
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: ['example', 'src'],
					keepalive: true
				}
			}
		}

	});
	
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('serve', ['connect']);
};
