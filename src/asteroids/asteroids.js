var asteroids = [];
var asteroidImg;
var score = 0;
var level = 0;
const ASTEROID_WIDTH = 20;
const ASTEROID_HEIGHT = 20;

class Asteroid {
    constructor(vY, xPos, yPos) {
        this.vY = vY;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    renderAsteroid(ctx) {
        ctx.clearRect(xPos, yPos, 20, 20);
        ctx.drawImage(asteroidImg, item.xPos, item.yPos + item.vY, ASTEROID_WIDTH, ASTEROID_HEIGHT);
    }
}

// window.onload = function () {
//     var canvas = document.getElementById("game-window");
//     var ctx = canvas.getContext("2d");
//     asteroidImg = new Image();
//     asteroidImg.src = "./images/Aestroids/aestroid_gray.png";
//
//     asteroid = new Asteroid(5, 5, 0, 0);
//     asteroid.drawMove(ctx);
// }

function renderAsteroids() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const asteroid of asteroids) {
        ctx.drawImage(asteroidImg, item.xPos, item.yPos + item.vY, ASTEROID_WIDTH, ASTEROID_HEIGHT);
    }
}

async function spawnAsteroids(numAsteroids, sleepTime) {
    for (var i = 0; i < numAsteroids; i++) {
        let asteroid = new Asteroid(Math.random() * 10, Math.random() * 640, 0);
        asteroids.push(asteroid);
        asteroid.renderAsteroid(ctx);
        await sleep(sleepTime)
    }
}

function nextLevel() {
    level++;
    asteroids = [];
    spawnAsteroids(Math.floor(Math.random() * level), Math.floor(Math.random() * 5000 / level));

}