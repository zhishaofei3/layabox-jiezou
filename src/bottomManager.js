(function () {

    var Sprite = Laya.Sprite;

    var bottomBgPanel;//分数区容器

    function BottomManager() {
        var _this = this;
        BottomManager.super(_this);

        _this.initBg();
    }

    Laya.class(BottomManager, "BottomManager", Sprite);

    var _proto = BottomManager.prototype;
    _proto.initBg = function () {
        var _this = this;
        bottomBgPanel = new Sprite();
        bottomBgPanel.loadImage("res/imgs/BG_03.png");
        _this.addChild(bottomBgPanel);
    }



})();