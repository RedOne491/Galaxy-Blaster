

// the "main" code begins here
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/bg1.png");
ASSET_MANAGER.queueDownload("./img/maincraft.png");
ASSET_MANAGER.queueDownload("./img/bg2.png");
ASSET_MANAGER.queueDownload("./img/bg3.png");
ASSET_MANAGER.queueDownload("./img/bg4.png");
ASSET_MANAGER.queueDownload("./img/bg5.png");
ASSET_MANAGER.queueDownload("./img/bg6.png");
ASSET_MANAGER.queueDownload("./img/score.png");
ASSET_MANAGER.queueDownload("./img/test3.png");
ASSET_MANAGER.queueDownload("./img/bullet2.png");
ASSET_MANAGER.queueDownload("./img/enemy1.png");
ASSET_MANAGER.queueDownload("./img/enemy2.png");
ASSET_MANAGER.queueDownload("./img/enemy3.png");
ASSET_MANAGER.queueDownload("./img/boss1.png");
ASSET_MANAGER.queueDownload("./img/boss_mid2.png");
ASSET_MANAGER.queueDownload("./img/boss_mid3.png");
ASSET_MANAGER.queueDownload("./img/meteor_small.png");
ASSET_MANAGER.queueDownload("./img/meteor.png");
ASSET_MANAGER.queueDownload("./img/blueBall1.png");
ASSET_MANAGER.queueDownload("./img/bigBlueBall.png");
ASSET_MANAGER.queueDownload("./img/explosion100px.png");
ASSET_MANAGER.queueDownload("./img/fire_damaged.png");
ASSET_MANAGER.queueDownload("./img/finalExplosion.png");
ASSET_MANAGER.queueDownload("./img/explosion2.png");
ASSET_MANAGER.queueDownload("./img/rocketA.png");
ASSET_MANAGER.queueDownload("./img/bossBullet.png");
ASSET_MANAGER.queueDownload("./img/flashEffect.png");
ASSET_MANAGER.queueDownload("./img/heart.png");
ASSET_MANAGER.queueDownload("./img/point.png"); 
ASSET_MANAGER.queueDownload("./img/smallBullet.png");
ASSET_MANAGER.queueDownload("./img/level1.png");
ASSET_MANAGER.queueDownload("./img/level2.png");
ASSET_MANAGER.queueDownload("./img/level3.png");
ASSET_MANAGER.queueDownload("./img/levels1.png");
ASSET_MANAGER.queueDownload("./img/levels2.png");
ASSET_MANAGER.queueDownload("./img/levels3.png");



ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    canvas.setAttribute('tabindex', '0');
    canvas.focus();
    var ctx = canvas.getContext('2d');
    var snd = new Audio("./sounds/sound.mp3"); // buffers automatically when created
    snd.loop = true;
    snd.play();
    var gameEngine = new GameEngine();

    //var bg = new Background(gameEngine); 
    var mainCraft = new MainCraft(gameEngine);
    var score = new Score(gameEngine);

    // enemy spaceship
    var enemy = new SmallCraft(gameEngine, 3);

    // background
    // var bg = new ScrollBG1(gameEngine);
    var bg1 = new ScrollBG1(gameEngine);
    var bg2 = new ScrollBG2(gameEngine);
    var bg3 = new ScrollBG3(gameEngine);
    var bg4 = new ScrollBG4(gameEngine);
    var bg5 = new ScrollBG5(gameEngine);
    var bg6 = new ScrollBG6(gameEngine);

    // boss
    var midBoss1 = new Boss(gameEngine, 1);
    var midBoss2 = new Boss(gameEngine, 2);
    var bigBoss = new Boss(gameEngine, 3);
    // rocks
    var rock1 = new Metero(gameEngine);
    var rock2 = new Metero(gameEngine);
    var smallRock1 = new SmallMetero(gameEngine);
    //var smallRock2 = new SmallMetero(gameEngine);
    var fireBullet = new FireBall(gameEngine, 1);
    var fireBulletBig = new FireBall(gameEngine, 2);
    var rocket = new Rocket(gameEngine);
    var health = new Health(gameEngine);
    var point = new Health(gameEngine, 1);
//var smallCraft = new SmallCraft(gameEngine);

    // adding background
    gameEngine.addEntity(bg1);
    gameEngine.addEntity(bg2);
    gameEngine.addEntity(bg3);
    gameEngine.addEntity(bg4);
    gameEngine.addEntity(bg5);
    gameEngine.addEntity(bg6);

    // adding boss and ememies
    gameEngine.addEntity(midBoss1);
    gameEngine.addEntity(midBoss2);
    gameEngine.addEntity(bigBoss);
    gameEngine.addEntity(rock1);
    gameEngine.addEntity(rock2); // element 10
    // 6 for fireball
    gameEngine.addEntity(fireBullet); //Blue smart bomb (FireBall) 
    gameEngine.addEntity(fireBulletBig); //Blue smart bomb (FireBall)
    gameEngine.addEntity(rocket);
    gameEngine.addEntity(enemy);
    // adding more rocks
    for (var i = 0; i < 9; i++) {
        var rock = new Metero(gameEngine, i);
        gameEngine.addEntity(rock);
    }

    var rangeX = -12;
    for (var i = 0; i < 12; i++) { 
        var bossBullet = new BossBullet(gameEngine, rangeX);
        rangeX += 2;
        gameEngine.addEntity(bossBullet);
    }
    // adding bullet for small enemy ships
    for (var i = 0; i < 7; i++) {
        var smallBullet = new SmallBullet(gameEngine, i, 0);
        rangeX += 0;
        gameEngine.addEntity(smallBullet);
    }

    // adding small enemy aircrafts
    for (var i = 0; i < 7; i++) {
        var smallCraft = new SmallCraft(gameEngine, i);
        gameEngine.addEntity(smallCraft);
    }

   // adding flash bullets
    for (var i = 1; i < 7; i++) {
        var flashBullet = new NewFlash(gameEngine, i);
        gameEngine.addEntity(flashBullet);
    }
    gameEngine.addEntity(health);
    gameEngine.addEntity(point);
    gameEngine.addEntity(mainCraft);
    gameEngine.addEntity(score);
    gameEngine.addEntity(smallRock1);
    //gameEngine.addEntity(smallRock2);

    gameEngine.init(ctx);

    gameEngine.start();


});
