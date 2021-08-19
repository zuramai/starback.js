const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'starback.js',
        library: {
            name: 'Starback',
            export: 'default',
            type: 'var'
        },
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
}