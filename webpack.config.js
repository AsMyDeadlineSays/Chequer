const path = require('path')
const webpack = require('webpack')

const WebpackChunkHashPlugin = require('webpack-chunk-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OfflinePlugin = require('offline-plugin')


const cssLoader = ExtractTextPlugin.extract([
  'css-loader'
])
const sassLoader = ExtractTextPlugin.extract([
  'css-loader',
  'sass-loader?indentedSyntax'
])


module.exports = env => {
  const config = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'static/app.js'
    },
  
  
    module: {
      rules: [{
          test: /\.css$/,
          use: cssLoader
        }, {
          test: /\.sass$/,
          use: sassLoader
        }, {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: sassLoader,
            }
          }
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]'
          }
        }]
    },
  
  
    plugins: [
      new ExtractTextPlugin('static/style-[hash].css'),
      new HtmlWebpackPlugin({
        title: 'Foodhack',
        template: path.resolve(__dirname, './index.html'),
        filename: 'index.html',
      })
    ],
  
  
    resolve: {
      alias: {
        '@':  path.resolve(__dirname)
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }
  
  
  if (process.env.NODE_ENV === 'production') {
    config.output.filename = 'static/app-[hash].js'
    config.devtool = false
    config.devServer = {}
  
    config.plugins = (config.plugins || []).concat([
      new WebpackCleanupPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new WebpackChunkHashPlugin({algorithm: 'md5'}),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './src/icons'),
        to: path.join(config.output.path, 'static')
      }]),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './src/manifest.json'),
        to: path.join(config.output.path, 'static')
      }]),
      // new ImageminPlugin({ test: /\.(jpe?g|png)$/i }),
    ])
  }


  if(typeof env !== 'undefined' && env.analyze) {
    config.plugins = (config.plugins || []).concat([
      new BundleAnalyzerPlugin()
    ])
  }

  
  return config
}

