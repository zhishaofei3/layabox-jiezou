(function () {
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Texture = Laya.Texture;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL = Laya.WebGL;
    var Stat = Laya.Stat;

    (function () {
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = Stage.SCALE_NOSCALE;
        Laya.stage.bgColor = "#232628";

        showApe();
    })();

    function showApe() {

        var gameManager = new GameManager();
        Laya.stage.addChild(gameManager);

    }
})();