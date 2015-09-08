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

let candidates = [];
let words = [];
let element = new ActiveElement;
let candidatesElement = new CandidatesElement;

onKeybindTriggered(function() {
    if (candidates.length) element.replaceCurrentWord(candidates[0]);
});

addEventListener('keyup', event => {
    if (!element.isEditable) return;

    words = new Document().words;
    console.log('[Autocomplete] Available words', words.join(', '));

    try {
        candidates = getCandidateWords(element.currentWord, words);
        console.log('[Autocomplete] Candidate words', candidates);
        candidatesElement.candidates = candidates;
    } catch(error) {
        setTimeout(() => { throw error; }); // Probably nothing is selected
    }
});
