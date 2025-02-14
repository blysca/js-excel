/* eslint-disable linebreak-style */
const webpack = require( 'webpack' );
const path = require( 'path' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
// const babelPolyfill = require("@babel/polyfill");

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ ext }` : `bundle.[hash].${ ext }`
const jsLoaders = () => {
  const loaders = [ 'babel-loader' ]

  if ( isDev ) {
    loaders.push( 'eslint-loader' )
  }

  return loaders
}

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin( {
    template: 'index.html',
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd,
    },
  } ),
  new CopyPlugin( {
    patterns: [
      {
        from: path.resolve( __dirname, 'src/favicon.ico' ),
        to: path.resolve( __dirname, 'dist' ),
      }
    ],
  } ),
  new MiniCssExtractPlugin( {
    filename: filename( 'css' ),
  } ),
  new webpack.DefinePlugin( {
    'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
  } )
]

if ( isDev ) {
  // only enable hot in development
  plugins.push( new webpack.HotModuleReplacementPlugin() );
}

module.exports = {
  context: path.resolve( __dirname, 'src' ),
  mode: 'development',
  entry: [ '@babel/polyfill', './index.js' ],
  output: {
    filename: filename( 'js' ),
    path: path.resolve( __dirname, 'dist' ),
  },
  resolve: {
    extensions: [ '.js' ],
    alias: {
      '@': path.resolve( __dirname, 'src' ),
      '@core': path.resolve( __dirname, 'src/core' ),
      'process': 'process/browser'
    },
  },
  watch: true,
  watchOptions: {
    ignored: 'node_modules/**'
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve( __dirname, 'src' ),
    watchContentBase: true,
    compress: true,
    port: 7278,
    liveReload: true,
    hot: isDev,
    open: {
      app: [ 'Chrome', '--incognito' ],
    },
  },
  target: 'web',
  plugins,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          /* {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },*/
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
      },
    ],
  },
}
