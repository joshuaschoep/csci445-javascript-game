// import { Ship } from './src/spaceship/spaceship.js';
// const Ship = require('./src/spaceship/spaceship.js');
// canvas = document.getElementById("game-window");
// context = canvas.getContext("2d");
// var level = 0;

window.onload = function() {
    canvas = document.getElementById("game-window");
    context = canvas.getContext("2d");
    
    canvas_width = canvas.width;
    canvas_height = canvas.height;

    ship = new Ship(canvas_width / 2 - 15, canvas_height - 50, canvas, context);
    this.ship.initDraw();

    window.addEventListener("keydown", function () {
        keydown_handler(event, ship);
    }, false);

    // update_scores();
    this.drawLoop(ship);
};

function drawLoop(ship) {

    console.log("(2): " + ship.getContext());
    context.clearRect(0, 0, 700, 700); // This should probably just be a generic context
    ship.draw();
    setTimeout(function () {
        drawLoop(ship);
    }, 30);
}

function keydown_handler(event, ship) {
    // down arrow
    if (event.keyCode === 40) {
        ship.moveDown();
        ship.draw();
    }
    // up arrow
    if (event.keyCode === 38) {
        ship.moveUp();
        ship.draw();
    }
    // right arrow
    if (event.keyCode === 39) {
        ship.moveRight();
        ship.draw();
    }
    // left arrow
    if (event.keyCode === 37) {
        ship.moveLeft();
        ship.draw();
    }
}

class Ship {
    xLoc;
    yLoc;
    canvas;
    context;
    SHIP_HEIGHT = 15;
    SHIP_WIDTH = 30;
    shipImg;

    constructor(x, y, canvas, ctx) {
        this.xLoc = x;
        this.yLoc = y;
        this.canvas = canvas;
        this.context = ctx;

        this.shipImg = new Image();
        this.shipImg.src = "./images/Blue/Small_ship_blue/5.png";
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

    moveRight() {
        // console.log("moveRight");
        if (this.xLoc <= this.canvas.width - this.SHIP_WIDTH) {
            this.xLoc = this.xLoc + 5;
        }
    }

    moveLeft() {
        // console.log("moveLeft");
        if (this.xLoc > -5) {
            this.xLoc = this.xLoc - 5;
        }
    }

    moveUp() {
        // console.log("moveUp");
        if (this.yLoc > 0) {
            // console.log("Changing yLoc");
            this.yLoc = this.yLoc - 5;
        }
    }

    moveDown() {
        // console.log("moveDown");
        // console.log("Canvas height: " + this.canvas.height);
        if (this.yLoc < this.canvas.height - this.SHIP_HEIGHT) {
            // console.log("Changing yLoc");
            this.yLoc = this.yLoc + 5;
        }
    }
}

// class Asteroid {
//     constructor(vY, xPos, yPos) {
//         this.vY = vY;
//         this.xPos = xPos;
//         this.yPos = yPos;
//     }
//
//     draw() {
//         context.clearRect(this.xPos, this.yPos, 20, 20);
//         context.drawImage(asteroidImg, this.xPos, this.yPos + this.vY, ASTEROID_WIDTH, ASTEROID_HEIGHT);
//     }
// }