module.exports = function(grunt) {
  grunt.initConfig({
  php: {
      dist: {
          options: {
              hostname: '127.0.0.1',
              port: 8000,
              base: 'dist', // Project root
              keepalive: false,
              open: false
          }
      }
  },
  browserSync: {
      dist: {
          bsFiles: {
              src: [
                'css/*.css',
                '*.html',
                'js/*.js',
                'dist/*.php'
                  // Files you want to watch for changes
              ]
          },
          options: {
              proxy: '<%= php.dist.options.hostname %>:<%= php.dist.options.port %>',
              watchTask: true,
              notify: true,
              open: true,
              logLevel: 'silent',
              ghostMode: {
                  clicks: true,
                  scroll: true,
                  links: true,
                  forms: true
              }
          }
      }
  },
  watch: {

      php: {
            files: ['dist/*.php'],
            tasks : ['php']
       },
       js: {
           files: ['js/*.js']
      }
      // Your watch tasks
    }
});

    // load npm tasks

    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');

    // define default task
    // grunt.registerTask('default', ['browserSync','browserify', 'watch', 'jade', 'jshint']);
    grunt.registerTask('server', [
    'php:dist',         // Start PHP Server
    'browserSync:dist', // Using the PHP instance as a proxy
    'watch'             // Any other watch tasks you want to run
]);
};
