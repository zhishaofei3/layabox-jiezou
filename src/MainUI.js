(function () {
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Texture = Laya.Texture;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL = Laya.WebGL;
    var Loader = Laya.Loader;
    var Stat = Laya.Stat;
    var Particle2D = Laya.Particle2D;
    var Tween = Laya.Tween;

    (function () {
//        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.init(Browser.clientWidth, Browser.clientHeight);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.screenMode = Stage.SCREEN_NONE;
        Laya.stage.bgColor = "#232628";
        Stat.show();
        init();
    })();

    function init() {
        var gameManager = new GameManager();
        Laya.stage.addChild(gameManager);

//        Laya.loader.load("res/parts/lizi2.part", Handler.create(this, onAssetsLoaded), null, Loader.JSON);
    }

    var i = 0;
    function onAssetsLoaded(settings) {
        var sp = new Particle2D(settings);
        sp.play();
        sp.emitter.start();
        sp.x = 100;
        sp.y = 100;
        sp.name = (i++).toString();
        console.log(sp.name);
        Laya.stage.addChild(sp);

        setTimeout(function () {
            var emitter = sp.emitter;
            emitter.stop();
            emitter.clear();
            sp.stop();
            sp.destroy(true);
            Laya.stage.removeChild(sp);
            onAssetsLoaded(settings);
        }, 100);
    }

})();
