canvas = document.getElementById("game-window");
context = canvas.getContext("2d");
var level = 1;
var score = 0;
var spawn_timer = 0;
var spawn_counter = 0;
var asteroids = [];
var lasers = [];
var health = 4;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startLevel() {
    var spawn_interval = Math.floor(Math.random() * 100 / (level * 0.2));
    var spawn_number = Math.floor(Math.random() * level ^ 2 * 20 + 15);
    spawn_timer = 0;
    spawn_counter = 0;
    asteroids = [];
    // displays level 1 when game starts and increments when level cleared
    updateLevelDisplay();
    // displays score of 0 when game starts
    updateScoreDisplay();
    await gameLoop(spawn_interval, spawn_number);

    // 20 levels or if player dies return
    setTimeout(function() {
        if (level === 20 || health <= 0) {
            return;
        }
        level += 1;

        score += 1000;
        // displays current score when level cleared
        updateScoreDisplay();
        startLevel();
    })
}

function updateLevelDisplay() {
    $("#level").text("Level: " + level);
}

function updateScoreDisplay() {
    $('#score').text("Score: " + score);
}

async function gameLoop(spawn_interval, spawn_number) {
    while (health > 0 && level <= 20) {
        context.clearRect(0, 0, 700, 700);


        asteroids.forEach(function(v) {
            //draws each asteroid
            v.detectCollision(ship);
            v.draw();
        });
        lasers.forEach(function(L) {
            //draws each spawned laser
            // lasers are spawned when the spacebar is pressed.
            // handled in the keyboard handler for the ship class
            L.draw();
            L.detectCollision(asteroids);
        });
        ship.move();
        ship.draw();

        spawn_timer += 1;
        if (spawn_timer >= spawn_interval) {
            console.log(asteroids);
            spawnAsteroid();
            spawn_interval = Math.floor(Math.random() * 100 / level);
            spawn_timer = 0;
        }

        $("#levelcount").text("Level: " + level + ", Asteroids: " + spawn_counter);

        if (spawn_counter > spawn_number) {
            return;
        }

        await sleep(30);
    }
    highscore(score);
}

function spawnAsteroid() {
    asteroids.push(new Asteroid(0.9, Math.floor(Math.random() * canvas_width), -50, canvas, context));
}

function spawnLaser(x, y) {
    // given the ship firing the laser, push a laser onto the laser array to be rendered
    lasers.push(new Laser(2, x, y, canvas, context));
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
        this.image.src = "./images/aestroid_gray.png";
    }

    draw() {
        this.yPos += this.vY;

        if (this.yPos > canvas_height) {
            spawn_counter += 1;
            asteroids.splice(asteroids.indexOf(this), 1);
        }

        this.ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);

        //hitbox
        // this.ctx.beginPath();
        // this.ctx.lineWidth = "1";
        // this.ctx.strokeStyle = "red";
        // this.ctx.rect(this.xPos, this.yPos, this.width, this.height);
        // this.ctx.stroke();
    }

    detectCollision(s) {
        if (((s.xLoc >= this.xPos && s.xLoc <= this.xPos + this.width) && (s.yLoc <= this.yPos + this.height && s.yLoc >= this.yPos)) ||
            ((s.xLoc + s.SHIP_WIDTH >= this.xPos && s.xLoc + s.SHIP_WIDTH <= this.xPos + this.width) &&
                (s.yLoc + s.SHIP_HEIGHT <= this.yPos + this.height && s.yLoc + s.SHIP_HEIGHT >= this.yPos))) {
            console.log("ship hit");
            console.log(((this.xPos >= s.xLoc) && (this.xPos <= s.xLoc + s.SHIP_WIDTH * .8) && (this.yPos <= s.yLoc + s.SHIP_HEIGHT * .9)));
            console.log("xPos" + this.xPos + "\nyPos" + this.yPos + "\nship x" + s.xLoc + "\nship y" + s.yLoc);

            health -= 1;
            delete asteroids[asteroids.indexOf(this)];
            // $(".healthBar").eq(3 - health).css("margin-right", "100px");
            $(".healthBar").eq(3 - health).css("animation-name", "slideOut");
            $(".healthBar").eq(3 - health).css("animation-duration", "3s");
            $(".healthBar").eq(3 - health).css("animation-iteration-count", 1);
            // document.getElementsByClassName("healthBar")[health].style.visibility = "hidden";
        }
    }
}

function math() {
    var spawn_interval = console.log(Math.floor(Math.random() * 5000 / level));
    var spawn_number = console.log(Math.floor(Math.random() * level * 10));
}


