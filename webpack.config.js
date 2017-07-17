module.exports = {
    entry: {
    },
    output: {path: 'scripts/dist', filename: '[name].js'},
    module: {loaders: [{
        include: __dirname + '/scripts',
        test: /\.js$/,
        loader: 'babel-loader'
    }]},
    devtool: 'source-map'
};
