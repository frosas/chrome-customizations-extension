module.exports = class CandidatesElement {
    constructor() {
        this._tooltip = document.createElement('div');
        this._tooltip.style.position = 'fixed';
        this._tooltip.style.left = '10px';
        this._tooltip.style.top = '10px';
        this._tooltip.style.padding = '5px';
        this._tooltip.style.backgroundColor = '#fffcb6';
        this._tooltip.style.opacity = 0.9;
        this._tooltip.style.zIndex = 9999;
        this._hide();
        document.body.appendChild(this._tooltip);
    }

    render({candidates, suggestedWord}) {
        if (candidates.length) {
            candidates = candidates.map(candidate => suggestedWord + '✒︎' + candidate.slice(suggestedWord.length));
            if (candidates.length > 10) candidates = candidates.slice(0, 10).concat('…');
            this._tooltip.innerText = candidates.join('\n');
            this._show();
            clearTimeout(this._timeoutId);
            this._timeoutId = setTimeout(() => this._hide(), 1000);
        } else {
            this._hide();
        }
    }

    _show() {
        this._tooltip.style.display = 'block';
    }

    _hide() {
        this._tooltip.style.display = 'none';
    }
}