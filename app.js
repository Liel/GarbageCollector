// TODO: change "50" to be not hardcoded and think about
// how to implement it better in terms of now the game is
// from number X to 0, so the target num will always be 0
// but maybe we should have instead a var for "startingFrom" which is 50
const gestureManagerInstance = new gestureManager()
var dynamicItemsManagerInstance;
const progressBarInstance = new ProgressBarManager();
const startingGuideInstance = new StartingGuideManager();
const playerInstance = new Player();

var gameLoopInterval;
var generateItemsTimeout;

const pathNum = 4;
const numInPathPositionLeftRange = [11,25];
const GAME_OVER_INTERVAL_VALUE = 31000;
const initialRoadSecondsDuration = 130;
const clockElement = document.getElementById("clock");
const INITIAL_TARGET_NUMBER = 20;
const INITIAL_NUMBER = 0
const GAME_OVER_OBSTACLES_COUNT = 3

var gameOverCountDown = GAME_OVER_INTERVAL_VALUE / 1000
var playerDirection = ""
var animationAllowed = true;
var aggregatedValue = 0;
var counters = {
    trashItems: 0,
    obstacles: 0
}
var moves = 0;
var percentage = 0;
var coins = 0;
var speedOfFallingFactor = 1;
var gameScreenWidth;

var targetNumber;
var gameScreenHeight; 

function gameLoop() {
    if(!animationAllowed || !playerInstance || !playerInstance.player)
        return;

    dynamicItemsManagerInstance.getAllItems().forEach(function(currentDynamicItem) {

        const itemBoundries = currentDynamicItem.htmlElement.getBoundingClientRect()
        var itemTop = itemBoundries.top / gameScreenHeight * 100; 

        // if item overlap screen, remove it
        if(itemTop > 100) {
            dynamicItemsManagerInstance.removeItemById(currentDynamicItem)
            return;
        }
        if(isCollide(currentDynamicItem.htmlElement, playerInstance.player)) {        
            moves++;
            
            const isObstacle = currentDynamicItem.type == dynamicItemsManagerInstance.itemTypes.OBSTACLE;
            if(isObstacle) {
                counters.obstacles++;
                document.getElementById("hearts").innerHTML = `${GAME_OVER_OBSTACLES_COUNT - counters.obstacles}`
                if(counters.obstacles === GAME_OVER_OBSTACLES_COUNT) {
                    gameOver();
                }
            }
            else {
                counters.trashItems++;
                document.getElementById("trashCount").innerHTML = `${counters.trashItems}`
            }

            const isReachedTargetNum = calculateAggreatedValue(currentDynamicItem);
            dynamicItemsManagerInstance.removeItemById(currentDynamicItem)

            // animation
            if(isReachedTargetNum) {
                percentage = 100
                gestureManagerInstance.showCoinsGesture(itemBoundries.top, itemBoundries.left);
                dynamicItemsManagerInstance.increaseSpeed();
                return;
            }
            updatePercentage()

            if(isObstacle) {
                gestureManagerInstance.showObtacleCollidionGesture(currentDynamicItem.htmlElement, 
                    itemBoundries.top, 
                    itemBoundries.left,
                    `${operatorsDispay[currentDynamicItem.operator]}${currentDynamicItem.numericValue}`)
                return;
            }

            gestureManagerInstance.showCollidionGesture(currentDynamicItem.htmlElement, 
                    itemBoundries.top, 
                    itemBoundries.left,
                    `${operatorsDispay[currentDynamicItem.operator]}${currentDynamicItem.numericValue}`)
        }
    });
}

function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}

function calculateAggreatedValue(item) {
    const operator = item.operator,
          numericValue = item.numericValue;

    if(operator === "plus")
        aggregatedValue += numericValue
    else
        aggregatedValue -= numericValue
        
    return calcAndPrintAggreatedValue();    
}

function calcAndPrintAggreatedValue() {
    var isReachedTheTargetNumber = false;
    if(aggregatedValue >= targetNumber) { // on higher steps it should be equal and not gt
        gestureManagerInstance.showGestureAnimation();
        increaseCoins();
        reset();
        isReachedTheTargetNumber = true;
    }

    // updateIndicationLabels(aggregatedValue)
    progressBarInstance.updateProgress(aggregatedValue)
    // showAddedAnimation(animationValue)
    return isReachedTheTargetNumber;
}

function updateIndicationLabels(aggregatedValue) {
    document.getElementById("currentCount").innerHTML = aggregatedValue
}

function showAddedAnimation(value) {
    document.getElementById("indication").innerHTML = value
    setTimeout(() => {
        document.getElementById("indication").innerHTML = ""
    }, 1000)

}

