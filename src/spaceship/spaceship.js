var canvas_width;
var canvas_height;
var x = 135;
var y = 130;
var ship_height = 15;
var ship_width = 30;
var context;
var ship;
window.onload = function () {

    var canvas = document.getElementById("game-window");
    context = canvas.getContext("2d");

    canvas_width = canvas.width;
    canvas_height = canvas.height;

    this.console.log(canvas_width);
    this.console.log(canvas_height);


    ship = new Image();
    ship.src = "./images/Blue/Small_ship_blue/5.png";

    initDraw();

    //window.addEventListener("keydown", this.moveDown, false);
};

function initDraw()
{

    context.clearRect(0, 0, 800, 800);

    ship.addEventListener("load", function () {
        context.drawImage(ship, x, y, ship_width, ship_height)
    }, false);
}

function draw()
{
    context.clearRect(0, 0, 800, 800); // This should get removed
    context.drawImage(ship, x, y, ship_width, ship_height)
}

function getShip() {
    return ship;
}

function moveRight() {
    if (x <= canvas_width - ship_width) {
        x = x + 5;
        draw();
    }
}
function moveLeft() {
    console.log("moveLeft");
    if (x > -5) {
        x = x - 5;
        draw();
    }
}
function moveUp() {
    console.log("moveUp");
    if (y > 0) {
        y = y - 5;
        draw();
    }
}
function moveDown() {
    console.log("moveRight");
    if (y < canvas_height - ship_height) {
        y = y + 5;
        draw();
    }
}