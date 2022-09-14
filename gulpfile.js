'use strict'

const {exists, mkdir} = require('fs')
const {task, src, dest, parallel, watch} = require('gulp')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync')

// let dist = './dist/';
let dist = '/opt/lampp/htdocs/test';

// (async () => {
//   const distExists = await exists(dist)
//   if (distExists) return
//   dist = mkdir('./dist/')
// })

task('copy-html', () => {
  return src('./src/index.html').
      pipe(dest(dist)).
      pipe(browserSync.stream())
})

task('build-js', () => {
  return src('./src/js/main.js').pipe(webpack({
    mode: 'development',
    output: {
      filename: 'script.js'
    },
    watch: false,
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]]
            }
          }
        }
      ]
    }
  })).pipe(dest(dist)).on('end', browserSync.reload)
})

task('copy-assets', () => {
  return src('./src/assets/**/*.*').
      pipe(dest(dist + '/assets')).
      on('end', browserSync.reload)
})

task('watch', () => {
  browserSync.init({
    server: './dist/',
    port: 4000,
    notify: true
  })

  watch('./src/index.html', parallel('copy-html'))
  watch('./src/assets/**/*.*', parallel('copy-assets'))
  watch('./src/js/**/*.js', parallel('build-js'))
})

task('build', parallel('copy-html', 'copy-assets', 'build-js'))

task('build-prod-js', () => {
  return src('./src/js/main.js').pipe(webpack({
    mode: 'production',
    output: {
      filename: 'script.js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]]
            }
          }
        }
      ]
    }
  })).pipe(dest(dist))
})

task('default', parallel('watch', 'build'))
