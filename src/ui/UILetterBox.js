(function () {

    var BlurFilter = Laya.BlurFilter;
    var GlowFilter = Laya.GlowFilter;
    var Handler = Laya.Handler;
    var Sprite = Laya.Sprite;
    var Loader = Laya.Loader;
    var Particle2D = Laya.Particle2D;
//    var Text = Laya.Text;

    var letter = '';
    var sp;

    var liziCon;
    var zimuCon;

    function UILetterBox(letter, width) {
        UILetterBox.super(this);

        letter = letter;
//        this.addBgRect();

        liziCon = new Sprite();
//        liziCon.graphics.drawRect(0,0,50,50, "#FFFF00");
        this.addChild(liziCon);
        zimuCon = new Sprite();
        this.addChild(zimuCon);
//        zimuCon.graphics.drawRect(0,0,100,100, "#FF0000");
        this.addLetterImg();

//        Laya.loader.load("res/parts/xingxing.part", Handler.create(this, onAssetsLoaded), null, Loader.JSON);
        Laya.loader.load("res/parts/lizi2.part", Handler.create(this, onAssetsLoaded), null, Loader.JSON);
        this.drawShawdow();
    }

    function onAssetsLoaded(settings) {
        sp = new Particle2D(settings);
        sp.emitter.start();
        sp.play();
        sp.x = 130;
        sp.y = 50;
        liziCon.addChild(sp);
    }

    Laya.class(UILetterBox, "UILetterBox", Sprite);

    var _proto = UILetterBox.prototype;

    _proto.addLetterImg = function () {
        var imgSprite = new Sprite();
        imgSprite.loadImage('res/imgs/wenzi2.png');
        zimuCon.addChild(imgSprite);
    }

//    _proto.addBgRect = function () {
//        var bgSp = new Sprite();
//        bgSp.graphics.
//    }

    _proto.drawShawdow = function () {

    }

})();





















