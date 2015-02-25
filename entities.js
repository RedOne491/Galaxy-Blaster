
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// meteor "rocks"
function Metero(game) {
    this.animation = new RocksAnimation(ASSET_MANAGER.getAsset("./img/meteor.png"), 0, 0, 50, 50, .10, 56, true, true);
    this.radius = 50;
    var newX = Math.random() * 800;
    var newY = 0;
    Entity.call(this, game, newX, newY);
}

Metero.prototype = new Entity();
Metero.prototype.constructor = Metero;

Metero.prototype.update = function () {

    this.y += 1;

    if (this.y > 600) {
        this.y = 0;

    }
    this.x += 1;
    if (this.x > 800) {
        this.x = Math.random() * 800;
        this.y = 0;
    }
    Entity.prototype.update.call(this);
}

Metero.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
///////////////////////////////////////////////////////////////////////////////////////////

// create enemy1.
function Enemy(game) {
    this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy1.png"), 0, 0, 59, 27, 100, 1, true, true); 

    this.randomY = 5;
    this.randomX = 22;
    this.wall = 0;
    Entity.call(this, game, 300, 450);
}

Enemy.prototype = new Entity();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    if (this.wall === 0)
        this.x += 5;
    else this.x -= 5;

    if (this.x >= 700)
        this.wall = 1;
    if (this.x <= 0)
        this.wall = 0;
    
    if (this.reset && this.x < 650 && this.x >= 0) {
        this.x += this.randomX;
        this.reset = 0;
    }
 
    this.y += this.randomY;

    if (this.y > 600) {
        this.y = 0;
        this.reset = 1;
        // random x coordonate
        var maxX = 250;
        var minX = -250;
        // if (this.x > 750) {

        this.randomX = Math.random() * (maxX - minX) + minX;
        //  } else this.randomX = Math.random() * (maxX - minX) + minX;
        if (this.x < 0 || this.x > 750)
            this.x = 350;
        // this.x = 0;
        /**
         * Returns a random number between min (inclusive) and max (exclusive)
         */
        var maxY = 10;
        var minY = 1;
        this.randomY = Math.random() * (maxY - minY) + minY;

    }

    Entity.prototype.update.call(this);
}

Enemy.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

// Enemy2
function Enemy2(game) {
    this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy2.png"), 0, 0, 59, 32, 100, 1, true, true);

    this.reset = 1;
    this.randomY = 5;
    Entity.call(this, game, 450, 0);
}

Enemy2.prototype = new Entity();
Enemy2.prototype.constructor = Enemy;

Enemy2.prototype.update = function () {

    this.y += this.randomY;

    if (this.y > 600) {
        this.y = 0;

        // this.x = 0;
        /**
         * Returns a random number between min (inclusive) and max (exclusive)
         */
        var maxY = 10;
        var minY = 1;
        this.randomY = Math.random() * (maxY - minY) + minY;

    }

    Entity.prototype.update.call(this);
}

Enemy2.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

// enemy3
function Enemy3(game) {
    this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy3.png"), 0, 0, 42, 28, 100, 1, true, true);

    this.reset = 1;
    this.randomY = 6;
    Entity.call(this, game, 150, 0);
}

Enemy3.prototype = new Entity();
Enemy3.prototype.constructor = Enemy;

Enemy3.prototype.update = function () {

    this.y += this.randomY;

    if (this.y > 600) {
        this.y = 0;

        // this.x = 0;
        /**
         * Returns a random number between min (inclusive) and max (exclusive)
         */
        var maxY = 10;
        var minY = 1;
        this.randomY = Math.random() * (maxY - minY) + minY;

    }

    Entity.prototype.update.call(this);
}

Enemy3.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {

    // this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/bg.png"), 0, 0);

    // Entity.prototype.draw.call(this);
    //  ctx.fillStyle = "Black";
    // ctx.fillRect(0,0,800,800);
    Entity.prototype.draw.call(this);

}



