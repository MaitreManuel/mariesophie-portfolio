const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModules = path.resolve(__dirname, 'node_modules');
const PurgeCSS = require('purgecss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetsCompressionPlugin = require('brotli-webpack-plugin');
const ScriptsCompressionPlugin = require('brotli-gzip-webpack-plugin');

const resources = path.resolve(__dirname, 'src');

const config = {
  cache: true,
  entry: {
    app: './src/assets/app.js'
  },
  output: {
    library: '[name]', // assets build
    libraryTarget: 'umd',
    path: path.join(__dirname, 'web'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [{
      // required for es6
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      // required to write 'require('./style.scss')'
      test: /\.s(a|c)ss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(resources , '/assets/'),
                nodeModules
              ],
              sourceMap: true
            }
          },
        ]
      })
    }, {
      // required to write 'require('./style.css')'
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      })
    }, {
      // required for bootstrap icons
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      options: {
        prefix: 'font/',
        limit: 5000,
        mimetype: 'application/font-woff'
      }
    }, {
      test: /\.(ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        prefix: 'font/'
      }
    }]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/views/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'src/views/about.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'projets.html',
      template: 'src/views/projets.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'abc.html',
      template: 'src/views/abc.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'portrait.html',
      template: 'src/views/portrait.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'flatdesign.html',
      template: 'src/views/flatdesign.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'julien.html',
      template: 'src/views/julien.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'moventes.html',
      template: 'src/views/moventes.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'girafe.html',
      template: 'src/views/girafe.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'oiseaux.html',
      template: 'src/views/oiseaux.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'pave.html',
      template: 'src/views/pave.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'portugal.html',
      template: 'src/views/portugal.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'animaux.html',
      template: 'src/views/animaux.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'angers.html',
      template: 'src/views/angers.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'dame.html',
      template: 'src/views/dame.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.devtool= false;
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
          beautify: false,
        },
        sourceMap: false,
        ie8: false,
      },
    }),
    new PurgeCSS({
      minimize: true,
      paths: glob.sync([
        path.join(__dirname, 'src/views/**/*.html'),
        path.join(__dirname, 'src/assets/**/*.js')
      ]),
      whitelistPatterns: [/^pg-/, /^carousel-/]
    }),
    new AssetsCompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      test: /\.(css|html|svg|ttf|eot|otf|woff|woff2|ico)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ScriptsCompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin()
  );
} else {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  );
}

module.exports = config;
