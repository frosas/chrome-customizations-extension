module.exports = class ActiveElement {
    get currentWord() {
        return this._text.substring(0, this._caret).match(/(\w*)$/)[1];
    }

    replaceCurrentWord(newWord) {
        let previousText = this._text.substring(0, this._caret - this.currentWord.length);
        let posteriorText = this._text.substring(this._caret);
        this._text = previousText + newWord + posteriorText;
        this._caret = (previousText + newWord).length;
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
            this._rangeNode.childNodes[this._range.startOffset] ||
                this._rangeNode : // When it's empty
            this._rangeNode.parentNode;
    }

    set _caret(caret) {
        if (this._element.setSelectionRange) this._element.setSelectionRange(caret, caret);
        else getSelection().collapse(this._element.childNodes[0] || this._element, caret);
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
