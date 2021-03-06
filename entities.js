
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// meteor "rocks"
function Meteor(game, type) {
	this.game = game;
    this.type = type;
    this.animation = new RocksAnimation(ASSET_MANAGER.getAsset("./img/meteor.png"), 0, 0, 50, 50, .10, 56, true, true);
    this.radius = 50;
    var newX = Math.random() * 800;
    var newY = -50;
    // this.distBetweenFlash = 0;
    this.time = 0;
    this.explosion = false;
    this.switchSprite = false;

    Entity.call(this, game, newX, newY); 
}

Meteor.prototype = new Entity();
Meteor.prototype.constructor = Meteor;

Meteor.prototype.update = function () {

    if (this.game.level === 1 && this.type%3 === 0 && (!this.game.bossOnScreen || this.game.entities[8].alive) ||
    		(this.game.level === 3 && !this.game.bossOnScreen)) {
	    //////////////// 
	    // flash Bullet Collision detect
	    var bottom = this.game.entities.length - 5;
	    var track = 0;
	    var distBetweenFlash = 10000; // initial any value > than 55
	    for (var i = bottom; i > this.game.entities.length - 5 - 6; i--) { // keep number 5 for tracking purpose
	        // impact detection - 1st flash bullet
	        var x = this.x - this.game.entities[i].x;
	        var y = this.y - this.game.entities[i].y;
	        distBetweenFlash = Math.sqrt(x * x + y * y);
	        if (distBetweenFlash < 55) {
	            track = i;
	            break;
	        }
	    }
	
	
	    // impact on rocket
	    var x2 = this.x - this.game.entities[13].x;
	    var y2 = this.y - this.game.entities[13].y;
	    var distance2 = Math.sqrt(x2 * x2 + y2 * y2);
	
	
	    // collision on maincraft
	    var x3 = this.x - this.game.entities[this.game.entities.length - 3].x;
	    var y3 = this.y - this.game.entities[this.game.entities.length - 3].y;
	    var distance3 = Math.sqrt(x3 * x3 + y3 * y3);
	
	    if ((distBetweenFlash < 55 || distance2 < 55 || distance3 < 55) && this.time == 0) { 
	        this.explosion = true;
	        if (distBetweenFlash < 55)
	            this.game.entities[track].explosion = true;
	        else if (distance2 < 55)
	            this.game.entities[13].explosion = true;
	        else if (distance3 < 55)
	            this.game.hp -= 5;
	
	//        this.game.entities[6].hitPoint++;
	//        this.game.entities[7].hitPoint++;
	//        this.game.entities[8].hitPoint++;
	
	
	        if (this.add1) {
	            this.game.score += 5;
	            //    this.game.entities[2].hpBar++;
	            this.add1 = false;
	        }
	    }
	
	    if (this.explosion)
	        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
	
	
	    if (this.time > .3) {
	        this.explosion = false;
	        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
	        this.time = 0;
	        this.add1 = true;
	
	        if (this.type % 2 === 0) {
	            this.x = -150;
	
	            this.y = Math.random() * (600) - 150;
	        } else {
	            this.y = -150;
	
	            this.x = Math.random() * (800) + 150;
	        }
	
	    } else if (this.y > - 200 && !this.explosion) {
	        if (this.type >= 0 && this.type <= 3) {
	            this.y += 2;
	            this.x -= 1;
	        } else {
	            this.y += 2;
	            this.x += 1;
	        }
	
	    }
	 
	    if (this.y > 600 || this.x > 800) {
	        if (this.type % 2 === 0 ) {
	            this.x = -150;
	
	            this.y = Math.random() * (600) - 150;
	        } else {
	            this.y = -150;
	
	            this.x = Math.random() * (800) + 150;
	        }
	
	        //this.x = Math.random() * 800;
	        //this.y = 0;
	    }
	
	    Entity.prototype.update.call(this);
    }
}

Meteor.prototype.draw = function (ctx) {
	if (this.game.level === 1 && this.type%3 === 0 && (!this.game.bossOnScreen || this.game.entities[8].alive) ||
			(this.game.level === 3 && !this.game.bossOnScreen)) {
	    if (this.explosion && !this.switchSprite) {
	        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 5, true, true);
	        this.switchSprite = true;
	        var snd = new Audio("./sounds/explosion.wav"); // buffers automatically when created
	        snd.play();
	
	    } else if (!this.explosion && this.switchSprite) {
	
	        this.animation = new RocksAnimation(ASSET_MANAGER.getAsset("./img/meteor.png"), 0, 0, 50, 50, .10, 56, true, true);
	        this.switchSprite = false;
	
	    }
 
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame);

	    //////////////
	    //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);
	
	
	    //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	
	    Entity.prototype.draw.call(this);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// meteor "small rocks"
function SmallMeteor(game) {
    this.animation = new RocksAnimation(ASSET_MANAGER.getAsset("./img/meteor_small.png"), 0, 0, 30, 30, .10, 56, true, true);
    this.radius = 30;
    var newX = 800;
    var newY = Math.random() * 600;
    Entity.call(this, game, newX, newY);
}

SmallMeteor.prototype = new Entity();
SmallMeteor.prototype.constructor = SmallMeteor;

SmallMeteor.prototype.update = function () {

    this.x -= 3;
    this.y -= 1;
    if (this.y < 0) {
        this.x = 800;
        this.y = Math.random() * 600;

    }

    if (this.x < 0) {
        this.x = 800;
        this.y = Math.random() * 600;
    }
    Entity.prototype.update.call(this);
}

SmallMeteor.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

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



// The score , the hp bar and the lives
function Score(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/score.png"), 0, 0, 133, 43, 100, 1, true, false);
    Entity.call(this, game, 0, 0);
    this.game = game;
    this.ctx;
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    // this.radius = 200;
}

Score.prototype = new Entity();
Score.prototype.constructor = Score;

Score.prototype.update = function () {
    
    Entity.prototype.draw.call(this);
    Entity.prototype.update.call(this);
}

Score.prototype.draw = function (ctx) {
    if (this.game.level === 1 && this.count1 < 100) {
	this.count3 = 0;
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/level1.png"), 90, 200);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/levels1.png"), 20, 570);
	this.count1++;
    }
    if (this.game.level === 2 && this.count2 < 100) {
	this.count1 = 0;
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/level2.png"), 90, 200);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/levels2.png"), 20,570);
	this.count2++;
    }
    if (this.game.level === 3 && this.count3 < 100) {
	this.count2 = 0;
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/level3.png"), 90, 200);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/levels3.png"), 20, 570);
	this.count3++;
    }
    if (this.game.level === 1 ) {
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/levels1.png"), 20, 570);
    }
    if (this.game.level === 2 ) {
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/levels2.png"), 20,570);
    }
    if (this.game.level === 3 ) {
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/levels3.png"), 20, 570);
    }
    this.ctx = ctx;
    Entity.prototype.draw.call(this);
    hx = 30;
    for (i = 0 ; i < this.game.lives ; i++) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./img/maincraft.png"), hx, 10);
        hx += 35;
    }
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = "red";
    ctx.fillText("Score : " + this.game.score, 10, 61);
    ctx.fillText("HP  ", 10, 81);
    if (this.game.hp <= 0) {
        this.game.hp = 0;
    }
    if (this.game.hp > 60) {
        ctx.fillStyle = "green";
    } else if (this.game.hp < 60 && this.game.hp > 25) {
        ctx.fillStyle = "yellow";
    } else {
        ctx.fillStyle = "red";
    }
    ctx.fillRect(50, 66, this.game.hp, 20);
}


