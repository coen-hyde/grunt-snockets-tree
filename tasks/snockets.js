'use strict';

module.exports = function(grunt) {
  var fs = require('fs')
    , path = require('path')
    , Snockets = require('snockets')
    , _ = grunt.util._
    , async = grunt.util.async;

  var snockets = new Snockets();

  grunt.registerMultiTask('snockets', 'Building js files with snockets.js.', function() {

    var done = this.async()
      , task = this
      , config = { concat: {}, min: {} };

    var options = this.options({
      minify: false
    });

    async.forEach(task.files, function (f, next) {
      // Only files, no directories
      var files = f.src.filter(function (filename) {
        return !grunt.file.isDir(filename);
      });

      async.forEach(files, function (filename, next) {
        snockets.getCompiledChain(filename, function (fileName, jsList) {
          if (!jsList) {
            return next();
          }

          // Add to config.concat object.
          config.concat[filename] = {
            src: _.pluck(jsList, 'filename'),
            dest: f.dest
          };
          // grunt.helper('header-footer', config.concat[filename].src, options.concat);
          
          // Add to config.min object (if enabled)
          if (options.minify) {
            config.min[filename] = {
              src: config.concat[filename].dest,
              dest: f.dest
            };
          }
          // grunt.helper('header-footer', config.min[filename].src, options.min);

          next();
        });
      }, function(err) {
        if (err) {
          return done(err);
        }

        grunt.verbose.writeln('concat tree'.underline);
        grunt.verbose.writeln(require('util').inspect(config.concat));
        grunt.verbose.writeln('min tree'.underline);
        grunt.verbose.writeln(require('util').inspect(config.min));

        var existingConcat = grunt.config.get('concat') || {};
        var existingMin = grunt.config.get('min') || {};
        _.extend(existingConcat, config.concat);
        _.extend(existingMin, config.min);
        // Refresh concat and min config
        grunt.config.set('concat', existingConcat);
        grunt.config.set('min', existingMin);

        next();
      });
    }, done);
  });
};
