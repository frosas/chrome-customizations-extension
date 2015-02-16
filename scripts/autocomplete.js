/* eslint-env browser, node */

var _ = require('lodash');

var onKeystroke = function (callback) {
    document.addEventListener('keypress', function (event) {
        if (event.ctrlKey && event.keyCode == 0 /* space */) callback();
    });    
};

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

var getWordsInDocument = function () {
    return _([]).
        concat(getStringsFromTextNodes()).
        concat(getStringsFromInputs()).
        map(function(text) { return _.words(text); }).flatten().
        uniq().
        sort().
        value();
};

var getCurrentWord = function(element) {
    element.value.substring(0, element.selectionStart).match(/(\w*)$/);
    return RegExp.$1;
};

var startsWith = function(string, prefix) {
    return string.substring(0, prefix.length) == prefix;
};

var getCandidateWords = function(string, words) {
    return words
        .filter(function(word) { return startsWith(word, string); })
        .filter(function(word) { return word != string; });
};

onKeystroke(function() {
    var element = document.activeElement;
    if (!element) return;
    var word = getCurrentWord(element);
    var words = getWordsInDocument();
    var candidates = getCandidateWords(word, words);
    console.log('Autocomplete available', words.join(', '));
    console.log('Autocomplete candidates', candidates);
    if (candidates.length) {
        var previousText = element.value.substring(0, element.selectionStart - word.length);
        element.value = previousText + candidates[0];
    }
});