// The score and the hp bar
function Score(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/score.png"), 0, 0, 133, 43, 100, 1, true, false);
    Entity.call(this, game, 0, 0);
    this.game = game;
    this.ctx;
    // this.radius = 200;
}

Score.prototype = new Entity();
Score.prototype.constructor = Score;

Score.prototype.update = function () {
    Entity.prototype.draw.call(this);
    Entity.prototype.update.call(this);
}

Score.prototype.draw = function (ctx) {

    this.ctx = ctx;
    Entity.prototype.draw.call(this);
    ctx.font='bold 20px Arial';
    ctx.fillStyle = "red";
    ctx.fillText("Score : " + this.game.score, 10, 30);
    ctx.fillText("HP  " , 10, 50);
    if (this.game.hp <= 0) {
	this.game.hp = 0;
    }
    ctx.fillRect(50, 35, this.game.hp, 20);
    

}

// boss
function Boss(game) {
    this.animation = new AnimationB(ASSET_MANAGER.getAsset(
    		"./img/boss1.png"), 0, 0, 374, 300, 0.1, 1, true, false);
    this.right = true;
    this.up = true;
    this.alive = true;

    Entity.call(this, game, 100, 0);
}

Boss.prototype = new Entity();
Boss.prototype.constructor = Boss;

Boss.prototype.update = function () {
    if (this.x == -200) this.right = true;
    if (this.x == 600) this.right = false;
    if (this.y == -100) this.up = false;
    if (this.y == 200) this.up = true;
    if (this.right) this.x += 1;
    else this.x -= 1;
    if (this.up) this.y -= 1;
    else this.y += 1;
    Entity.prototype.update.call(this);
}

Boss.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


// main-craft

function MainCraft(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/test3.png"), 0, 0, 61, 75, 0.1, 4, true, true);
    this.alive = true;
    this.switch = true;
    this.angle = 0;
    this.time = 0;
    this.alive = true;


    Entity.call(this, game, 350, 500);
}

MainCraft.prototype = new Entity();
MainCraft.prototype.constructor = MainCraft;

MainCraft.prototype.update = function () {
    if (this.game.space && this.y > 0)
        this.y -= 6;
    if (this.game.right && this.x < 730)
        this.x += 6;
    if (this.game.left && this.x > 0)
        this.x -= 6;
    if (this.game.down && this.y < 520)
        this.y += 6;
    
    Entity.prototype.update.call(this);
}

MainCraft.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);
    
    Entity.prototype.draw.call(this);
}

// flash bullet
function Flash(game, type) {
    this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true); 
    this.type = type;
    this.reset = 1;
    this.shoot = 0; // to be sure bullet afer fire have to get off screen after user release shoot button
    Entity.call(this, game, 0, -800);
}

Flash.prototype = new Entity();
Flash.prototype.constructor = Flash;

Flash.prototype.update = function () {

    if (this.y <= -100) {
        this.reset = 1;
    }

    if (true) {//!this.game.shoot ) {

        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
            if (this.type === 1) {
                this.x = this.game.entities[this.game.entities.length - 2].x - 7;
                this.y = this.game.entities[this.game.entities.length - 2].y - 5;
            } else {
                this.x = this.game.entities[this.game.entities.length - 2].x + 30;
                this.y = this.game.entities[this.game.entities.length - 2].y - 5;
            }
            this.reset = 0;
        }

        this.y -= 15;

    }  else if ( this.y > -100 ){
        this.y -= 15;
    }

    Entity.prototype.update.call(this);
}

Flash.prototype.draw = function (ctx) {
   // if (this.game.shoot)
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}


// 2nd bullet flash bullet
//function Flash2(game) {
//    this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);

//    this.reset = 1;
//    this.next = 0; // wait for previous bullet away from a certain distance then do next shot
//    Entity.call(this, game, 0, -10);
//}

//Flash2.prototype = new Entity();
//Flash2.prototype.constructor = Flash2;

//Flash2.prototype.update = function () {

