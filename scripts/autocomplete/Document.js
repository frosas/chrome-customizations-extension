var _ = require('lodash');

module.exports = class Document {
    get words() {
        return _([]).
            concat(getStringsFromTextNodes()).
            concat(getStringsFromInputs()).
            map(function(text) { return text.split(/\W/); }).flatten().
            uniq().
            sort().
            value();
    }
}

/**
 * @returns {Array.<string>}
 */
var getStringsFromTextNodes = function () {
    return _(document.querySelectorAll('*:not(script):not(style)')).
        map(function(node) {
            return _(node.childNodes).
                filter(function (node) { return node.nodeType == Node.TEXT_NODE; }).
                map(function(node) { return node.nodeValue; }).
                join(' ');
        }).
        value();
};

/**
 * @returns {Array.<string>}
 */
var getStringsFromInputs = function() {
    return _(document.querySelectorAll('textarea,input')).
        map(function(node) { return node.value; }).
        value();
};
