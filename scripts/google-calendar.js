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

onBubble(function (element) {
    var link = element.contentDocument.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.extension.getURL('styles/google-calendar-bubble.css');
    element.contentDocument.head.appendChild(link);
});
