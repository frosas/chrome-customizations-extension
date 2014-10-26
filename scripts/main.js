var marked = require('marked');

var lastTaskBubbleSeen;

var onBubble = function (callback) {
    // TODO Watch changes in the DOM
    setInterval(function() {
        var element = document.querySelector('.bubble iframe');
        if (element && element !== lastTaskBubbleSeen) {
            lastTaskBubbleSeen = element;
            callback(element);
        }
    }, 500);
};

/**
 * @returns [HTMLElement|null]
 */
var getBubbleTextarea = function (element) {
    return element.contentDocument.querySelector('textarea.ec');
};

onBubble(function (element) {
    var isEditing = function () {
        return textarea.style.display == 'block';
    };
    
    var toggleEdition = function () {
        if (isEditing()) {
            textarea.style.display = 'none';
        } else {
            textarea.style.display = 'block';
            textarea.focus();
        }
    };
    
    var render = function () {
        renderedElement.innerHTML = marked(textarea.value);
    };
    
    var textarea = getBubbleTextarea(element);
    textarea.style.font = '14px Ubuntu Mono, monospace';
    textarea.style.display = 'none';
    textarea.addEventListener('change', render);
    textarea.addEventListener('keyup', render);
    
    var renderedElement = document.createElement('div');
    renderedElement.addEventListener('click', toggleEdition);
    textarea.parentNode.appendChild(renderedElement);
    
    render();
});