//    // initializing 1st bullet location base on main_craft.
//  //  this.x = this.game.entities[this.game.entities.length - 2].x + 12;
//  //  this.y = this.game.entities[this.game.entities.length - 2].y - 40;

//    if (this.y > this.game.entities[this.game.entities.length - 4].y + 100)
//        this.next = 1;


//    if (this.y <= -100) {
//        this.reset = 1;
//    }

//    if ( (!this.game.shoot) && this.next === 1) {

//        this.y -= 15;

//        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
//            this.x = this.game.entities[this.game.entities.length - 2].x + 12;
//            this.y = this.game.entities[this.game.entities.length - 2].y - 40;
//            this.reset = 0;
//            this.next = 0;
//        }

//    } else if (this.y > -100 && this.next === 1 ) {
//        this.y -= 15;
//    }

//    Entity.prototype.update.call(this);
//}

//Flash2.prototype.draw = function (ctx) {
//    if (this.next)  // no show bullet...
//    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

//    Entity.prototype.draw.call(this);
//}

// 2nd bullet flash bullet
//function Flash2(game) {
//    this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);

//    this.reset = 1;
//    this.next = 0; // wait for previous bullet away from a certain distance then do next shot
//    Entity.call(this, game, 0, -10);
//}

//Flash2.prototype = new Entity();
//Flash2.prototype.constructor = Flash2;

//Flash2.prototype.update = function () {

//    // initializing 1st bullet location base on main_craft.
//  //  this.x = this.game.entities[this.game.entities.length - 2].x + 12;
//  //  this.y = this.game.entities[this.game.entities.length - 2].y - 40;

//    if (this.y > this.game.entities[this.game.entities.length - 4].y + 100)
//        this.next = 1;


//    if (this.y <= -100) {
//        this.reset = 1;
//    }

//    if (this.game.shoot && this.next === 1) {

//        this.y -= 15;

//        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
//            this.x = this.game.entities[this.game.entities.length - 2].x + 12;
//            this.y = this.game.entities[this.game.entities.length - 2].y - 40;
//            this.reset = 0;
//            this.next = 0;
//        }

//    } else if (this.y > -100 && this.next === 1 ) {
//        this.y -= 15;
//    }

//    Entity.prototype.update.call(this);
//}

//Flash2.prototype.draw = function (ctx) {
//    if (this.next)  // no show bullet...
//    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

//    Entity.prototype.draw.call(this);
//}


// scrolling background
function ScrollBG1(game) {
    this.animation = new AnimationBG(ASSET_MANAGER.getAsset("./img/bg1.png"), 0, 0, 800, 600, 5, 1, true, true);
    Entity.call(this, game, 0, 0);
}

ScrollBG1.prototype = new Entity();
ScrollBG1.prototype.constructor = ScrollBG1;

ScrollBG1.prototype.update = function () {

    this.y += 1;
    if (this.y >= 600) {
        this.y = -1200;
    }
    

    Entity.prototype.update.call(this);
}

ScrollBG1.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

// 2nd bacground
function ScrollBG2(game) {
    this.animation = new AnimationBG(ASSET_MANAGER.getAsset("./img/bg2.png"), 0, 0, 800, 600, 5, 1, true, true);
    Entity.call(this, game, 0, -600);
}

ScrollBG2.prototype = new Entity();
ScrollBG2.prototype.constructor = ScrollBG2;

ScrollBG2.prototype.update = function () {

    this.y += 1;
    if (this.y >= 600) {
        this.y = -1200;
    }

    Entity.prototype.update.call(this);
}

ScrollBG2.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,0);

    Entity.prototype.draw.call(this);
}

// 3nd bacground
function ScrollBG3(game) {
    this.animation = new AnimationBG(ASSET_MANAGER.getAsset("./img/bg3.png"), 0, 0, 800, 600, 5, 1, true, true);
    Entity.call(this, game, 0, -1200);
}

ScrollBG3.prototype = new Entity();
ScrollBG3.prototype.constructor = ScrollBG3;

