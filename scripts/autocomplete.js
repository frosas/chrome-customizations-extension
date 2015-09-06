var ActiveElement = require('./autocomplete/ActiveElement');
var Document = require('./autocomplete/Document');

var onKeystroke = function (callback) {
    document.addEventListener('keypress', function (event) {
        if (event.ctrlKey && event.keyCode == 0 /* space */) callback();
    });
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
    let words = new Document().words;
    console.log('[Autocomplete] Available words', words.join(', '));
    let element = new ActiveElement;
    var candidates = getCandidateWords(element.currentWord, words);
    console.log('[Autocomplete] Candidate words', candidates);
    if (candidates.length) element.replaceCurrentWord(candidates[0]);
});
