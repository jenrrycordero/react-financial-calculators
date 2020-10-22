//Include declarations
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/main.js',
  ],
  output: {
    filename: 'vt-CCPayOffCalculator.min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader','eslint-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      },

    ]
  },
  resolve: {
    alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          keep_fnames: false,
          output:{
            comments: false,
          }
        },
      }),
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      files: ['./src/style/*.scss', './src/style/*.css', './src/js/*.js', './src/js/*.jsx'],
      proxy: 'http://localhost/vt-credit-card-payoff-calculator'
    }),

  ]

}
