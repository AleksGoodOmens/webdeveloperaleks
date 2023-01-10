'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './dist/js/scriptBundll.js',
  output: {
    filename: 'bundll.js',
    path: __dirname + '/dist/js/'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
