// Global Variables
document.getElementById('win').textContent= 0;
document.getElementById('lose').textContent= 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y <= player.y+50 &&
        this.y >= player.y-50 &&
        this.x <= player.x+50 &&
        this.x >= player.x-50
    ){
        player.x = 200;
        player.y = 380;
        document.getElementById('lose').textContent ++;
    }
    this.x += dt * this.speed * 1000 ;

    if (this.x > 500) {
        this.x = -80;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    if (this.y === -20) {
        this.y = 380;
        this.x = 200;
        document.getElementById('win').textContent++;
    }
} 

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} 
Player.prototype.handleInput = function(key) {
   
    if (key === 'up' && this.y > 20) {
        this.y -= 80;
    }

    if (key === 'down' && this.y < 320) {
        this.y += 80;
    }

    if (key === 'left' && this.x > 0) {
        this.x -= 100;
    }

    if (key === 'right' && this.x < 400) {
        this.x += 100;
    }
} 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [

                new Enemy(400, 150, Math.random()), 
                new Enemy(100, 50, Math.random()),
                new Enemy(200, 230, Math.random()), 
                new Enemy(400, 150, Math.random()), 
               
];
// Place the player object in a variable called player
var player = new Player(200, 380); // 380 std

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
