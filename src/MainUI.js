(function () {
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Texture = Laya.Texture;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var WebGL = Laya.WebGL;

    (function () {
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = Stage.SCALE_NOSCALE;
        Laya.stage.bgColor = "#232628";

        showApe();
    })();

    function showApe() {
        // 方法1：使用loadImage
        var ape = new Sprite();
        Laya.stage.addChild(ape);
        ape.loadImage("res/jiezou/bg.jpg");
    }
})();