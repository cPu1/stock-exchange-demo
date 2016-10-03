var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/app.js',
    './styles/app.less'
  ],
  output: {
    path: path.join(__dirname, 'build/static/'),
    filename: 'js/bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify(false)
    }),
    new ExtractTextPlugin('/css/styles.css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  cache: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?cacheDirectory=./tmp/'],
      //exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  }
};
