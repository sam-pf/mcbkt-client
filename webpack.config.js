const webpack = require ('webpack')

module.exports = {
  entry: './src/mcbkt-client.js',
  output: {
    filename: './lib/mcbkt-client.bundle.min.js'
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin ({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
}
