var marked = require('marked');

var lastTaskBubbleSeen;

var toArray = function (collection) {
    return [].map.call(collection, function (item) { return item; });
};

var onBubble = function (callback) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            toArray(mutation.addedNodes)
                .filter(function (node) { 
                    return node.nodeName == 'IFRAME' && 
                        node.parentNode.classList.contains('tc-bubble-framecontainer'); 
                })
                .forEach(callback);
        });
    });
    observer.observe(document.body, {childList: true, subtree: true});
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
    
    var link = element.contentDocument.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.extension.getURL('styles/bubble.css');
    element.contentDocument.head.appendChild(link);

    var textarea = getBubbleTextarea(element);
    textarea.addEventListener('change', render);
    textarea.addEventListener('keyup', render);
    
    var renderedElement = document.createElement('div');
    renderedElement.addEventListener('click', toggleEdition);
    textarea.parentNode.appendChild(renderedElement);
    
    render();
});
