'use strict';

// Based on grunt-contrib-concat test

var grunt = require('grunt');


var expectedConcat = { 
  'test/fixtures/test.js': { 
    src: [
      'test/fixtures/includes/file3.js',
      'test/fixtures/includes/file1.js',
      'test/fixtures/includes/file2.js',
      'test/fixtures/test.js'
    ],
    dest: 'tmp/test.js' 
  },
  'test/fixtures/test2.js': { 
    src: [
      'test/fixtures/includes/file3.js',
      'test/fixtures/includes/file1.js',
      'test/fixtures/includes/file2.js',
      'test/fixtures/test2.js'
    ],
    dest: 'tmp/test.min.js' 
  }
}

var expectedMin = { 
  'test/fixtures/test2.js': { 
    src: 'tmp/test.min.js', 
    dest: 'tmp/test.min.js' 
  }
}

exports.snockets = {
  test: function(test) {
    test.expect(2);

    test.deepEqual(grunt.config.get('concat'), expectedConcat, "Snockets did not build the expected concat config");

    // Ensure snockets didn't build the minify config
    test.deepEqual(grunt.config.get('min'), expectedMin, "Snockets did not build the expected min config");

    test.done();
  }
};