// boss
function Boss(game, type) {
    this.type = type;

    if (this.type === 1) {
        this.animation = new AnimationB(ASSET_MANAGER.getAsset(
			"./img/boss_mid2.png"), 0, 0, 187, 150, 0.5, 3, true, false);
        this.alive = true;
        this.hitPoint = 100;// 5;
        this.radius = 187 / 2;
        Entity.call(this, game, Math.random() * 613, -750);
    }
    if (this.type === 2) {
        this.animation = new AnimationB(ASSET_MANAGER.getAsset(
    		"./img/boss_mid3.png"), 0, 0, 187, 150, 0.5, 3, true, false);
        this.alive = false;
        this.hitPoint = 100; // 5
        this.radius = 187 / 2;
        Entity.call(this, game, Math.random() * 613, 1000);
    }
    if (this.type === 3) {
        this.animation = new AnimationB(ASSET_MANAGER.getAsset(
	   		"./img/boss1.png"), 0, 0, 374, 300, 0.5, 3, true, false);
        this.alive = false;
        this.hitPoint = 200; // 15;
        this.radius = 374 / 2;
        Entity.call(this, game, Math.random() * 426, 1000);
    }

    this.animExplosionBoss = new AnimationB(ASSET_MANAGER.getAsset(
		"./img/explosion100px.png"), 0, 0, 100, 100, .05, 44, true, false);

    this.animDamaged1 = new AnimationB(ASSET_MANAGER.getAsset(
	"./img/fire_damaged.png"), 0, 0, 47, 80, .05, 16, true, false);

    this.animDamaged2 = new AnimationB(ASSET_MANAGER.getAsset(
	"./img/fire_damaged.png"), 0, 0, 47, 80, .05, 16, true, false);

    this.right = true;
    this.up = true;
    this.elapsedTime = 0;
    this.explode = false;  
    this.firstFire = this.hitPoint * .5;
    this.secondFire = this.hitPoint * .25; 
    this.levelUp = false;
}
 
Boss.prototype.update = function () { 
	if (this.levelUp) {
		this.game.level++;
		this.levelUp = false;
	}
    if (this.y > -250 && this.y < 600 && (this.type === 1 || this.type === 2) && this.alive) 
    	this.game.bossOnScreen = true;
    if (this.y > -400 && this.y < 600 && this.type === 3 && this.alive) this.game.bossOnScreen = true; 
    if (this.y < 0) this.y += 1;
    else if (this.alive) {
        var rocket, flash;
        for (i = 0; i < this.game.entities.length; i++) { // look for either rocket or flash entities use istanceof for accesing
            if (this.game.entities[i] instanceof Rocket) rocket = i;
            if (this.game.entities[i] instanceof NewFlash) flash = i;
        }
        var x = this.x - this.game.entities[rocket].x;
        var y = this.y - this.game.entities[rocket].y - 100;
        var distance = Math.sqrt(x * x + y * y);

        var x2 = this.x - this.game.entities[flash].x;
        var y2 = this.y - this.game.entities[flash].y - 100;
        var distance2 = Math.sqrt(x2 * x2 + y2 * y2);

        if (this.type === 1) {
            if ((distance < 500 || distance2 < 500) && (this.game.entities[rocket].y > this.y ||
            	this.game.entities[flash].y > this.y)) {
                if ((this.x + this.radius > this.game.entities[rocket].x + 16 ||
                	this.x + this.radius > this.game.entities[flash].x + 18) && this.x < 613) this.x += 1;
                else if (this.x > 0) this.x -= 1;
            } else {
                if (this.x < 0) this.right = true;
                if (this.x > 613) this.right = false;
                if (this.y < 1) this.up = false;
                if (this.y > 200) this.up = true;
                if (this.right) this.x += 1;
                else this.x -= 1;
                if (this.up) this.y -= 1;
                else this.y += 1;
            }
        }
        if (this.type === 2) {
            if ((distance < 500 || distance2 < 500) && (this.game.entities[rocket].y > this.y ||
            	this.game.entities[flash].y > this.y)) {
                if ((this.x + this.radius > this.game.entities[rocket].x + 16 ||
                	this.x + this.radius > this.game.entities[flash].x + 18) && this.x < 613) this.x += 2;
                else if (this.x > 0) this.x -= 2;
            } else {
                if (this.x < 0) this.right = true;
                if (this.x > 613) this.right = false;
                if (this.y < 1) this.up = false;
                if (this.y > 200) this.up = true;
                if (this.right) this.x += 2;
                else this.x -= 2;
                if (this.up) this.y -= 2;
                else this.y += 2;

            }
        }
        if (this.type === 3) {
            if ((distance < 500 || distance2 < 500) && (this.game.entities[rocket].y > this.y ||
            	this.game.entities[flash].y > this.y)) {
                if ((this.x + this.radius > this.game.entities[rocket].x + 16 ||
                    this.x + this.radius > this.game.entities[flash].x + 18) && this.x < 426) this.x += 1;
                else if (this.x > 0) this.x -= 1;
            } else {
                if (this.x < 0) this.right = true;
                if (this.x > 426) this.right = false;
                if (this.y < 1) this.up = false;
                if (this.y > 200) this.up = true;
                if (this.right) this.x += 1;
                else this.x -= 1;
                if (this.up) this.y -= 1;
                else this.y += 1;
            }
        }
    }
    if (this.explode) {
        this.elapsedTime += this.game.clockTick;
  //      console.log("time = " + this.elapsedTime);
        if (this.elapsedTime > 1.6) {
            this.y = 1000;
            this.explode = false;
            this.elapsedTime = 0;
        }
    } 
}

Boss.prototype.draw = function (ctx) {
    this.ctx = ctx;
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3, 1);

    if (this.hitPoint < this.firstFire && this.type != 3)
        this.animDamaged1.drawFrame(this.game.clockTick, ctx, this.x+43, this.y + 23, 16, 1.75);
 
    if (this.hitPoint < this.firstFire && this.type == 3)
        this.animDamaged1.drawFrame(this.game.clockTick, ctx, this.x + 200, this.y + 50, 16, 2.5);

    if (this.hitPoint < this.secondFire && this.type == 3)
        this.animDamaged2.drawFrame(this.game.clockTick, ctx, this.x, this.y, 16, 2.5);

    if (this.explode && this.type != 3) {
        this.animExplosionBoss.drawFrame(this.game.clockTick, ctx, this.x + 10, this.y + 40, 8, 1.5);

        var snd = new Audio("./sounds/bossExploding.mp3"); // buffers automatically when created
        snd.play();
    }
    if (this.explode && this.type == 3) {
        this.animExplosionBoss.drawFrame(this.game.clockTick, ctx, this.x + 50, this.y + 80, 8, 3);
        var snd = new Audio("./sounds/bossExploding.mp3"); // buffers automatically when created
        snd.play();
    }
    if (this.game.bossOnScreen && this.alive) {
 //   	console.log("hit point: " + this.hitPoint);
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillStyle = "red";
        this.ctx.fillText("BOSS HP ", 600, 35);
        if (this.hitPoint > this.firstFire) {
            this.ctx.fillStyle = "green";
        } else if (this.hitPoint <=  this.firstFire && this.hitPoint > this.secondFire) {
            this.ctx.fillStyle = "yellow";
        } else {
            this.ctx.fillStyle = "red";
        }
        this.ctx.fillRect(600, 50, this.hitPoint, 20);
    }
}


