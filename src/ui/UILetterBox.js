(function () {

    var BlurFilter = Laya.BlurFilter;
    var GlowFilter = Laya.GlowFilter;
    var Handler = Laya.Handler;
    var Sprite = Laya.Sprite;
    var Loader = Laya.Loader;
    var Particle2D = Laya.Particle2D;
    var Tween = Laya.Tween;


    function UILetterBox(letter) {
        UILetterBox.super(this);

        this.letter = letter.toUpperCase();
        this.isOver = false;//是否已经排除

        this.bgCon = new Sprite();
        this.addChild(this.bgCon);

        this.liziCon = new Sprite();
        this.addChild(this.liziCon);
        this.zimuCon = new Sprite();
        this.addChild(this.zimuCon);
        this.addLetterImg();

        this.moveTween = null;//移动缓动
        this.alphaTween = null;//出现缓动


        Laya.loader.load("res/parts/lizi2.part", Handler.create(this, onAssetsLoaded), null, Loader.JSON);
        this.drawShawdow();
    }

    function onAssetsLoaded(settings) {
        settings.colorComponentInter = true;

        this.sp = new Particle2D(settings);
        this.sp.play();
        this.sp.emitter.start();
        this.sp.x = 130;
        this.sp.y = 50;
        this.liziCon.addChild(this.sp);
    }

    Laya.class(UILetterBox, "UILetterBox", Sprite);

    var _proto = UILetterBox.prototype;

    _proto.addLetterImg = function () {
        var imgSprite = new Sprite();
        imgSprite.loadImage('res/imgs/' + this.letter + '.png');
        imgSprite.scaleX = 0.45;
        imgSprite.scaleY = 0.45;
        imgSprite.x = 24;
        this.zimuCon.addChild(imgSprite);
    }

    _proto.destroyMe = function () {
        this.sp.stop();
        this.sp.destroy(true);
        this.sp = null;
        while(this.liziCon.numChildren) {
            this.liziCon.removeChildAt(0);
        }
        this.liziCon = null;
        while(this.zimuCon.numChildren) {
            this.zimuCon.removeChildAt(0);
        }
        this.zimuCon = null;
    }

//    _proto.addBgRect = function () {
//        var bgSp = new Sprite();
//        bgSp.graphics.
//    }

    _proto.drawShawdow = function () {
    }

    _proto.xiaoshi = function () {
        var _this = this;

        Tween.clearAll(_this);
        _this.isOver = true;

//        console.log(_this.guidao + " " + _this.y);

        Tween.to(_this, {alpha: 0}, 500, null, new Handler(this, function () {
            _this.event('UILetterBox_Remove_Event', [this]);
        }));
    }



})();





