function keydown_handler(event, ship) {
    // down arrow
    if (event.keyCode === 40) {
        ship.yVelocity += 2;
    }
    // up arrow
    if (event.keyCode === 38) {
        ship.yVelocity -= 2;
    }
    // right arrow
    if (event.keyCode === 39) {
        ship.xVelocity += 2;
    }
    // left arrow
    if (event.keyCode === 37) {
        ship.xVelocity -= 2;
    }
    // space bar
    if (event.keyCode === 32) {
        // pressing spacebar calls the fireLaser function for the ship
        ship.fireLaser();
    }
}

function keyup_handler(event, ship) {
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
    constructor(x, y, canvas, ctx) {
        this.xLoc = x;
        this.yLoc = y;
        this.canvas = canvas;
        this.context = ctx;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.SHIP_HEIGHT = 11;
        this.SHIP_WIDTH = 30;
        this.shipImg = new Image();
        this.shipImg.src = "./images/1.png";
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
        // console.log("draw()");
        // console.log("draw context: " + this.context);
        // this.context.clearRect(0,0,700,700);
        this.context.drawImage(
            this.shipImg, this.xLoc, this.yLoc, this.SHIP_WIDTH, this.SHIP_HEIGHT
        )

        //hitbox
        // this.context.beginPath();
        // this.context.lineWidth = "1";
        // this.context.strokeStyle = "green";
        // this.context.rect(this.xLoc, this.yLoc, this.SHIP_WIDTH, this.SHIP_HEIGHT);
        // this.context.stroke();
    }

    move() {
        let changex = this.xLoc + this.xVelocity;
        let changey = this.yLoc + this.yVelocity;
        if (changex > 0 && changex < this.canvas.width - this.SHIP_WIDTH &&
            changey > 0 && changey < this.canvas.height - this.SHIP_HEIGHT) {
            this.xLoc += this.xVelocity;
            this.yLoc += this.yVelocity;
        }
    }

    fireLaser() {
        // calls the global spawnLaser function and passed the ships ylocation and center xlocation
        // fire the laser with the ship when the space bar is pressed
        // x position passed and guestimated the -2 so it looks better.
        spawnLaser(this.xLoc + 0.5 * this.SHIP_WIDTH - 2, this.yLoc);
    }
}

class Laser {

    constructor(vY, xPos, yPos, canvas, ctx) {
        // basically copying the asteroid class constructor and variables
        this.vY = -vY;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = 4;
        this.height = 6;
        this.canvas = canvas;
        this.ctx = ctx;
        this.laserImg = new Image();
        this.laserImg.src = "./images/bullet.png";
    }

    draw() {
        this.yPos += this.vY;
        this.ctx.drawImage(this.laserImg, this.xPos, this.yPos, this.width, this.height);
    }

    // given the array of asteroids, detect any collisions for each asteroid
    detectCollision(ast) {
        ast.forEach(function(a) {
            // need to clean up the boundaries for cleaner collisions but works
            if (this.xPos >= a.xPos && this.xPos <= a.xPos + a.width * .8 && this.yPos <= a.yPos + a.height * .9) {
                // console.log("hit");

                // explosion animation...
                // new Explosion(canvas, context).explode(this.xPos, this.yPos, this.width, this.height);

                //increment asteroid counter (since we do this at the end of their life)
                spawn_counter += 1;

                // delete the asteroid when hit
                delete asteroids[ast.indexOf(a)];

                // delete laser when hits asteroid
                delete lasers[lasers.indexOf(this)];

                score += 100;
                // updates displayed score when asteroid is destroyed
                updateScoreDisplay();


            }
        }.bind(this));
    }

}

window.onload = function() {
    canvas = document.getElementById("game-window");
    context = canvas.getContext("2d");
    health = 4;

    canvas_width = canvas.width;
    canvas_height = canvas.height;

    ship = new Ship(canvas_width / 2 - 11, canvas_height - 50, canvas, context);
    this.ship.initDraw();

    window.addEventListener("keydown", function() {
        keydown_handler(event, ship);
    }, false);

    window.addEventListener("keyup", function() {
        keyup_handler(event, ship);
    }, false);

    // update_scores();
    this.startLevel();
};
// class Explosion {
//     constructor(canvas, context){
//         this.canvas = canvas;
//         this.context = context;
//         this.maxRadius = 100;

//     }
//     explode(xPos, yPos, width, height) {
//         for (var i = 0; i < this.maxRadius; i++){

//             console.log(this.explosionImg.src);


//         }
//     }
//