var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var path = require('path');
// var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {

    entry: {
        calendar : [
            'webpack-dev-server/client?http://127.0.0.1:7777', // WebpackDevServer host and port
            'webpack/hot/dev-server',
            './app/jsx/entry.jsx'
    ]},
    output: {
        publicPath: "/js",
        path: '/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader', exclude: /node_modules/ },
          
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React : "react",
            ReactDOM: "react-dom",
            ReactAddons: "react-addons",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"'}),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};