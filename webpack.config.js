const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'starback.js',
    library: {
      name: 'Starback',
      export: 'default',
      type: 'var',
    },
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules)/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
}
