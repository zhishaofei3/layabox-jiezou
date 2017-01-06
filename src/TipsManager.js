(function () {

    var Handler = Laya.Handler;
    var Sprite = Laya.Sprite;
    var Tween = Laya.Tween;

    var readyTip;
    var goTip;
    var timesup;

    var fantasticTip;
    var perfectTip;
    var goodTip;
    var missTip;

    var lastTip;

    function TipsManager() {
        var _this = this;
        TipsManager.super(_this);

        _this.initTips();
    }

    Laya.class(TipsManager, "TipsManager", Sprite);

    var _proto = TipsManager.prototype;

    _proto.initTips = function () {
        var _this = this;

        readyTip = new Sprite();
        readyTip.loadImage("res/imgs/ready.png");
        readyTip.alpha = 0;
        readyTip.pivot(384, 172);
        readyTip.pos((Laya.stage.width) / 2, 520);
        _this.addChild(readyTip);

        goTip = new Sprite();
        goTip.loadImage("res/imgs/go.png");
        goTip.alpha = 0;
        goTip.pivot(436, 172);
        goTip.pos((Laya.stage.width) / 2, 520);
        _this.addChild(goTip);

        timesup = new Sprite();
        timesup.loadImage("res/imgs/timesup.png");
        timesup.alpha = 0;
        timesup.pivot(378, 84);
        timesup.pos((Laya.stage.width) / 2, 520);
        _this.addChild(timesup);

        fantasticTip = new Sprite();
        fantasticTip.loadImage("res/imgs/fantastic.png");
        fantasticTip.alpha = 0;
        fantasticTip.pivot(221, 66);
        fantasticTip.pos((Laya.stage.width) / 2 - 35, 520);
        _this.addChild(fantasticTip);

        perfectTip = new Sprite();
        perfectTip.loadImage("res/imgs/perfect.png");
        perfectTip.alpha = 0;
        perfectTip.pivot(221, 66);
        perfectTip.pos((Laya.stage.width) / 2, 520);
        _this.addChild(perfectTip);

        goodTip = new Sprite();
        goodTip.loadImage("res/imgs/good.png");
        goodTip.alpha = 0;
        goodTip.pivot(172, 66);
        goodTip.pos((Laya.stage.width) / 2, 520);
        _this.addChild(goodTip);

        missTip = new Sprite();
        missTip.loadImage("res/imgs/miss.png");
        missTip.alpha = 0;
        missTip.pivot(163, 66);
        missTip.pos((Laya.stage.width) / 2, 520);
        _this.addChild(missTip);

        console.log('初始化完毕');
    }

    _proto.startCountDown = function () {

    }

    _proto.showPlayTip = function (score) {
        var _this = this;
        if (score == 20) {
            _this.showTip(fantasticTip);
        } else if (score == 10) {
            _this.showTip(perfectTip);
        } else if (score == 5) {
            _this.showTip(goodTip);
        } else if (score == 0){
            _this.showTip(missTip);
        }
    }

    _proto.showTip = function (newTip) {
        var _this = this;

        if(lastTip) {
            Tween.clearAll(lastTip)
            lastTip.alpha = 0;
            lastTip.scaleX = 0.4;
            lastTip.scaleY = 0.4;
        }

        var handler = new Handler(lastTip, function () {
            Tween.to(newTip, {alpha: 0, y: 510}, 100, null, null, 250);
        });

        newTip.scaleX = 0.4;
        newTip.scaleY = 0.4;
        newTip.y = 520;
        newTip.alpha = 0;
        Tween.to(newTip, {alpha: 1, scaleX: 1, scaleY: 1}, 100, null, handler);
        lastTip = newTip;
    }

})();