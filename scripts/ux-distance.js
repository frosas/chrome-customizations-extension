(function () {
    var scoreElement = document.createElement('div');
    scoreElement.style.fontSize = '3em';
    scoreElement.style.lineHeight = '1em';
    scoreElement.style.position = 'fixed';
    scoreElement.style.bottom = 0;
    scoreElement.style.right = 0;
    scoreElement.style.color = '#000';
    scoreElement.style.backgroundColor = '#fff';
    scoreElement.style.padding = '5px';
    scoreElement.style.zIndex = '9999';
    document.body.appendChild(scoreElement);
    
    var getScore = function () {
        return actions.reduce(function (score, action) {
            return score + (action.score || 0);
        }, 0);
    };

    var actions = [];
    
    var addAction = function (action) {
        action.start = action.end = new Date;
        actions.push(action);
        render();
    };
    
    var render = function () {
        scoreElement.textContent = getScore().toFixed(0);
    };
    
    render();
    
    document.addEventListener('click', function () {
        addAction({type: 'click', score: 5});
    });
    
    var lastMousePosition;
    
    var getDistance = function (a, b) {
        if (!a || !b) return;
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    };
    
    document.addEventListener('mousemove', function (event) {
        var currentPosition = [event.screenX, event.screenY];
        var distance = getDistance(lastMousePosition, currentPosition);
        lastMousePosition = currentPosition;
        distance && addAction({
            type: 'mouse move', 
            distance: distance,
            score: distance / 20 // 100 pixels → 5 points
        });
    });
    
    document.addEventListener('keydown', function () {
        addAction({type: 'key down', score: 3});
    });
    
    var lastScrollPosition;
    
    document.addEventListener('scroll', function () {
        var currentPosition = [window.scrollX, window.scrollY];
        var distance = getDistance(lastScrollPosition, currentPosition);
        lastScrollPosition = currentPosition;
        distance && addAction({
            type: 'scroll',
            distance: distance,
            score: distance / 20 // 100 pixels → 5 points
        });
    });
})();