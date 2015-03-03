/* eslint-env node */

module.exports = {
    entry: {
        'google-calendar': './scripts/google-calendar',
        autocomplete: './scripts/autocomplete.js'
    },
    output: {
        path: 'scripts/dist',
        filename: '[name].js'
    }
};
