var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:4000',
      'webpack/hot/only-dev-server',
      './src/app.js',
      './styles/app.less'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    /*new ExtractTextPlugin('styles.css', {
      allChunks: true
    })*/
  ],
  cache: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?cacheDirectory'],
      //exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
        //loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  }
};
