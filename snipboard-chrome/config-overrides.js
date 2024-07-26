const { override, addWebpackPlugin } = require('customize-cra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = override((config) => {
  config.plugins = config.plugins.filter(
    (plugin) => !(plugin instanceof HtmlWebpackPlugin)
  );

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/html/popup.html'),
      filename: 'popup.html',
      chunks: ['main'],
      minify: false,
    })
  );

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/html/sidepanel.html'),
      filename: 'sidepanel.html',
      chunks: ['sidepanel'],
      minify: false,
    })
  );

    config.plugins.push(
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'public/html/addsnip.html'),
        filename: 'addsnip.html',
        chunks: ['addsnip'],
        minify: false,
      })
    );

//   config.plugins.push(
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: path.resolve(__dirname, 'public/html/[name].html'),
//       filename: '[name].html',
//       chunks: ['[name]'],
//       minify: false,
//     })
//   );

  config.entry = {
    main: path.resolve(__dirname, 'src/popup.js'),
    sidepanel: path.resolve(__dirname, 'src/sidepanel.js'),
    addsnip: path.resolve(__dirname, 'src/addsnip.js'),
    // [name]: path.resolve(__dirname, 'src/[name].js'),
  };

  config.output = {
    ...config.output,
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  };

  return config;
});
