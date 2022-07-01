const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        applications: './src/applications.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    watch: true
}