function increaseCoins() {
    coins++;
    const coinsElement = document.getElementById("cointCounter")
    coinsElement.innerHTML = coins;

    if(coinsElement.classList.contains("hidden"))
        coinsElement.classList.remove("hidden")
}

function stopAnimation() {
    animationAllowed = false;
}

function keepAnimation() {
    animationAllowed = true;
}

function generateNewTargetNumber() {
    targetNumber = (targetNumber || INITIAL_TARGET_NUMBER) + 10;
    aggregatedValue = INITIAL_NUMBER;
    document.getElementById('target-num').innerHTML = targetNumber;
}


function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == KEYBOARD_ARROWS.LEFT) {
        playerInstance.setDirection("left")
    }
    else if (e.keyCode == KEYBOARD_ARROWS.RIGHT) {
        playerInstance.setDirection("right")
    }
    

}

function movePlayer(direction) {
    player.setAttribute("path", direction);
    // const left = (((pathIdx + 1) * pathSize) + ((pathIdx) * pathSize)) / 2
    // player.style.left = `${left - 5}%`;
    playerDirection = direction
}

function startup() {
    generateNewTargetNumber();
    calcAndPrintAggreatedValue(0)

    gameScreenHeight = parseInt(document.getElementById('gameScreen').getBoundingClientRect().height);
    gameScreenWidth = parseInt(document.getElementById('container').getBoundingClientRect().width);
    playerInstance.init(gameScreenHeight, gameScreenWidth);

    coins = 0;
    progressBarInstance.init(targetNumber);

    const gameScreenXCenter = gameScreenWidth / 2;

    document.onkeydown = checkKey;
    document.addEventListener("visibilitychange", function() {
        animationAllowed = !document.hidden;
    });
    document.addEventListener("touchstart", function(e) {
        if(e.touches[0].clientX > gameScreenXCenter) {
            checkKey({keyCode: KEYBOARD_ARROWS.RIGHT}) // right
        }
        else {
            checkKey({keyCode: KEYBOARD_ARROWS.LEFT}) // left
        }
    });
}

function reset() {
    generateNewTargetNumber();
    moves = 0;
    aggregatedValue = INITIAL_NUMBER;
    percentage = 0
    gameOverCountDown = GAME_OVER_INTERVAL_VALUE / 1000;
    dynamicItemsManagerInstance.removeAll();
    progressBarInstance.reset(targetNumber)
}

function stop() {
    animationAllowed = false
    clearInterval(gameLoopInterval);
    clearInterval(generateItemsInterval)
}

function startGame() {
    setTimeout(startup, 200)
    document.getElementById("welcome").classList.add("hidden");
    // startingGuideInstance.start();
    startGameAfterGuide();
    return;
}

function startGameAfterGuide() {
    gameLoopInterval = setInterval(gameLoop, 50);
    dynamicItemsManagerInstance = new dynamicItemsManager(pathNum, numInPathPositionLeftRange)
    dynamicItemsManagerInstance.initTimeout();
    // gameOverInterval = setInterval(countDownToGameOver, 1000)
    // gameOverCountDown = GAME_OVER_INTERVAL_VALUE / 1000
}

function gameOver() {
    dynamicItemsManagerInstance.stopTimeout();
    // clearInterval(gameLoopInterval);
    // clearInterval(gameOverInterval)
    const gameOverElement = document.getElementById("gameOver");
    playerInstance.suspend();
    gameOverElement.classList.remove("hidden")
}

function tryAgain() {
    const gameOverElement = document.getElementById("gameOver");
    gameOverElement.classList.add("hidden")
    playerInstance.releaseSuspention();

    startGame();
}

function countDownToGameOver() {
    clockElement.innerHTML = adjustGameOverCounterText(--gameOverCountDown);
    if(gameOverCountDown === 0) {
        gameOver()
        clockElement.classList.add("blink")
    }
}

function adjustGameOverCounterText(countValue) {
    var text = "00:"
    if(countValue >= 10)
        return text + countValue
    
    return text + "0" + countValue;
}

function changeRoadSpeed(newSpeedNumeric) {
    document.getElementById("container").style["-webkit-animation-duration"] = newSpeedNumeric + "s";
}

function updatePercentage() {
    if(aggregatedValue > INITIAL_NUMBER) {
        percentage = 0;
        return;
    }
        
    percentage = 100 - ((aggregatedValue / INITIAL_NUMBER) * 100)
}

function isOverlappingTargetNumber() {
    return aggregatedValue > targetNumber
}