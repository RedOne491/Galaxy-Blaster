// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.right = null;
    this.left = null;
    this.down = null;
    this.lastKeypressTime = 0;
    this.shoot = null;
    this.flashShoot = null;
    this.score = 0;
    this.hp = 100;
    this.spaceBar = false;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    this.ctx.canvas.addEventListener("keydown", function (e) {
        // if (String.fromCharCode(e.which) === ' ') that.space = true;
        var key = e.keyCode;
        if (key === 32) that.spaceBar = true;
        if (key === 38) that.space = true;
        if (key === 37) that.left = true; 
        if (key === 39) that.right = true;
        if (key === 40) that.down = true;
        if (key === 83) that.shoot = true; 
        if (key === 68) that.flashShoot = true;
        //var key = e.keyCode ? e.keyCode : e.which;

//      console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        // if (String.fromCharCode(e.which) === ' ') that.space = true;
        var key = e.keyCode;
        if (key === 32) that.spaceBar = false;
        if (key === 38) that.space = false;
        if (key === 37) that.left = false;
        if (key === 39) that.right = false;
        if (key === 40) that.down = false;
        if (key === 83) that.shoot = false;
        if (key === 68)  that.flashShoot = false;
        //d--> 68
        //var key = e.keyCode ? e.keyCode : e.which;

        console.log(e.keyCode);
        e.preventDefault();
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
    
}

GameEngine.prototype.loop = function () {
    if (this.hp > 0 && this.score < 15000) {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    } else {
        this.draw();
        this.ctx.font='bold 100px Arial';
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Game Over !", 100,200);
        this.ctx.font='bold 25px Arial';
        this.ctx.fillText("press space to start new game!",210,225);
    }
    if (this.score >= 15000) {
        this.draw();
        this.ctx.font='bold 100px Arial';
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Winner", 200,200);
        this.ctx.font='bold 25px Arial';
        this.ctx.fillText("Your Score is "+this.score,250,235);
    }
    if (this.spaceBar) {
        this.hp = 100;
        this.score = 0;
       
        console.log('game re-initialized');
    }
    
   // this.space = null;
    //this.right = null;
   // this.left = null;
   // this.down = null;
  //  this.diagonal = null;
   // this.shoot = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}


Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
