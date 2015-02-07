/* eslint-env node */

module.exports = {
    entry: {
        'google-calendar': './scripts/google-calendar',
        'ux-distance': './scripts/ux-distance.js'
    },
    output: {
        path: 'scripts/dist',
        filename: '[name].js'
    }
};