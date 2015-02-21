module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
      dev: {
        options: {
          port: 8000,
          base: '../audreyn.github.io'
        }
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['./assets/**'], dest: '../audreyn.github.io'}
        ]
      }
    },

    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: './src/siteArchitecture/layouts/',
        partials: './src/siteArchitecture/partials/**/*.hbs',
        assets: '../audreyn.github.io/assets'
      },
      posts: {
        files: [{
          cwd: './src/content/',
          dest: '../audreyn.github.io',
          expand: true,
          src: ['**/*.hbs', '!pages/**/*.hbs']
        }, {
          cwd: './src/content/pages/',
          dest: '../audreyn.github.io',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'connect']);

};