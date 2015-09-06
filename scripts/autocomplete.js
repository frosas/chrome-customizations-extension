var _ = require('lodash');

class ActiveElement {
    replaceCurrentWord(newWord) {
        let previousText = this._text.substring(0, this._caret - this.currentWord.length);
        let posteriorText = this._text.substring(this._caret);
        this._text = previousText + newWord + posteriorText;
        this._caret = (previousText + newWord).length;
    }

    get currentWord() {
        return this._text.substring(0, this._caret).match(/(\w*)$/)[1];
    }

    set _text(text) {
        this._element[this._textAttribute] = text;
    }

    get _text() {
        return this._element[this._textAttribute];
    }

    get _textAttribute() {
        return 'value' in this._element ? 'value' : 'innerText';
    }

    get _rangeNode() {
        return this._range.startContainer;
    }

    get _element() {
        return this._rangeNode instanceof Element ?
            this._rangeNode.childNodes[this._range.startOffset] :
            this._rangeNode.parentNode;
    }

    set _caret(caret) {
        if (this._element.setSelectionRange) this._element.setSelectionRange(caret, caret);
        else getSelection().collapse(this._element.childNodes[0], caret);
    }

    get _caret() {
        return this._element.selectionStart ?
            this._element.selectionStart :
            this._range.startOffset;
    }

    /**
     * @throws {Error} When nothing is selected
     */
    get _range() {
        return getSelection().getRangeAt(0);
    }
}

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
        map(function(text) { return text.split(/\W/); }).flatten().
        uniq().
        sort().
        value();
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
    var words = getWordsInDocument();
    console.log('[Autocomplete] Available words', words.join(', '));
    let element = new ActiveElement;
    var candidates = getCandidateWords(element.currentWord, words);
    console.log('[Autocomplete] Candidate words', candidates);
    if (candidates.length) element.replaceCurrentWord(candidates[0]);
});