// main-craft

function MainCraft(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/test3.png"), 0, 0, 61, 75, 0.1, 4, true, true);
    this.alive = true;
    this.switch = true;
    this.angle = 0;
    this.time = 0;
    //this.alive = true;


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
    if (this.game.destroyBoss && this.game.bossOnScreen) {
    	if (this.game.entities[6].alive) 
    		this.game.entities[6].hitPoint = 0;
    	if (this.game.entities[7].alive) 
    		this.game.entities[7].hitPoint = 0;
    	if (this.game.entities[8].alive) 
    		this.game.entities[8].hitPoint = 0; 
    }

    if (this.game.entities[6].alive) {
        var x = this.x + 31 - this.game.entities[6].x - this.game.entities[6].radius;
        var y = this.y + 37 - this.game.entities[6].y - this.game.entities[6].radius;
        var distance = Math.sqrt(x * x + y * y);
        if (distance < this.game.entities[6].radius + 37) {
            var delta = this.game.entities[6].radius + 37 - distance;
            var difX = (this.x - this.game.entities[6].x) / distance;
            var difY = (this.y - this.game.entities[6].y) / distance;
            this.x += difX * delta / 2;
            this.y += difY * delta / 2;
        }
    }
    if (this.game.entities[7].alive) {
        var x = this.x + 31 - this.game.entities[7].x - this.game.entities[7].radius;
        var y = this.y + 37 - this.game.entities[7].y - this.game.entities[7].radius;
        var distance = Math.sqrt(x * x + y * y);
        if (distance < this.game.entities[7].radius + 37) {
            var delta = this.game.entities[7].radius + 37 - distance;
            var difX = (this.x - this.game.entities[7].x) / distance;
            var difY = (this.y - this.game.entities[7].y) / distance;
            this.x += difX * delta / 2;
            this.y += difY * delta / 2;
        }
    }
    if (this.game.entities[8].alive) {
        var x = this.x + 31 - this.game.entities[8].x - this.game.entities[8].radius;
        var y = this.y + 37 - this.game.entities[8].y - this.game.entities[8].radius;
        var distance = Math.sqrt(x * x + y * y);
        if (distance < this.game.entities[8].radius + 37) {
            var delta = this.game.entities[8].radius + 37 - distance;
            var difX = (this.x - this.game.entities[8].x) / distance;
            var difY = (this.y - this.game.entities[8].y) / distance;
            this.x += difX * delta / 2;
            this.y += difY * delta / 2;
        }
    }


    Entity.prototype.update.call(this);
}

MainCraft.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

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
        this.y = -3000;
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
        this.y = -3000;
    }

    Entity.prototype.update.call(this);
}

ScrollBG2.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

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
        this.y = -3000;
    }

    Entity.prototype.update.call(this);
}

ScrollBG3.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}


// fire ball bullet
function FireBall(game, type) {
    this.type = type;
    if (this.type === 1) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/blueBall1.png"), 0, 0, 20, 22, 0.07, 6, true, true);
    }
    if (this.type === 2) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/bigBlueBall.png"), 0, 0, 70, 70, 0.07, 4, true, true);
    }
    this.reset = 1;
    this.shoot = 0; // to be sure bullet after fire have to get off screen after user release shoot button
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

    if (this.type === 1) {
        // impact detection
        var x = this.x - this.game.entities[this.game.entities.length - 3].x;
        var y = this.y - this.game.entities[this.game.entities.length - 3].y - 100;
        var distance = Math.sqrt(x * x + y * y);

        // console.log(this.game.clockTick);
        //console.log(this.time);

        if (distance < 60) {
            this.explosion = true;
            if (this.add1) {
                this.game.hp -= 10 //  this.game.entities[3].hpBar += 0.4;
                this.add1 = false;
            }
            this.x -= 33; // set explosion point for bullet
            this.y -= 40;
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

        } else if (!this.explosion && (this.game.entities[3 + 3].alive || this.game.entities[4 + 3].alive)) {
            // this.activate = true;

            if (this.y >= 700 || this.y < -10 || this.x > 800 || this.x < -10) { // (this.y <= -100) 
                this.reset = 1;
                this.locate = false;
                this.random = Math.random() * (15 - 5) + 5;

            }

            if (!this.locate) {
                if (this.game.entities[3 + 3].alive) {
                    if (this.x >= this.game.entities[this.game.entities.length - 3].x + 50) {
                        tempX = this.game.entities[6].x - this.game.entities[this.game.entities.length - 3].x + 200;
                        tempY = this.game.entities[6].y - this.game.entities[this.game.entities.length - 3].y + 0;
                    } else {
                        tempX = this.game.entities[6].x - this.game.entities[this.game.entities.length - 3].x + 0;
                        tempY = this.game.entities[6].y - this.game.entities[this.game.entities.length - 3].y + 0;
                    }
                } else
                    if (this.game.entities[4 + 3].alive) {
                        if (this.x >= this.game.entities[this.game.entities.length - 3].x + 50) {
                            tempX = this.game.entities[4 + 3].x - this.game.entities[this.game.entities.length - 3].x + 200;
                            tempY = this.game.entities[4 + 3].y - this.game.entities[this.game.entities.length - 3].y + 0;
                        } else {
                            tempX = this.game.entities[4 + 3].x - this.game.entities[this.game.entities.length - 3].x + 0;
                            tempY = this.game.entities[4 + 3].y - this.game.entities[this.game.entities.length - 3].y + 0;
                        }
                    }

                var hypo = Math.sqrt(tempX * tempX + tempY * tempY);
                this.sin = tempY / hypo;
                this.cos = tempX / hypo;
                this.locate = true;
            }
            if (true) {
                if (this.reset === 1) { // reset or initializing 1st bullet location base on boss.
                    if (this.game.entities[3 + 3].alive) {
                        this.x = this.game.entities[3 + 3].x + 88; // offset
                        this.y = this.game.entities[3 + 3].y + 135; // offset
                    } else
                        if (this.game.entities[4 + 3].alive) {
                            this.x = this.game.entities[4 + 3].x + 88; // offset
                            this.y = this.game.entities[4 + 3].y + 135; // offset
                        }
                    this.reset = 0;
                }
                if (this.game.entities[this.game.entities.length - 3].alive) {
                    this.y -= this.sin * this.random;
                    this.x -= this.cos * this.random;
                } else { this.y = -100; this.x = -100; }

            } else if (this.y < 700) {
                if (this.game.entities[this.game.entities.length - 3].alive) {
                    this.y += this.sin * this.random;
                    this.x += this.cos * this.random;
                } else { this.y = -100; this.x = -100; }
            }

        } else if (!this.explosion && !this.game.entities[3 + 3].alive) { this.x = -25; this.y = -25; }
        else if (!this.explosion && !this.game.entities[4 + 3].alive) { this.x = -25; this.y = -25; }
    }

    /// bug : sometimes, there is an extra blue big bullet on top left screen after 2nd mini boss dead
    if (!this.game.entities[6].alive && !this.game.entities[7].alive) this.game.entities[11].y = -800; // bug fix here: not confirm yet, need more test
    if (!this.game.entities[8].alive) {
    	this.game.entities[12].y = -800; // bug fix here: not confirm yet, need more test
    	this.type == 1;
    }
    if (this.game.entities[6].alive || this.game.entities[7].alive) this.type == 1;
    ///
    if (this.type === 2 && this.game.entities[5 + 3].alive) {
        var x = this.x - this.game.entities[this.game.entities.length - 3].x + 35;
        var y = this.y - this.game.entities[this.game.entities.length - 3].y + 25;
        var distance = Math.sqrt(x * x + y * y);

        // console.log(this.game.clockTick);
        //console.log(this.time);

        if (distance < 50) {
            this.explosion = true;
            if (this.add1) {
                this.game.hp -= 30 //  this.game.entities[3].hpBar += 0.4;
                this.add1 = false;
            }
            this.x -= 33; // set explosion point for bullet
            this.y -= 60;
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

        } else if (!this.explosion) {
            // this.activate = true;

            if (this.y >= 700 || this.y < -10 || this.x > 800 || this.x < -10) { // (this.y <= -100) 
                this.reset = 1;
                this.locate = false;
                this.random = Math.random() * (15 - 5) + 5;

            }

            if (!this.locate) {
                tempX = this.game.entities[5 + 3].x - this.game.entities[this.game.entities.length - 3].x + 140;
                tempY = this.game.entities[5 + 3].y - this.game.entities[this.game.entities.length - 3].y + 240;

                var hypo = Math.sqrt(tempX * tempX + tempY * tempY);
                this.sin = tempY / hypo;
                this.cos = tempX / hypo;
                this.locate = true;
            }
            if (true) {
                if (this.reset === 1) { // reset or initializing 1st bullet location base on boss. 
                    this.x = this.game.entities[5 + 3].x + 180; // offset
                    this.y = this.game.entities[5 + 3].y + 280; // offset

                    this.reset = 0;
                }
                if (this.game.entities[this.game.entities.length - 3].alive) {
                    this.y -= this.sin * this.random;
                    this.x -= this.cos * this.random;
                } else { this.y = -100; this.x = -100; }

            } else if (this.y < 700) {
                if (this.game.entities[this.game.entities.length - 3].alive) {
                    this.y += this.sin * this.random;
                    this.x += this.cos * this.random;
                } else { this.y = -100; this.x = -100; }
            }

        } else if (!this.explosion) { this.x = -25; this.y = -25; }
    }

    ///////

    //    Entity.prototype.update.call(this);
}

