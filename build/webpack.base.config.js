const path = require('path')
const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  devtool: "source-map",
  entry: {
    app: './src/renderer/app.tsx',
    vendor: ['react', 'react-dom', 'react-router-dom']
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
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
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
    extensions: ['.js', '.json', '.tsx'],
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
} else if(process.env.NODE_ENV === 'product') {
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