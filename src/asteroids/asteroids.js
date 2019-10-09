// Author: Tanner Lucas
// Date: 10/8/19
// Description: javascript class for the Asteroids in the game

$(document).ready(function() {
    class Asteroid {
        constructor(size, vector, type, rotation) {
            this.size = size;
            this.vector = vector;
            this.type = type;
            this.rotation = rotation;
            this.health = 100;
        }
        // size is how big the loaded asteroid sprite is
        getSize() {
            return this.size;
        }
        // vector is the x,y direction and magnitude the asteroid is traveling 
        getVector() {
            return this.vector;
        }
        // the type of asteroid. need to build struct for asteroid type
        getType() {
            return this.type;
        }
        // the direction of rotation and speed of rotation of the asteroid
        getRotation() {
            return this.rotation;
        }
        setSize(s) {
            this.size = s;
        } 
        setVector(v) {
            this.vector = v;
        }
        setType(t) {
            this.type = t;
        }
        setRotation(r) {
            this.rotation = r;
        }
    }
    
});