FireBall.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
        this.switchSprite = true;
        var snd = new Audio("./sounds/laser.wav"); // buffers automatically when created
        snd.play();

    } else if (!this.explosion && this.switchSprite) {
        if (this.type === 1 && (this.game.entities[6].alive || this.game.entities[7].alive))
            this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/blueBall1.png"), 0, 0, 20, 22, .07, 6, true, true);
        else
            this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/bigBlueBall.png"), 0, 0, 70, 70, .07, 4, true, true);

        this.switchSprite = false;
        var snd = new Audio("./sounds/laser.wav"); // buffers automatically when created
        snd.play();

    }

    if (this.game.entities[this.game.entities.length - 3].alive) // no show after tank is destroyed)
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 2, this.explosion);

    Entity.prototype.draw.call(this);
}

// flash bullet / rocket for now
function Rocket(game) {
    this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/rocketA.png"), 0, 0, 33, 116, .1, 6, true, true);
    // this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/expl.png"), 0, 0, 65, 81, .1, 5, true, true);

    this.reset = 1;
    this.shoot = 0; // to be sure bullet after fire have to get off screen after user release shoot button
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
    this.rocket;
    for (i = 0; i < this.game.entities.length; i++) {
        if (this.game.entities[i] instanceof Rocket) this.rocket = i;
    }
    if (this.game.entities[3 + 3].alive) {
        var x = this.game.entities[3 + 3].x - this.game.entities[this.rocket].x + 70; //mid_boss  
        var y = this.game.entities[3 + 3].y - this.game.entities[this.rocket].y + 0;
        var distance = Math.sqrt(x * x + y * y);
    }
    if (this.game.entities[4 + 3].alive) {
        var x = this.game.entities[4 + 3].x - this.game.entities[this.rocket].x + 70; //mid_boss  
        var y = this.game.entities[4 + 3].y - this.game.entities[this.rocket].y + 0;
        var distance = Math.sqrt(x * x + y * y);
    }
    if (this.game.entities[5 + 3].alive) {
        var x = this.game.entities[5 + 3].x - this.game.entities[this.rocket].x + 140; //big_boss  
        var y = this.game.entities[5 + 3].y - this.game.entities[this.rocket].y + 60;
        var distance = Math.sqrt(x * x + y * y);
    }
    // console.log(this.game.clockTick);
    //console.log(this.time);

    // this.explosionBoss = false;
    if (distance < 90) { // 30) {
        this.explosion = true;
        if (this.add1) {
            this.game.score += 50;       //    this.game.entities[2].hpBar++;
            //    this.game.entities[2].hpBar++;
            this.add1 = false;
        } 
    }
   
    if (this.explosion)
        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
   
    if (this.time > 1) {
        this.explosion = false;
        if (distance < 90) {
	        if (this.game.entities[3 + 3].alive && this.game.bossOnScreen) {
	            this.game.entities[3 + 3].hitPoint-=10;
	            if (this.game.entities[3 + 3].hitPoint <= 0) { 
	                this.game.entities[3 + 3].alive = false;
	                this.game.entities[3 + 3].explode = true;
	                this.game.bossOnScreen = false;
	                if (this.game.level == 1) {
	                    this.game.entities[5 + 3].alive = true;
	                    this.game.entities[5 + 3].y = -1500;
	                    this.game.entities[5 + 3].hitPoint = 200; 
	                }  
	                if (this.game.level == 3) {
	                	this.game.entities[4 + 3].alive = true;
	                    this.game.entities[4 + 3].y = -1500;
	                    this.game.entities[4 + 3].hitPoint = 100; 
	                }  
	            }
	        }
	        if (this.game.entities[4 + 3].alive && this.game.bossOnScreen) {
	            this.game.entities[4 + 3].hitPoint-=10;
	            if (this.game.entities[4 + 3].hitPoint <= 0) { 
	                this.game.entities[4 + 3].alive = false;
	                this.game.entities[4 + 3].explode = true;
	                this.game.bossOnScreen = false;
	                if (this.game.level == 2) {
	                    this.game.entities[5 + 3].alive = true;
	                    this.game.entities[5 + 3].y = -1500;
	                    this.game.entities[5 + 3].hitPoint = 200; 
	                }  
	                if (this.game.level == 3) {
	                	this.game.entities[5 + 3].alive = true;
	                    this.game.entities[5 + 3].y = -1500;
	                    this.game.entities[5 + 3].hitPoint = 200; 
	                }
	            }
	        }
	        if (this.game.entities[5 + 3].alive && this.game.bossOnScreen) {
	            this.game.entities[5 + 3].hitPoint-=10;
	            if (this.game.entities[5 + 3].hitPoint <= 0) { 
	                this.game.entities[5 + 3].alive = false;
	                this.game.entities[5 + 3].explode = true;
	                this.game.entities[5 + 3].levelUp = true;
	                this.game.bossOnScreen = false;
	                if (this.game.level == 1) { 
	                    this.game.entities[4 + 3].alive = true;
	                    this.game.entities[4 + 3].y = -1500;
	                    this.game.entities[4 + 3].hitPoint = 100; 
	                }
	                if (this.game.level == 2) { 
	                	this.game.entities[3 + 3].alive = true;
	                    this.game.entities[3 + 3].y = -1500;
	                    this.game.entities[3 + 3].hitPoint = 100;
	                }
	                if (this.game.level >= 3) {  
	                    this.game.winner = true;
	                }
	            }
	        }
        }
        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
        this.y = -600;// skip down after explosion
        this.time = 0;
        this.add1 = true;
        // this.stop = true;

    } else if (this.game.shoot && this.time === 0) {


        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
            this.x = this.game.entities[this.game.entities.length - 3].x + 15;
            this.y = this.game.entities[this.game.entities.length - 3].y;
            this.reset = 0;
        }
        if (!this.explosion)
            this.y -= 6;

    } else if (this.y > -150 && !this.explosion) {

        this.y -= 6;
    }

    if (this.y < -100)
        this.y = -1000; // put at the top and wait to avoid collision with enemies

    Entity.prototype.update.call(this);
}

