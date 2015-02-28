

// the "main" code begins here
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/bg1.png");
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
ASSET_MANAGER.queueDownload("./img/finalExplosion.png");
ASSET_MANAGER.queueDownload("./img/explosion2.png");
ASSET_MANAGER.queueDownload("./img/rocketA.png");
ASSET_MANAGER.queueDownload("./img/bossBullet.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    canvas.setAttribute('tabindex', '0');
    canvas.focus();
    var ctx = canvas.getContext('2d');
    var snd = new Audio("./sounds/sound.mp3"); // buffers automatically when created
    snd.play();
    var gameEngine = new GameEngine();

    //var bg = new Background(gameEngine); 
    var mainCraft = new MainCraft(gameEngine);
    var score = new Score(gameEngine);

    // enemy spaceship
    var enemy = new Enemy(gameEngine);
    var enemy2 = new Enemy2(gameEngine);
    var enemy3 = new Enemy3(gameEngine);

    // background
    // var bg = new ScrollBG1(gameEngine);
    var bg1 = new ScrollBG1(gameEngine);
    var bg2 = new ScrollBG2(gameEngine);
    var bg3 = new ScrollBG3(gameEngine);
    var bg4 = new ScrollBG4(gameEngine);
    var bg5 = new ScrollBG5(gameEngine);
    var bg6 = new ScrollBG5(gameEngine);

    // boss
    var midBoss1 = new Boss(gameEngine, 1);
    var midBoss2 = new Boss(gameEngine, 2);
    var bigBoss = new Boss(gameEngine, 3);
    // rocks
    var rock1 = new Metero(gameEngine);
    var rock2 = new Metero(gameEngine);
    var smallRock1 = new SmallMetero(gameEngine);
    //var smallRock2 = new SmallMetero(gameEngine);
    // bullets
    var flash = new NewFlash(gameEngine, 1);
    var flash2 = new NewFlash(gameEngine, 2);
    var fireBullet = new FireBall(gameEngine, 1);
    var fireBulletBig = new FireBall(gameEngine, 2);
    var rocket = new Rocket(gameEngine);


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
    gameEngine.addEntity(rock2);
    // 6 for fireball
    gameEngine.addEntity(fireBullet); //Blue smart bomb (FireBall) 
    gameEngine.addEntity(fireBulletBig); //Blue smart bomb (FireBall) 
    gameEngine.addEntity(rocket);
    gameEngine.addEntity(enemy);
    gameEngine.addEntity(enemy2);
    gameEngine.addEntity(enemy3);

    var rangeX = -12;
    for (var i = 0; i < 12; i++) {
        var bossBullet = new BossBullet(gameEngine, rangeX);
        rangeX += 2;
        gameEngine.addEntity(bossBullet);
    }


    gameEngine.addEntity(flash);
    gameEngine.addEntity(flash2);
    gameEngine.addEntity(mainCraft);
    gameEngine.addEntity(score);
    gameEngine.addEntity(smallRock1);
    //gameEngine.addEntity(smallRock2);

    gameEngine.init(ctx);

    gameEngine.start();


});
