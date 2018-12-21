const webpack = require('webpack');

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '.'
        : '/',
    configureWebpack: {
        performance: {
            hints: "warning",
            maxAssetSize: 1048576,
            maxEntrypointSize: 1048576,
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.ProvidePlugin({
                Vue: ['vue/dist/vue.esm.js', 'default'],
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                $: 'jquery',
                moment: 'moment',
            }),
        ]
    }
};
