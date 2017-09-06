const libname = 'mcbkt-client'
const webpack = require ('webpack')

module.exports = {
  entry: (process.env.NODE_ENV === 'start' ? []: ['babel-polyfill']).concat
    (['./src/mcbkt-client.js']),
  devtool: 'source-map',
  output: {
    filename: './lib/' + libname + (process.env.NODE_ENV === 'production' ?
                                    ".min" : "") + '.js',
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
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.UglifyJsPlugin ({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }) ]: [],
}