ScrollBG3.prototype.update = function () {

    this.y += 1;
    if (this.y >= 600) {
        this.y = -1200;
    }

    Entity.prototype.update.call(this);
}

ScrollBG3.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}


// fire ball bullet
function FireBall(game) {
    this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/fireBall1.png"), 0, 0, 21, 21, 0.07, 4, true, true);

    this.reset = 1;
    this.shoot = 0; // to be sure bullet afer fire have to get off screen after user release shoot button
    this.locate = false;
    this.sin = 0;
    this.cos = 0;
    this.tempX = 0;
    this.tempY = 0;
    this.activate = false;
    this.random = 0;
    this.explosion = false;
    this.switchSprite = false;
    this.time = 0;
    this.add1 = true;

    Entity.call(this, game, 0, -800);
}

FireBall.prototype = new Entity();
FireBall.prototype.constructor = FireBall;

FireBall.prototype.update = function () {

    // impact detection
    var x = this.x - this.game.entities[this.game.entities.length - 2].x;
    var y = this.y - this.game.entities[this.game.entities.length - 2].y - 100;
    var distance = Math.sqrt(x * x + y * y);

    // console.log(this.game.clockTick);
    //console.log(this.time);

    if (distance < 100) {
        this.explosion = true;
        if (this.add1) {
          //  this.game.entities[3].hpBar += 0.4;
            this.add1 = false;
        }
    }

    if (this.explosion)
        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
    // end impact detection

    if (this.time > 1) {
        this.explosion = false;
        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
        this.y = 800;// skip down after explosion
        this.time = 0;
        this.add1 = true;
        // this.stop = true;

    } else if (!this.explosion && this.game.entities[3].alive) {
        // this.activate = true;

        if (this.y >= 700 || this.y < -10 || this.x > 800 || this.x < -10) { // (this.y <= -100) 
            this.reset = 1;
            this.locate = false;
            this.random = Math.random() * (15 - 5) + 5;

        }

        if (!this.locate) {

            tempX = this.game.entities[3].x - this.game.entities[this.game.entities.length - 2].x + 140;
            tempY = this.game.entities[3].y - this.game.entities[this.game.entities.length - 2].y + 240;

            var hypo = Math.sqrt(tempX * tempX + tempY * tempY);
            this.sin = tempY / hypo;
            this.cos = tempX / hypo;
            this.locate = true;
        }
        if (true) {
            if (this.reset === 1) { // reset or initializing 1st bullet location base on boss.
                this.x = this.game.entities[3].x + 180; // offset
                this.y = this.game.entities[3].y + 280; // offset
                this.reset = 0;
            }
            if (this.game.entities[this.game.entities.length - 2].alive) {
                this.y -= this.sin * this.random;
                this.x -= this.cos * this.random;
            } else { this.y = -100; this.x = -100; }

        } else if (this.y < 700) {
            if (this.game.entities[this.game.entities.length - 2].alive) {
                this.y += this.sin * this.random;
                this.x += this.cos * this.random;
            } else { this.y = -100; this.x = -100; }
        }

    } else if (!this.explosion && !this.game.entities[3].alive) { this.x = -25; this.y = -25; }

    Entity.prototype.update.call(this);
}

FireBall.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
        this.switchSprite = true;

    } else if (!this.explosion && this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/fireBall1.png"), 0, 0, 21, 21, .07, 4, true, true);
        this.switchSprite = false;

    }

    if (this.game.entities[3].alive && this.game.entities[this.game.entities.length - 2].alive) // no show after tank is destroyed)
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 2, this.explosion);

    Entity.prototype.draw.call(this);
}

// flash bullet / rocket for now
function Rocket(game) {
    this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/rocketFull.png"), 0, 0, 33, 65, .1, 6, true, true);
    // this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/expl.png"), 0, 0, 65, 81, .1, 5, true, true);

    this.reset = 1;
    this.shoot = 0; // to be sure bullet afer fire have to get off screen after user release shoot button
    this.locate = false;
    this.sin = 0;
    this.cos = 0;
    this.tempX = 0;
    this.tempY = 0;
    this.explosion = false;
    this.time = 0;
    this.stop = false;
    this.add1 = true;

    this.switchSprite = false;

    Entity.call(this, game, 0, -800);
}

