(function () {
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Texture = Laya.Texture;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL = Laya.WebGL;
    var Stat = Laya.Stat;

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
    }
})();