Rocket.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
        this.switchSprite = true;
        var snd = new Audio("./sounds/laser.wav"); // buffers automatically when created
        snd.play();

    } else if (!this.explosion && this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/rocketA.png"), 0, 0, 33, 116, .1, 6, true, true);
        this.switchSprite = false;
        var snd = new Audio("./sounds/laser.wav"); // buffers automatically when created
        snd.play();

    }

    if (this.game.entities[this.game.entities.length - 3].alive) // no show after tank is destroyed
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame);

    Entity.prototype.draw.call(this);
}

// new Flash bullets
// flash bullet / rocket for now
function NewFlash(game, type) {
    this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);
    // this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/expl.png"), 0, 0, 65, 81, .1, 5, true, true);
    this.type = type + 5;
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
    this.rockIndex = 0;
    this.switchSprite = false;

    Entity.call(this, game, 0, -100000);
}

NewFlash.prototype = new Entity();
NewFlash.prototype.constructor = NewFlash;

NewFlash.prototype.update = function () {
	
    if (this.y <= 0) {
        this.reset = 1;
        // this.locate = false;
    }
    for (i = 0; i < this.game.entities.length; i++) { // look for small enimies location in the list
        if (this.game.entities[i] instanceof Meteor) {   
                this.rockIndex = i;
                break;
        }
    }



    var x, y, x1, y1, x2, y2, x3, y3;

    // this is for 1st boss
    x = this.game.entities[3 + 3].x - this.x + 70;
    y = this.game.entities[3 + 3].y - this.y - 20;
    // for 2nd miniboss
    x1 = this.game.entities[7].x - this.x + 70;
    y1 = this.game.entities[7].y - this.y - 20;
    // for 3nd boss
    x2 = this.game.entities[8].x - this.x + 150;
    y2 = this.game.entities[8].y - this.y + 100;

    // for rock 1
    //x3 = this.game.entities[this.rockIndex].x - this.x + 10;
    //y3 = this.game.entities[this.rockIndex].y - this.y - 3;
    //x4 = this.game.entities[this.rockIndex + 1].x - this.x + 10;
    //y4 = this.game.entities[this.rockIndex + 1].y - this.y - 3;

    var distance = Math.sqrt(x * x + y * y);
    var distance1 = Math.sqrt(x1 * x1 + y1 * y1);
    var distance2 = Math.sqrt(x2 * x2 + y2 * y2);
  //  var distance3 = Math.sqrt(x3 * x3 + y3 * y3);
  //  var distance4 = Math.sqrt(x4 * x4 + y4 * y4);
    
    if (distance < 80 || distance1 < 80 || distance2 < 150 ) {
        this.explosion = true;
        if (this.add1) {
            this.game.score += 50;//    this.game.entities[2].hpBar++;
            this.add1 = false;
        }
        //this.done = false;

    }
    if (this.explosion)
        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
    // if (this.game.shoot)
    //    this.stop = false;

    if (this.time > .2) {
        this.explosion = false;
        if (distance < 80 || distance1 < 80 || distance2 < 150) {
	        if (this.game.entities[3 + 3].alive && this.game.bossOnScreen) {
	            this.game.entities[3 + 3].hitPoint--;
	            if (this.game.entities[3 + 3].hitPoint <= 0) { 
	                this.game.entities[3 + 3].alive = false;
	                this.game.entities[3 + 3].explode = true;
	                this.game.bossOnScreen = false;
	                if (this.game.level == 1) {
	                    this.game.entities[5 + 3].alive = true;
	                    this.game.entities[5 + 3].y = -1500;
	                    this.game.entities[5 + 3].hitPoint = 200; 
	                }  
	                if (this.game.level == 3) {
	                	this.game.entities[4 + 3].alive = true;
	                    this.game.entities[4 + 3].y = -1500;
	                    this.game.entities[4 + 3].hitPoint = 100; 
	                }  
	            }
	        }
	        if (this.game.entities[4 + 3].alive && this.game.bossOnScreen) {
	            this.game.entities[4 + 3].hitPoint--;
	            if (this.game.entities[4 + 3].hitPoint <= 0) { 
	                this.game.entities[4 + 3].alive = false;
	                this.game.entities[4 + 3].explode = true;
	                this.game.bossOnScreen = false;
	                if (this.game.level == 2) {
	                    this.game.entities[5 + 3].alive = true;
	                    this.game.entities[5 + 3].y = -1500;
	                    this.game.entities[5 + 3].hitPoint = 200; 
	                }  
	                if (this.game.level == 3) {
	                	this.game.entities[5 + 3].alive = true;
	                    this.game.entities[5 + 3].y = -1500;
	                    this.game.entities[5 + 3].hitPoint = 200; 
	                }
	            }
	        }
	        if (this.game.entities[5 + 3].alive && this.game.bossOnScreen) {
	            this.game.entities[5 + 3].hitPoint--;
	            if (this.game.entities[5 + 3].hitPoint <= 0) { 
	                this.game.entities[5 + 3].alive = false;
	                this.game.entities[5 + 3].explode = true;
	                this.game.entities[5 + 3].levelUp = true;
	                this.game.bossOnScreen = false;
	                if (this.game.level == 1) { 
	                    this.game.entities[4 + 3].alive = true;
	                    this.game.entities[4 + 3].y = -1500;
	                    this.game.entities[4 + 3].hitPoint = 100; 
	                }
	                if (this.game.level == 2) {  
	                    this.game.entities[3 + 3].alive = true;
	                    this.game.entities[3 + 3].y = -1500;
	                    this.game.entities[3 + 3].hitPoint = 100;
	                }
	                if (this.game.level >= 3) {  
	                    this.game.winner = true;
	                }
	            }
	        }
        }
        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
        this.y = -100000; // -600;// skip down after explosion
        this.time = 0;
        this.add1 = true;
        // this.stop = true;

    } else if (this.game.flashShoot && this.time === 0) { // this.game.shoot replace by true for auto shooting


        if (this.reset === 1) { // reset or initializing 1st bullet location base on main_craft.
            if (this.type % 3 === 0) {
                this.x = this.game.entities[this.game.entities.length - 3].x - 7;
                this.y = this.game.entities[this.game.entities.length - 3].y - 15;
            } else if (this.type % 2 == 0) {
                this.x = this.game.entities[this.game.entities.length - 3].x + 30;
                this.y = this.game.entities[this.game.entities.length - 3].y - 15;
            } else {
                this.x = this.game.entities[this.game.entities.length - 3].x + 12;
                this.y = this.game.entities[this.game.entities.length - 3].y - 40;
            }

            this.reset = 0;
        }
        if (!this.explosion)
            this.y -= this.type;

    } else if (this.y > -100 && !this.explosion) {

        this.y -= this.type;

    }
    if (this.y < -100)
        this.y = -1000; // put it on the top and wait for user to shoot

    Entity.prototype.update.call(this);
}