Rocket.prototype = new Entity();
Rocket.prototype.constructor = Rocket;

Rocket.prototype.update = function () {

    if (this.y <= -100) {
        this.reset = 1;
        // this.locate = false;
    }

    var x = this.game.entities[3].x - this.game.entities[7].x + 180;
    var y = this.game.entities[3].y - this.game.entities[7].y + 220;
    var distance = Math.sqrt(x * x + y * y);

    // console.log(this.game.clockTick);
    console.log(this.time);

    if (distance < 50) {
        this.explosion = true;
        if (this.add1) {
        //    this.game.entities[2].hpBar++;
            this.add1 = false;
        }
        //this.done = false;

    }
    if (this.explosion)
        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
    // if (this.game.shoot)
    //    this.stop = false;

    if (this.time > 1) {
        this.explosion = false;
        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
        this.y = -600;// skip down after explosion
        this.time = 0;
        this.add1 = true;
        // this.stop = true;

    } else if (this.game.shoot && this.time === 0) {


        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
            this.x = this.game.entities[this.game.entities.length - 2].x + 15;
            this.y = this.game.entities[this.game.entities.length - 2].y ;
            this.reset = 0;
        }
        if (!this.explosion)
            this.y -= 10;

    } else if (this.y > -100 && !this.explosion) {

        this.y -= 10;
    }

    Entity.prototype.update.call(this);
}

Rocket.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
        this.switchSprite = true;

    } else if (!this.explosion && this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/rocketFull.png"), 0, 0, 33, 65, .1, 6, true, true);
        this.switchSprite = false;

    }

    if (this.game.entities[3].alive && this.game.entities[this.game.entities.length - 2].alive) // no show after tank is destroyed
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame);

    Entity.prototype.draw.call(this);
}

// new Flash bullets
// flash bullet / rocket for now
function NewFlash(game, type) {
    this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);
    // this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/expl.png"), 0, 0, 65, 81, .1, 5, true, true);
    this.type = type;
    this.reset = 1;
    this.shoot = 0; // to be sure bullet afer fire have to get off screen after user release shoot button
    this.locate = false;
    this.sin = 0;
    this.cos = 0;
    this.tempX = 0;
    this.tempY = 0;
    this.explosion = false;
    this.time = 0;
    this.stop = false;
    this.add1 = true;

    this.switchSprite = false;

    Entity.call(this, game, 0, -800);
}

NewFlash.prototype = new Entity();
NewFlash.prototype.constructor = NewFlash;

NewFlash.prototype.update = function () {

    if (this.y <= -100) {
        this.reset = 1;
        // this.locate = false;
    }
    var x; var y;
    if (this.type === 1) {
        x = this.game.entities[3].x - this.game.entities[this.game.entities.length - 4].x + 180;
        y = this.game.entities[3].y - this.game.entities[this.game.entities.length - 4].y + 220;
    } else if (this.type === 2) {
        x = this.game.entities[3].x - this.game.entities[this.game.entities.length - 3].x + 180;
        y = this.game.entities[3].y - this.game.entities[this.game.entities.length - 3].y + 220;
    }
    var distance = Math.sqrt(x * x + y * y);

    // console.log(this.game.clockTick);
    console.log(this.time);

    if (distance < 50) {
        this.explosion = true;
        if (this.add1) {
            //    this.game.entities[2].hpBar++;
            this.add1 = false;
        }
        //this.done = false;

    }
    if (this.explosion)
        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
    // if (this.game.shoot)
    //    this.stop = false;

    if (this.time > 1) {
        this.explosion = false;
        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
        this.y = -600;// skip down after explosion
        this.time = 0;
        this.add1 = true;
        // this.stop = true;

    } else if (1 && this.time === 0) { // this.game.shoot replace by true for auto shooting


        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
            if (this.type === 1) {
                this.x = this.game.entities[this.game.entities.length - 2].x - 7;
                this.y = this.game.entities[this.game.entities.length - 2].y - 5;
            } else {
                this.x = this.game.entities[this.game.entities.length - 2].x + 30;
                this.y = this.game.entities[this.game.entities.length - 2].y - 5;
            }

            this.reset = 0;
        }
        if (!this.explosion)
            this.y -= 10;

    } else if (this.y > -100 && !this.explosion) {

        this.y -= 10;
    }

    Entity.prototype.update.call(this);
}

