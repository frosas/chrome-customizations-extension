var ActiveElement = require('./autocomplete/ActiveElement');
var Document = require('./autocomplete/Document');
var CandidatesElement = require('./autocomplete/CandidatesElement');

var onKeybindTriggered = function (callback) {
    addEventListener('keypress', function (event) {
        if (event.ctrlKey && event.keyCode == 0 /* space */) {
            event.preventDefault();
            callback();
        }
    });
};

var startsWith = function(string, prefix) {
    return string.toLowerCase().substring(0, prefix.length) == prefix.toLowerCase();
};

var getCandidateWords = function(string, words) {
    return words
        .filter(function(word) { return startsWith(word, string); })
        .filter(function(word) { return word != string; });
};

var getCommonPrefix = strings => {
    var prefix = '';
    for (var i = 0; i < (strings[0] || '').length; i++) {
        var char = strings[0][i];
        for (var j = 0; j < strings.length; j++) {
            if (strings[j][i] != char) return prefix;
        }
        prefix += char;
    }
    return prefix;
};

let candidates = [];
let words = [];
let element = new ActiveElement;
let candidatesElement = new CandidatesElement;
let suggestedWord;

onKeybindTriggered(function() {
    if (candidates.length) element.replaceCurrentWord(suggestedWord);
});

addEventListener('keyup', event => {
    if (!element.isEditable) return;

    words = new Document().words;
    console.log('[Autocomplete] Available words', words.join(', '));

    try {
        candidates = getCandidateWords(element.currentWord, words);
        suggestedWord = getCommonPrefix(candidates);
        console.log('[Autocomplete] Candidate words', candidates);
        candidatesElement.render({candidates, suggestedWord});
    } catch(error) {
        setTimeout(() => { throw error; }); // Probably nothing is selected
    }
});
