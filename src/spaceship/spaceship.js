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
        // console.log("initDraw()");
        // need to do this b/c the eventListenere. idk why
        var _xLoc = this.xLoc;
        var _yLoc = this.yLoc;
        var _context = this.context;
        var _shipImg = this.shipImg;
        var _ship_height = this.SHIP_HEIGHT;
        var _ship_width = this.SHIP_WIDTH;

        this.shipImg.addEventListener("load", function() {

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
        console.log("draw()");
        console.log("draw context: " + this.context);
        // this.context.clearRect(0,0,700,700);
        this.context.drawImage(
            this.shipImg, this.xLoc, this.yLoc, this.SHIP_WIDTH, this.SHIP_HEIGHT
        )
    }

    moveRight() {
        console.log("moveRight");
        if (this.xLoc <= this.canvas.width - this.SHIP_WIDTH) {
            this.xLoc = this.xLoc + 5;
            //draw();
        }
    }

    moveLeft() {
        console.log("moveLeft");
        if (this.xLoc > -5) {
            this.xLoc = this.xLoc - 5;
            //draw();
        }
    }

    moveUp() {
        console.log("moveUp");
        if (this.yLoc > 0) {
            console.log("Changing yLoc");
            this.yLoc = this.yLoc - 5;
            //draw();
        }
    }

    moveDown() {
        console.log("moveDown");
        console.log("Canvas height: " + this.canvas.height);
        if (this.yLoc < this.canvas.height - this.SHIP_HEIGHT) {
            console.log("Changing yLoc");
            this.yLoc = this.yLoc + 5;
            //draw();
        }
    }
}