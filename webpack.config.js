// Webpack is only used for development purpose (watching docs files)
// To build the typescript, use tsup

const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: './docs/starback.global.js',
  mode: 'development',
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['docs'] },
    }),
  ],
}
