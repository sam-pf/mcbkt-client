const webpack = require ('webpack')

module.exports = {
  // entry: ['babel-polyfill', './src/mcbkt-client.js'],
  entry: ['./src/mcbkt-client.js'],
  // devtool: 'source-map',
  output: {
    filename: './lib/mcbktclient.js',
    library: 'mcbktclient',
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
          }
        }
      }
    ]
  } /*,
  plugins: [
    new webpack.optimize.UglifyJsPlugin ({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ] */
}
