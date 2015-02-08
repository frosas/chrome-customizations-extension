/* eslint-env browser, node */

var _ = require('lodash');

var onKeystroke = function (callback) {
    document.addEventListener('keypress', function (event) {
        if (event.ctrlKey && event.keyCode == 0 /* space */) callback();
    });    
};

var getContentNodes = function () {
    return [].slice.call(document.querySelectorAll('*:not(script):not(style)'));
};

var getNodeText = function (node) {
    return [].slice.call(node.childNodes).
        filter(function (node) { return node.nodeType == Node.TEXT_NODE; }).
        map(function(node) { return node.nodeValue; }).
        join(' ');
};

var getWordsInDocument = function () {
    return _(getContentNodes()).
        map(getNodeText).
        map(function(text) { return _.words(text); }).flatten().
        uniq().
        value();
};

console.log('gwid', getWordsInDocument());

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
    console.log('Autocomplete candidates', candidates);
    if (candidates.length) {
        var previousText = element.value.substring(0, element.selectionStart - word.length);
        element.value = previousText + candidates[0];
    }
});