NewFlash.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
        this.switchSprite = true;

    } else if (!this.explosion && this.switchSprite) {
        this.animation = this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);
        this.switchSprite = false;

    }

    if (this.game.entities[3].alive && this.game.entities[this.game.entities.length - 2].alive) // no show after tank is destroyed
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame);

    Entity.prototype.draw.call(this);
}

// boss random bullets
//function BossBullet(game, type) {
//    this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);
//    // this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/expl.png"), 0, 0, 65, 81, .1, 5, true, true);
//    this.type = type;
//    this.reset = 1;
//    this.shoot = 0; // to be sure bullet afer fire have to get off screen after user release shoot button
//    this.locate = false;
//    this.sin = 0;
//    this.cos = 0;
//    this.tempX = 0;
//    this.tempY = 0;
//    this.explosion = false;
//    this.time = 0;
//    this.stop = false;
//    this.add1 = true;

//    this.switchSprite = false;

//    Entity.call(this, game, 0, -800);
//}

//BossBullet.prototype = new Entity();
//BossBullet.prototype.constructor = BossBullet;

//BossBullet.prototype.update = function () {

//    if (this.y <= -100) {
//        this.reset = 1;
//        // this.locate = false;
//    }
//    var x; var y;
//    if (this.type === 1) {
//        x = this.game.entities[3].x - this.game.entities[this.game.entities.length - 4].x + 180;
//        y = this.game.entities[3].y - this.game.entities[this.game.entities.length - 4].y + 220;
//    } else if (this.type === 2) {
//        x = this.game.entities[3].x - this.game.entities[this.game.entities.length - 3].x + 180;
//        y = this.game.entities[3].y - this.game.entities[this.game.entities.length - 3].y + 220;
//    }
//    var distance = Math.sqrt(x * x + y * y);

//    // console.log(this.game.clockTick);
//    console.log(this.time);

//    if (distance < 50) {
//        this.explosion = true;
//        if (this.add1) {
//            //    this.game.entities[2].hpBar++;
//            this.add1 = false;
//        }
//        //this.done = false;

//    }
//    if (this.explosion)
//        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
//    // if (this.game.shoot)
//    //    this.stop = false;

//    if (this.time > 1) {
//        this.explosion = false;
//        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
//        this.y = -600;// skip down after explosion
//        this.time = 0;
//        this.add1 = true;
//        // this.stop = true;

//    } else if (1 && this.time === 0) { // this.game.shoot replace by true for auto shooting


//        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
//            if (this.type === 1) {
//                this.x = this.game.entities[this.game.entities.length - 2].x - 7;
//                this.y = this.game.entities[this.game.entities.length - 2].y - 5;
//            } else {
//                this.x = this.game.entities[this.game.entities.length - 2].x + 30;
//                this.y = this.game.entities[this.game.entities.length - 2].y - 5;
//            }

//            this.reset = 0;
//        }
//        if (!this.explosion)
//            this.y -= 10;

//    } else if (this.y > -100 && !this.explosion) {

//        this.y -= 10;
//    }

//    Entity.prototype.update.call(this);
//}

//BossBullet.prototype.draw = function (ctx) {

//    if (this.explosion && !this.switchSprite) {
//        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
//        this.switchSprite = true;

//    } else if (!this.explosion && this.switchSprite) {
//        this.animation = this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);
//        this.switchSprite = false;

