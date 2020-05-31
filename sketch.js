var rez = 20;
var gameWidth = 1200;
var gameHeight = 800;

var xStart;
var yStart;

var length;
var xPos;
var yPos;

var direction = "right";
var xVel;
var yVel;

var xFruit;
var yFruit;

var score = 0;

var gameStarted;

function setup() {
    createCanvas(gameWidth, gameHeight);
    scoreP = createP("Score: " + score);
    scoreP.addClass("score");
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    frameRate(10);
    setupSnake();
}

function setupSnake() {
    xStart = 10 * rez;
    yStart = gameHeight / 2;

    length = 10;
    xPos = [];
    yPos = [];

    direction = "right";
    xVel = 1;
    yVel = 0;

    xFruit = 0;
    yFruit = 0;

    score = 0;
    scoreP.html("Score: " + score);
    gameStarted = false;

    for (i = 0; i < length; i++) {
        xPos.push(xStart - i * rez);
        yPos.push(yStart);
    }
    placeFruit();
}

function draw() {
    background(color("#111111"));
    if (gameStarted) {
        changeDirection();
        updateSnake();
        if (xPos[0] == xFruit && yPos[0] == yFruit) {
            length++;
            score++;
            scoreP.html("Score: " + score);
            xPos.push(xPos[length - 1]);
            yPos.push(yPos[length - 1]);
            placeFruit();
        }
        if (checkCollision() == true) {
            setupSnake();
        }
    } else {
        fill(255);
        text("Press any key to start", width / 2, height / 2);
    }
    drawSnake();
}

function checkCollision() {
    for (i = 1; i < length; i++) {
        if (xPos[0] == xPos[i] && yPos[0] == yPos[i]) {
            return true;
        }
    }
    return false;
}

function drawSnake() {
    var snakeColor = 255;
    for (i = 0; i < length; i++) {
        fill(snakeColor);
        rect(xPos[i], yPos[i], rez, rez);
        snakeColor--;
    }
    fill(color(255, 0, 0));
    rect(xFruit, yFruit, rez, rez);
}

function placeFruit() {
    xFruit = floor(random(gameWidth / rez)) * rez;
    yFruit = floor(random(gameHeight / rez)) * rez;
    for (i = 0; i < length; i++) {
        while (xFruit == xPos[i] && yFruit == yPos[i]) {
            xFruit = floor(random(gameWidth / rez)) * rez;
            yFruit = floor(random(gameHeight / rez)) * rez;
        }
    }
}

function changeDirection() {
    if (direction == "right") {
        if (xVel == 0) {
            xVel = 1;
            yVel = 0;
        }
    }
    if (direction == "left") {
        if (xVel == 0) {
            xVel = -1;
            yVel = 0;
        }
    }
    if (direction == "up") {
        if (yVel == 0) {
            xVel = 0;
            yVel = -1;
        }
    }
    if (direction == "down") {
        if (yVel == 0) {
            xVel = 0;
            yVel = 1;
        }
    }
}

function keyPressed() {
    if (gameStarted == false) {
        gameStarted = true;
    }
    if (keyCode == RIGHT_ARROW) {
        direction = "right";
    }
    if (keyCode == LEFT_ARROW) {
        direction = "left";
    }
    if (keyCode == UP_ARROW) {
        direction = "up";
    }
    if (keyCode == DOWN_ARROW) {
        direction = "down";
    }
}

function updateSnake() {
    for (i = length - 1; i > 0; i--) {
        xPos[i] = xPos[i - 1];
        yPos[i] = yPos[i - 1];
    }
    xPos[0] = constrain(xPos[0] + xVel * rez, 0, gameWidth - 1 * rez);
    yPos[0] = constrain(yPos[0] + yVel * rez, 0, gameHeight - 1 * rez);
}
