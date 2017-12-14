const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/renderer/app.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: {
            plugins: function () {
              return [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']})]
            }
          } },
          { loader: 'sass-loader' }]
      },
      {
        test: /\.(png|jpg|gif|svg)(\?t=\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: './images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?t=\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../vendor-manifest.json')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlwebpackPlugin({
      filename: 'index.html',
      template: './src/renderer/index.html',
      minify: { //html 压缩
        collapseWhitespace: true,
        minifyJS: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../static/*.dll.js'),
      outputPath: './',
      publicPath: './static'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  devServer: {
    historyApiFallback: true,
    port: 8090,
    host: '127.0.0.1',
    https: false,
    hot: true,
    compress: true,
    disableHostCheck: true
  },
  resolve: {
    extensions: ['.js', '.tsx', '.json'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  }
}

if(process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin() // 跳过编译时出错的代码
  ])
} else if(process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}