NewFlash.prototype.draw = function (ctx) {

    if (this.explosion && !this.switchSprite) {
        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/flashEffect.png"), 0, 0, 40, 41, .05, 5, true, true);
        this.switchSprite = true;
        var snd = new Audio("./sounds/laser.wav"); // buffers automatically when created
        snd.play();

    } else if (!this.explosion && this.switchSprite) {
        this.animation = this.animation = new FlashAnimation(ASSET_MANAGER.getAsset("./img/bullet2.png"), 0, 0, 37, 100, 0.07, 6, true, true);
        this.switchSprite = false;
        var snd = new Audio("./sounds/laser.wav"); // buffers automatically when created
        snd.play();

    }

    if (this.game.entities[this.game.entities.length - 3].alive) // no show after tank is destroyed
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame, true);

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
    var x = this.x - (this.game.entities[this.game.entities.length - 3].x + 30); // set x location to center
    var y = this.y - (this.game.entities[this.game.entities.length - 3].y + 35); // set for y
    var distance = Math.sqrt(x * x + y * y);

    if (distance < 30) {
        this.explosion = true;
        if (this.add1) {
            this.game.hp -= 10;//  this.game.entities[3].hpBar += 0.4;
            this.add1 = false;
        }

        this.x -= 33; // set location for explosion to center
        this.y -= 40;
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

    } else if (!this.explosion && (this.game.entities[3 + 3].alive || this.game.entities[4 + 3].alive || this.game.entities[5 + 3].alive)) {
        // this.activate = true;

        if (this.y >= 1500 || this.y < -100) { // dont care aboute X now || this.x > 800 || this.x < -10) { // (this.y <= -100) 
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
                if (this.game.entities[3 + 3].alive) {
                    this.x = this.game.entities[3 + 3].x + 88; // offset
                    this.y = this.game.entities[3 + 3].y + 135; // offset
                } else
                    if (this.game.entities[4 + 3].alive) {
                        this.x = this.game.entities[4 + 3].x + 88; // offset
                        this.y = this.game.entities[4 + 3].y + 135; // offset
                    } else
                        if (this.game.entities[5 + 3].alive) {
                            this.x = this.game.entities[5 + 3].x + 180; // offset
                            this.y = this.game.entities[5 + 3].y + 280; // offset
                        }
                this.reset = 0;
            }
            if (this.game.entities[this.game.entities.length - 3].alive) {
                this.y += 3; // this.sin * this.random;
                this.x += this.rangeX; //this.cos * this.random;
            } else { this.y = -100; this.x = -100; }

        } else if (this.y < 700) {
            if (this.game.entities[this.game.entities.length - 3].alive) {
                // this.y += this.sin * this.random;
                // this.x += this.cos * this.random;
                this.y += 3; // this.sin * this.random;
                this.x += this.rangeX;

            } else { this.y = -100; this.x = -100; }
        }

    } else if (!this.explosion && (!this.game.entities[3 + 3].alive || !this.game.entities[4 + 3].alive || !this.game.entities[5 + 3].alive)) {
        this.x = -25; this.y = -25;
    }

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

    if ((this.game.entities[3 + 3].alive || this.game.entities[4 + 3].alive || this.game.entities[5 + 3].alive) && this.game.entities[this.game.entities.length - 3].alive) // no show after tank is destroyed)
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 2, this.explosion);

    Entity.prototype.draw.call(this);
}


///
//4th bacground
function ScrollBG4(game) {
    this.animation = new AnimationBG(ASSET_MANAGER.getAsset("./img/bg4.png"), 0, 0, 800, 600, 5, 1, true, true);
    Entity.call(this, game, 0, -1800);
}

ScrollBG4.prototype = new Entity();
ScrollBG4.prototype.constructor = ScrollBG4;

ScrollBG4.prototype.update = function () {

    this.y += 1;
    if (this.y >= 600) {
        this.y = -3000;
    }

    Entity.prototype.update.call(this);
}

ScrollBG4.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

//5th bacground
function ScrollBG5(game) {
    this.animation = new AnimationBG(ASSET_MANAGER.getAsset("./img/bg5.png"), 0, 0, 800, 600, 5, 1, true, true);
    Entity.call(this, game, 0, -2400);
}

ScrollBG5.prototype = new Entity();
ScrollBG5.prototype.constructor = ScrollBG5;

ScrollBG5.prototype.update = function () {

    this.y += 1;
    if (this.y >= 600) {
        this.y = -3000;
    }

    Entity.prototype.update.call(this);
}

ScrollBG5.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

//6th bacground
function ScrollBG6(game) {
    this.animation = new AnimationBG(ASSET_MANAGER.getAsset("./img/bg6.png"), 0, 0, 800, 600, 5, 1, true, true);
    Entity.call(this, game, 0, -3000);
}

ScrollBG6.prototype = new Entity();
ScrollBG6.prototype.constructor = ScrollBG6;

ScrollBG6.prototype.update = function () {

    this.y += 1;
    if (this.y >= 600) {
        this.y = -3000;
    }

    Entity.prototype.update.call(this);
}

ScrollBG6.prototype.draw = function (ctx) {

    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

function Health(game, type) {
    this.type = type;
    if (this.type === 1) {
        this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/point.png"), 0, 0, 50, 40, .05, 5, true, true);
    } else
        this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/heart.png"), 0, 0, 35, 31, 100, 1, true, true);

    this.currentTime = 0;
    this.nextTime = 5;
    this.go = false;
    this.reset = 1;
    this.randomY = 5;
    this.hit = false;
    Entity.call(this, game, 350, -40);
}

Health.prototype = new Entity();
Health.prototype.constructor = Health;

Health.prototype.update = function () {

    if (this.currentTime > 5 && this.type === 1) {
        this.y += 2;
    } else if (this.currentTime > 8 && this.type !== 1) {// this.nextTime) {
        this.y += 3;
    }

    // impact detection
    var x = this.x - this.game.entities[this.game.entities.length - 3].x;
    var y = this.y - this.game.entities[this.game.entities.length - 3].y - 100;
    var distance = Math.sqrt(x * x + y * y);

    if (distance < 100) {
        // this.hit= true; // hit the aircraft
        //if (this.add1) {
        if (this.type === 1) {
            this.game.score += 100; // add score 100 each time
        } else {
            this.game.hp += 30;
            if (this.game.hp > 100)
                this.game.hp = 100; // max hp is 100
        }
        this.y = -40;
        this.currentTime = 0;
        var maxX = 700;
        var minX = 100;
        r = Math.random() * (maxX - minX) + minX;
        this.x = r;
    }


    this.currentTime += this.game.clockTick;


    if (this.y > 600) {
        this.y = -40;
        this.currentTime = 0;
        //  this.nextTime += 15;
        // this.x = 0;
        /**
         * Returns a random number between min (inclusive) and max (exclusive)
         */
        var maxX = 700;
        var minX = 100;
        r = Math.random() * (maxX - minX) + minX;
        this.x = r;

    }

    Entity.prototype.update.call(this);
}

Health.prototype.draw = function (ctx) {
    if (this.type === 1) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1);
    } else
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);

    Entity.prototype.draw.call(this);
}

