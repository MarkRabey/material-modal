module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * Material Modal v<%= pkg.version %>\n' +
      ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under the <%= pkg.license %> license\n' +
      ' */\n',
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        predef: ["window", "document"]
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: true
      },
      dist: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      docs: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'docs/js/<%= pkg.name %>.min.js'
      }
    },

    less: {
      options: {
        banner: '<%= banner %>'
      },

      dev: {
        files: {
          "dist/css/<%= pkg.name %>.css": "src/less/material-modal.less"
        }
      },

      dist: {
        options: {
          compress: true,
          plugins: [
            new(require('less-plugin-autoprefix'))({
              browsers: ["last 2 versions"]
            })
          ],
        },
        files: {
          "dist/css/<%= pkg.name %>.min.css": "src/less/material-modal.less"
        }
      },

      docs: {
        options: {
          compress: true
        },
        files: {
          "docs/css/docs.min.css": ["src/less/material-modal.less", "src/less/docs.less"]
        }
      }
    },

    watch: {
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify']
      }
    }
  });


  // Default task(s).
  grunt.registerTask('default', ['build', 'watch']);

  grunt.registerTask('build', ['jshint', 'uglify', 'less']);

};