const { override, addWebpackPlugin } = require('customize-cra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = override((config) => {
  // Clear existing plugins to avoid conflicts
  config.plugins = config.plugins.filter(
    (plugin) => !(plugin instanceof HtmlWebpackPlugin)
  );

  // Add HtmlWebpackPlugin for popup.html
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/popup.html'),
      filename: 'popup.html',
      chunks: ['main'],
      minify: false, // Disable minification for easier debugging
    })
  );

  // Add HtmlWebpackPlugin for sidepanel.html
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/sidepanel.html'),
      filename: 'sidepanel.html',
      chunks: ['sidepanel'],
      minify: false, // Disable minification for easier debugging
    })
  );

  // Ensure that the entry points include 'sidepanel'
  config.entry = {
    main: path.resolve(__dirname, 'src/popup.js'),
    sidepanel: path.resolve(__dirname, 'src/sidepanel.js'),
  };

  // Adjust output configuration
  config.output = {
    ...config.output,
    filename: '[name].[contenthash].js', // Simplified filename pattern
    path: path.resolve(__dirname, 'build'), // Ensure output path is set
  };

  return config;
});
