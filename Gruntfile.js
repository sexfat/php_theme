module.exports = function(grunt) {
    grunt.initConfig({
        //watch
        watch: {
            html: {
                files: ['*.html']
            },
            css: {
                files: ['sass/*.scss', 'sass/**/*.scss', 'sass/**/*.css'],
                tasks: ['sass']
            },
            php: {
                files: ['dist/*.php'],
                tasks: ['php']
            },
            js: {
                files: ['js/*.js']
            }
        },
        //sass
        sass: {
            build: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'sass/',
                    src: ['*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        //php
        php: {
            dist: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8889,
                    base: 'dist' // Project root
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
                    port: 8889,
                    watchTask: true,
                    open: true
                }
            },
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js',
                        // Files you want to watch for changes
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './',
                        index: 'index.html'
                    }
                }
            }
        }

    });

    // load npm tasks

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');



    // define php server task
    grunt.registerTask('server', [
        'php:dist', // Start PHP Server
        'browserSync:dist', // Using the PHP instance as a proxy
        'watch' // Any other watch tasks you want to run
    ]);
// define default task
    grunt.registerTask('default', [
        'browserSync:dev', // Using the html
        'watch' // Any other watch tasks you want to run
    ]);


};