function SmallCraft(game, type) { 
	this.game = game;
    this.type = type; 
    if (type % 3 == 0 && type !== 0) {
        this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy1.png"), 0, 0, 59, 32, 100, 1, true, true);
    } if (type % 2 == 0) {
        this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy2.png"), 0, 0, 59, 32, 100, 1, true, true);
    } else
        this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy3.png"), 0, 0, 42, 28, 100, 1, true, true);

    this.currentTime = 0;

    this.reset = 1;
    this.explosion = false;
    this.switchSprite = true;
    this.time = 0;
    this.add1 = true;

    // random speed 
    var max = 6;
    var min = 1;
    var s = Math.random() * (max - min) + min;

    this.speed = s;

    var maxX = 700;
    var minX = 100;
    var r = Math.random() * (maxX - minX) + minX;

    var maxY = 800;
    var minY = 400;
    var r1 = -Math.random() * (maxY - minY) + minY + 50;
    this.angle = 0;
    this.locationX = r;
    this.locationY = r1;
    this.speedType3 = s;
    this.angleSpeed = .05;
   // this.distBetweenFlash = 0;

    Entity.call(this, game, r, -r1); 
}

SmallCraft.prototype = new Entity();
SmallCraft.prototype.constructor = SmallCraft;

SmallCraft.prototype.update = function () {
	if ((this.game.level === 2 && this.type%3 === 0 && (!this.game.bossOnScreen || this.game.entities[8].alive)) ||
			(this.game.level === 3 && this.game.bossOnScreen && this.type%3 === 0) || 
			(this.game.level === 3 && this.game.bossOnScreen && this.game.entities[8].alive)) {
	//	  if (this.type % 3 == 0 && this.type !== 0 && this.y) {
	        this.angle += this.angleSpeed;// .05;
	        /*var max = 6;
	        var min = 1;
	        var s = Math.random() * (max - min) + min;
	        this.speed = s;*/
	        this.locationY += this.speedType3;
	//    }
	
	    //// impact detection - 1st flash bullet
	    //var x = this.x - this.game.entities[this.game.entities.length - 5].x;
	    //var y = this.y - this.game.entities[this.game.entities.length - 5].y;
	    //var distance = Math.sqrt(x * x + y * y);
	
	    //// impact 2nd flash bullet
	    //var x1 = this.x - this.game.entities[this.game.entities.length - 6].x;
	    //var y1 = this.y - this.game.entities[this.game.entities.length - 6].y;
	    //var distance1 = Math.sqrt(x1 * x1 + y1 * y1);
	    // flash Bullet Collision detect
	    /* var bottom = this.game.entities.length - 6;
	    var track = 0;
	    var distBetweenFlash = 10000; // initial any value > than 55
	    for (var i = bottom; i > this.game.entities.length - 6 - 6; i--) { // keep number 6 for tracking purpose
	        // impact detection - 1st flash bullet
	        var x = this.x - this.game.entities[i].x;
	        var y = this.y - this.game.entities[i].y;
	        distBetweenFlash = Math.sqrt(x * x + y * y);
	        if (distBetweenFlash < 55) {
	            track = i;
	            break;
	        }
	    } */
	    var distBetweenFlash = 10000;
	    for (i = 0; i < this.game.entities.length; i++) { // look for flash bullets
		if (this.game.entities[i] instanceof NewFlash) {
			var x = this.x - this.game.entities[i].x;
	        	var y = this.y - this.game.entities[i].y;
			distBetweenFlash = Math.sqrt(x * x + y * y);
		        if (distBetweenFlash < 55) {
		            track = i;
		            break;
		        }
			}
	    }
	     
	    // impact on rocket
	    var x2 = this.x - this.game.entities[13].x;
	    var y2 = this.y - this.game.entities[13].y;
	    var distance2 = Math.sqrt(x2 * x2 + y2 * y2);
	
	
	    // collision on maincraft
	    var x3 = this.x - this.game.entities[this.game.entities.length - 3].x;
	    var y3 = this.y - this.game.entities[this.game.entities.length - 3].y;
	    var distance3 = Math.sqrt(x3 * x3 + y3 * y3);
	
	    // this.explosionBoss = false; || distance1 < 55
	    if ((distBetweenFlash < 55 || distance2 < 55 || distance3 < 55) && this.time == 0) { // 30) {
	        this.explosion = true;
	        if (distBetweenFlash < 55)
	            this.game.entities[track].explosion = true; //.game.entities.length - 5].explosion = true;
	            //  else if (distance1 < 55)
	            //       this.game.entities[this.game.entities.length - 6].explosion = true;
	        else if (distance2 < 55)
	            this.game.entities[13].explosion = true;
	        else if (distance3 < 55)
	            this.game.hp -= 5;
	 	
	        if (this.add1) {
	            this.game.score += 5;
	            //    this.game.entities[2].hpBar++;
	            this.add1 = false;
	        }
	        //this.done = false; 
	    }
	
	    if (this.explosion)
	        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
	 	
	    if (this.time > .3) {
	        this.explosion = false;
	        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
	        this.time = 0;
	        this.add1 = true;
	
	        var maxX = 700;
	        var minX = 100;
	        var r = Math.random() * (maxX - minX) + minX;
	        this.x = r;
	
	        var maxY = 800;
	        var minY = 400;
	        var r1 = Math.random() * (maxY - minY) + minY;
	        this.y = -r1;// skip down after explosion
	
	        // speed
	        var max = 6;
	        var min = 1;
	        var s = Math.random() * (max - min) + min;
	//        if (this.type % 3 === 0 && this.type !== 0) {
	            this.locationX = r;
	            this.locationY = -r1;
	            //   this.angleSpeed = s1 * (Math.PI / 180);
	  //      }
	  //      this.speed = s;
	
	    } else if (this.y > -950 && !this.explosion) {
	
	   //     if (this.type % 3 == 0 && this.type !== 0) {
	            this.x = 100 * Math.cos(this.angle) + this.locationX;
	            this.y = 100 * Math.sin(this.angle) + this.locationY;
	
	     //   } else
	     //       this.y += this.speed;
	    }
	
	
	    if (this.y > 600) {
	
	        /**
	         * Returns a random number between min (inclusive) and max (exclusive)
	         */
	        var maxX = 700;
	        var minX = 100;
	        var r = Math.random() * (maxX - minX) + minX;
	        this.x = r;
	
	        var maxY = 800;
	        var minY = 400;
	        var r1 = Math.random() * (maxY - minY) + minY;
	        this.y = -r1;// skip down after explosion
	 //       if (this.type % 3 === 0 && this.type !== 0) {
	            this.locationX = r;
	            this.locationY = -r1;
	
	            // speed for circular ship
	            var max = 3;
	            var min = 1;
	            var s = Math.random() * (max - min) + min;
	            this.speedType3 = s;
	
	            // random angle / rotation speed
	            var max1 = 3;
	            var min1 = 1;
	            var s1 = Math.random() * (max1 - min1) + min1;
	            this.angleSpeed = s1 * (Math.PI / 180);
	
	   //     }
	        // speed
	        var max = 3;
	        var min = 1;
	        var s = Math.random() * (max - min) + min;
	
	        this.speed = s;
	
	    }
	
	    Entity.prototype.update.call(this); 
	}
}

