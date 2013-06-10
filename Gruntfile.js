module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    snockets: {
      test: {
        src: 'test/fixtures/test.js',
        dest: 'tmp/test.js'
      },
      test2: {
        options: {
          minify: 'uglify'
        },
        src: 'test/fixtures/test2.js',
        dest: 'tmp/test.min.js'
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['snockets', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', 'lint test');

};
