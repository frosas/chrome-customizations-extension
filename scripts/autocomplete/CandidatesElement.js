module.exports = class CandidatesElement {
    constructor() {
        this._tooltip = document.createElement('div');
        this._tooltip.style.display = 'none';
        this._tooltip.style.position = 'fixed';
        this._tooltip.style.left = '10px';
        this._tooltip.style.top = '10px';
        this._tooltip.style.padding = '5px';
        this._tooltip.style.backgroundColor = '#fffcb6';
        this._tooltip.style.opacity = 0.9;
        this._tooltip.style.zIndex = 9999;
        document.body.appendChild(this._tooltip);
    }

    set candidates(candidates) {
        this._tooltip.innerText = candidates.join('\n');
        this._tooltip.style.display = 'block';
        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(() => this._tooltip.style.display = 'none', 1500);
    }
}
