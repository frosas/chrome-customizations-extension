var ActiveElement = require('./autocomplete/ActiveElement');
var Document = require('./autocomplete/Document');

var onKeybindTriggered = function (callback) {
    addEventListener('keypress', function (event) {
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

let candidates = [];
let words = [];
let element = new ActiveElement;
let timeoutId;

onKeybindTriggered(function() {
    if (candidates.length) element.replaceCurrentWord(candidates[0]);
});

addEventListener('keyup', () => {
    words = new Document().words;
    console.log('[Autocomplete] Available words', words.join(', '));

    try {
        candidates = getCandidateWords(element.currentWord, words);
        console.log('[Autocomplete] Candidate words', candidates);
        // tooltip.style.left = element.rect.left + 'px';
        // tooltip.style.top = element.rect.top + 'px';
        tooltip.innerText = candidates.join('\n');
        tooltip.style.display = 'block';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => tooltip.style.display = 'none', 1500);
    } catch(error) {
        setTimeout(() => { throw error; }); // Probably nothing is selected
    }
});

var tooltip = document.createElement('div');
tooltip.style.display = 'none';
tooltip.style.position = 'fixed';
tooltip.style.left = '10px';
tooltip.style.top = '10px';
tooltip.style.padding = '5px';
tooltip.style.backgroundColor = '#fffcb6';
tooltip.style.opacity = 0.9;
tooltip.style.zIndex = 9999;
document.body.appendChild(tooltip);
