const { override, addWebpackPlugin } = require('customize-cra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = override((config) => {
  // Clear existing plugins to avoid conflicts
  config.plugins = config.plugins.filter(
    (plugin) => !(plugin instanceof HtmlWebpackPlugin)
  );

  // Add HtmlWebpackPlugin for index.html
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      chunks: ['main'],
      minify: false, // Disable minification for easier debugging
    })
  );

  // Add HtmlWebpackPlugin for extension.html
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/extension.html'),
      filename: 'extension.html',
      chunks: ['extension'],
      minify: false, // Disable minification for easier debugging
    })
  );

  // Ensure that the entry points include 'extension'
  config.entry = {
    main: path.resolve(__dirname, 'src/index.js'),
    extension: path.resolve(__dirname, 'src/extension.js'),
  };

  // Adjust output configuration
  config.output = {
    ...config.output,
    filename: '[name].[contenthash].js', // Simplified filename pattern
    path: path.resolve(__dirname, 'build'), // Ensure output path is set
  };

  return config;
});
