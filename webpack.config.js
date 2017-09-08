const libname = 'mcbkt-client'
const webpack = require ('webpack')

var postfixes = ['compiled', 'umd']
var minify = false
var polyfill = true
var folder = './dev/'

if ( /(\b|_)nobp(\b|_)/.test (process.env.WEBPACK_TARGET) ) {
   polyfill = false
   postfixes.push ('nobp')
}

if ( /(\b|_)pro(duction)?(\b|_)/.test (process.env.WEBPACK_TARGET) ) {
   minify = true
   folder = './dist/'
}

module.exports = {
  entry: (polyfill ? ['babel-polyfill'] : []).concat (['./src/' + libname
                                                       + '.js']),
  devtool: 'source-map',
  output: {
    filename: folder + libname + '_' + postfixes.join ('_') + '.js',
    library: libname,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  "browsers": ["last 2 versions", "safari >= 7"]
                },
                useBuiltIns: true,
              }]
            ],
            plugins: [
              require ('babel-plugin-transform-object-rest-spread')
            ],
          },
        },
      },
    ],
  },
  plugins: minify ? [
    new webpack.optimize.UglifyJsPlugin ({
      compress: {
        warnings: false,
      },
      output: {
        comments: "some", // Or, could be a regex such as /^!/
      },
    })] : [],
}
