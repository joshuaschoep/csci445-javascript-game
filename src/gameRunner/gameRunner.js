canvas = document.getElementById("game-window");
context = canvas.getContext("2d");
var level = 0;
var score = 0;
var spawn_timer = 0;
var spawn_counter = 0;
var asteroids = [];
var health = 4;

var asteroidCountup = 0;
function startLevel(level) {
    var spawn_interval = Math.floor(Math.random() * 100 / level);
    var spawn_number = Math.floor(Math.random() * level * 10 + 15);
    gameLoop(level, spawn_interval, spawn_number);
}


function gameLoop(level, spawn_interval, spawn_number) {
    context.clearRect(0, 0, 700, 700);
    asteroids.forEach(function(v) {
        v.draw();
    });
    ship.move();
    ship.draw();
    
    spawn_timer += 1;
    if(spawn_timer >= spawn_interval){
        console.log(asteroids);
        spawnAsteroid();
        spawn_interval = Math.floor(Math.random() * 100 / level);
        spawn_timer = 0;
    }

    if(spawn_counter > spawn_number){
        return;
    }
    
    setTimeout(function () {
        gameLoop(level, spawn_interval, spawn_number);
    }, 30);
}

function spawnAsteroid(){
    asteroids.push(new Asteroid(0.9, Math.floor(Math.random() * canvas_width), -50, canvas, context));
}

class Asteroid {
    constructor(vY, xPos, yPos, canvas, ctx) {
        this.vY = vY;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = 30;
        this.height = 30;
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "./images/Aestroids/aestroid_gray.png";
    }

    draw() {
        this.yPos += this.vY;

        if(this.yPos > canvas_height){
            spawn_counter += 1;
            asteroids.splice(asteroids.indexOf(this), 1);
        }

        this.ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
    }
}

function math() {
    var spawn_interval = console.log(Math.floor(Math.random() * 5000 / level));
    var spawn_number = console.log(Math.floor(Math.random() * level * 10));
}

window.onload = function() {
    canvas = document.getElementById("game-window");
    context = canvas.getContext("2d");

    canvas_width = canvas.width;
    canvas_height = canvas.height;

    ship = new Ship(canvas_width / 2 - 11, canvas_height - 50, canvas, context);
    this.ship.initDraw();

    window.addEventListener("keydown", function () {
        keydown_handler(event, ship);
    }, false);

    window.addEventListener("keyup", function () {
        keyup_handler(event, ship);
    }, false);

    // update_scores();
    this.startLevel(1);
};

function keydown_handler(event, ship) {
    // down arrow
    if (event.keyCode === 40) {
        ship.yVelocity += 1;
    }
    // up arrow
    if (event.keyCode === 38) {
        ship.yVelocity -= 1;
    }
    // right arrow
    if (event.keyCode === 39) {
        ship.xVelocity += 1;
    }
    // left arrow
    if (event.keyCode === 37) {
        ship.xVelocity -= 1;
    }
}

function keyup_handler(event, ship){
    // down arrow
    if (event.keyCode === 40) {
        ship.yVelocity = 0;
    }
    // up arrow
    if (event.keyCode === 38) {
        ship.yVelocity = 0;
    }
    // right arrow
    if (event.keyCode === 39) {
        ship.xVelocity = 0;
    }
    // left arrow
    if (event.keyCode === 37) {
        ship.xVelocity = 0;
    }
}

class Ship {
    xLoc;
    yLoc;
    canvas;
    context;
    xVelocity = 0;
    yVelocity = 0;
    SHIP_HEIGHT = 11;
    SHIP_WIDTH = 30;
    shipImg;

    constructor(x, y, canvas, ctx) {
        this.xLoc = x;
        this.yLoc = y;
        this.canvas = canvas;
        this.context = ctx;

        this.shipImg = new Image();
        this.shipImg.src = "./images/Blue/Small_ship_blue/1.png";
    }

    getContext() {
        return this.context;
    }

    initDraw() {
        // .log("initDraw()");
        // need to do this b/c the eventListenere. idk why
        var _xLoc = this.xLoc;
        var _yLoc = this.yLoc;
        var _context = this.context;
        var _shipImg = this.shipImg;
        var _ship_height = this.SHIP_HEIGHT;
        var _ship_width = this.SHIP_WIDTH;

        this.shipImg.addEventListener("load", function () {

            // console.log("Vars:");
            // console.log(_xLoc);
            // console.log(_yLoc);
            // console.log(_context);
            // console.log(_shipImg);
            // console.log(_ship_height);
            // console.log(_ship_width);

            _context.drawImage(
                _shipImg, _xLoc, _yLoc, _ship_width, _ship_height
            )
        }, false);
    }

    draw() {
        // console.log("draw()");
        // console.log("draw context: " + this.context);
        // this.context.clearRect(0,0,700,700);
        this.context.drawImage(
            this.shipImg, this.xLoc, this.yLoc, this.SHIP_WIDTH, this.SHIP_HEIGHT
        )
    }

    move() {
        let changex = this.xLoc + this.xVelocity;
        let changey = this.yLoc + this.yVelocity;
        if(changex > 0 && changex < this.canvas.width - this.SHIP_WIDTH
            && changey > 0 && changey < this.canvas.height - this.SHIP_HEIGHT){
            this.xLoc += this.xVelocity;
            this.yLoc += this.yVelocity;
        }
    }
}