SmallCraft.prototype.draw = function (ctx) { 
	if ((this.game.level === 2 && this.type%3 === 0 && (!this.game.bossOnScreen || this.game.entities[8].alive)) ||
			(this.game.level === 3 && this.game.bossOnScreen && this.type%3 === 0) || 
			(this.game.level === 3 && this.game.bossOnScreen && this.game.entities[8].alive)) {
	//	if (this.type % 3 === 0) {
		    if (this.explosion && !this.switchSprite) {
		        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 5, true, true);
		        this.switchSprite = true;
		        var snd = new Audio("./sounds/explosion.wav"); // buffers automatically when created
		        snd.play();
		
		    } else if (!this.explosion && this.switchSprite) {
		
		        if (this.type % 3 == 0 && this.type !== 0) {
		            this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy1.png"), 0, 0, 59, 32, 100, 1, true, true);
		        } else if (this.type % 2 == 0) {
		            this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy2.png"), 0, 0, 59, 32, 100, 1, true, true);
		        } else
		            this.animation = new EnemyAnimation(ASSET_MANAGER.getAsset("./img/enemy3.png"), 0, 0, 42, 28, 100, 1, true, true);
		
		        this.switchSprite = false;
		
		    }
		
		    // if (this.game.entities[this.game.entities.length - 3].alive) // no show after tank is destroyed
		    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 1, this.explosion, this.currentFrame);
		
		
		    //////////////
		    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0);
		
		    Entity.prototype.draw.call(this);  
//		}
	}
}

function SmallBullet(game, type, rangeX) {
	this.game = game;
    this.animation = new BossBulletAnimation(ASSET_MANAGER.getAsset("./img/smallBullet.png"), 0, 0, 12, 17, 0.07, 2, true, true);

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
    this.type = type;
    this.enemyIndex = 0;

    Entity.call(this, game, 0, -800);
}

SmallBullet.prototype = new Entity();
SmallBullet.prototype.constructor = SmallBullet;

SmallBullet.prototype.update = function () { 
	if ((this.game.level === 2 && this.type%3 === 0 && (!this.game.bossOnScreen || this.game.entities[8].alive)) ||
			(this.game.level === 3 && this.game.bossOnScreen && this.type%3 === 0) || 
			(this.game.level === 3 && this.game.bossOnScreen && this.game.entities[8].alive)) {
	    // impact detection
	    var x = this.x - (this.game.entities[this.game.entities.length - 3].x + 30); // set x location to center
	    var y = this.y - (this.game.entities[this.game.entities.length - 3].y + 35); // set for y
	    var distance = Math.sqrt(x * x + y * y);
	
	    if (distance < 30) {
	        this.explosion = true;
	        if (this.add1) {
	            this.game.hp -= 5;//  this.game.entities[3].hpBar += 0.4;
	            this.add1 = false;
	        }
	
	        this.x -= 33; // set location for explosion to center
	        this.y -= 40;
	    }
	
	    if (this.explosion)
	        this.time += this.game.clockTick;// integer result this.time = 0 when console output;
	    // end impact detection
	
	    ////////
	    // tagging each bullet to each small ship
	    for (i = 0; i < this.game.entities.length; i++) { // look for small enimies location in the list
	        if (this.game.entities[i] instanceof SmallCraft) {
	            if (this.type === this.game.entities[i].type) {
	                this.enemyIndex = i;
	                break;
	            }
	        }
	    }
	    ///////
	
	    if (this.time > 1) {
	        this.explosion = false;
	        // this.x = this.game.entities[this.game.entities.length - 2].x + 56;
	        this.y = 800;// skip down after explosion
	        this.time = 0;
	        this.add1 = true;
	        // this.stop = true;
	
	    } else if (!this.explosion && !this.game.entities[this.enemyIndex].explosion) {
	        // this.activate = true;
	
	        if (this.y >= 1500 || this.y < -100) { // dont care aboute X now || this.x > 800 || this.x < -10) { // (this.y <= -100) 
	            this.reset = 1;
	            this.locate = false;
	            this.random = Math.random() * (15 - 5) + 5;
	
	        }
	
	        if (true) {
	            if (this.reset === 1) { // reset or initializing 1st bullet location base on boss.
	                if (!this.game.entities[this.enemyIndex].explosion) {
	                    this.x = this.game.entities[this.enemyIndex].x + 25; // offset
	                    this.y = this.game.entities[this.enemyIndex].y + 25; // offset
	                }
	                this.reset = 0;
	            }
	            if (this.game.entities[this.game.entities.length - 3].alive) {
	                this.y += 8; // this.sin * this.random;
	                this.x += this.rangeX; //this.cos * this.random;
	            } else { this.y = -100; this.x = -100; }
	
	        } else if (this.y < 700) {
	            if (this.game.entities[this.game.entities.length - 3].alive) {
	                // this.y += this.sin * this.random;
	                // this.x += this.cos * this.random;
	                this.y += 8; // this.sin * this.random;
	                this.x += this.rangeX;
	
	            } else { this.y = -100; this.x = -100; }
	        }
	
	    } else if (!this.explosion && this.game.entities[this.enemyIndex].explosion) {
	        this.x = -25; this.y = -25;
	    }
	
	    Entity.prototype.update.call(this); 
	}
}

SmallBullet.prototype.draw = function (ctx) { 
	if ((this.game.level === 2 && this.type%3 === 0 && (!this.game.bossOnScreen || this.game.entities[8].alive)) ||
			(this.game.level === 3 && this.game.bossOnScreen && this.type%3 === 0) || 
			(this.game.level === 3 && this.game.bossOnScreen && this.game.entities[8].alive)) {
		if (this.type % 3 === 0) {
	    if (this.explosion && !this.switchSprite) {
	        this.animation = new FireBallAnimation(ASSET_MANAGER.getAsset("./img/explosion2.png"), 0, 0, 65, 81, .05, 25, true, true);
	        this.switchSprite = true;
	
	    } else if (!this.explosion && this.switchSprite) {
	        this.animation = new BossBulletAnimation(ASSET_MANAGER.getAsset("./img/smallBullet.png"), 0, 0, 12, 17, .07, 2, true, true);
	        this.switchSprite = false;
	
	    }
	
	    if (!this.game.entities[this.enemyIndex].explosion && this.game.entities[this.game.entities.length - 3].alive) // no show after maincraft is destroyed)
	        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0, 2, this.explosion);
	
	    Entity.prototype.draw.call(this);
		}
	} 
}