//    }

//    if (this.game.entities[3].alive && this.game.entities[this.game.entities.length - 2].alive) // no show after tank is destroyed
//        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame);

//    Entity.prototype.draw.call(this);
//}

function BossBullet(game, rangeX) {
    this.animation = new BossBulletAnimation(ASSET_MANAGER.getAsset("./img/bossBullet.png"), 0, 0, 24, 26, 0.07, 2, true, true);

    this.rangeX = rangeX;
    this.reset = 1;
    this.shoot = 0; // to be sure bullet afer fire have to get off screen after user release shoot button
    this.locate = false;
    this.sin = 0;
    this.cos = 0;
    this.tempX = 0;
    this.tempY = 0;
    this.activate = false;
    this.random = 0;
    this.explosion = false;
    this.switchSprite = false;
    this.time = 0;
    this.add1 = true;

    Entity.call(this, game, 0, -800);
}

BossBullet.prototype = new Entity();
BossBullet.prototype.constructor = BossBullet;

BossBullet.prototype.update = function () {

    // impact detection
    var x = this.x - this.game.entities[this.game.entities.length - 2].x;
    var y = this.y - this.game.entities[this.game.entities.length - 2].y - 100;
    var distance = Math.sqrt(x * x + y * y);

    if (distance < 100) {
        this.explosion = true;
        if (this.add1) {
            //  this.game.entities[3].hpBar += 0.4;
            this.add1 = false;
        }
    }

    if (this.explosion)
        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
    // end impact detection

    if (this.time > 1) {
        this.explosion = false;
        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
        this.y = 800;// skip down after explosion
        this.time = 0;
        this.add1 = true;
        // this.stop = true;

    } else if (!this.explosion && this.game.entities[3].alive) {
        // this.activate = true;

        if (this.y >= 700 || this.y < -10 ) { // dont care aboute X now || this.x > 800 || this.x < -10) { // (this.y <= -100) 
            this.reset = 1;
            this.locate = false;
            this.random = Math.random() * (15 - 5) + 5;

        }

        //if (!this.locate) {

        //    tempX = this.game.entities[3].x - this.game.entities[this.game.entities.length - 2].x + 140;
        //    tempY = this.game.entities[3].y - this.game.entities[this.game.entities.length - 2].y + 240;

        //    var hypo = Math.sqrt(tempX * tempX + tempY * tempY);
        //    this.sin = tempY / hypo;
        //    this.cos = tempX / hypo;
        //    this.locate = true;
        //}
        if (true) {
            if (this.reset === 1) { // reset or initializing 1st bullet location base on boss.
                this.x = this.game.entities[3].x + 180; // offset
                this.y = this.game.entities[3].y + 280; // offset
                this.reset = 0;
            }
            if (this.game.entities[this.game.entities.length - 2].alive) {
                this.y += 3; // this.sin * this.random;
                this.x += this.rangeX; //this.cos * this.random;
            } else { this.y = -100; this.x = -100; }

        } else if (this.y < 700) {
            if (this.game.entities[this.game.entities.length - 2].alive) {
               // this.y += this.sin * this.random;
               // this.x += this.cos * this.random;
                this.y += 3; // this.sin * this.random;
                this.x += this.rangeX;

            } else { this.y = -100; this.x = -100; }
        }

    } else if (!this.explosion && !this.game.entities[3].alive) { this.x = -25; this.y = -25; }

    Entity.prototype.update.call(this);
}

BossBullet.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
        this.switchSprite = true;

    } else if (!this.explosion && this.switchSprite) {
        this.animation = new BossBulletAnimation(ASSET_MANAGER.getAsset("./img/bossBullet.png"), 0, 0, 24, 26, .07, 2, true, true);
        this.switchSprite = false;

    }

    if (this.game.entities[3].alive && this.game.entities[this.game.entities.length - 2].alive) // no show after tank is destroyed)
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 2, this.explosion);

    Entity.prototype.draw.call(this);
}
