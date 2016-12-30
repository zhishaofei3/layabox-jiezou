(function () {

    var GlowFilter = Laya.GlowFilter;
    var Handler = Laya.Handler;
    var Sprite = Laya.Sprite;
    var Loader = Laya.Loader;
    var Particle2D = Laya.Particle2D;
//    var Text = Laya.Text;

    var letter = '';
    var sp;

    function UILetterBox(letter, width) {
        UILetterBox.super(this);

        letter = letter;
        this.addLetterImg();
//        this.addBgRect();

        Laya.loader.load("res/parts/xingxing.part", Handler.create(this, onAssetsLoaded), null, Loader.JSON);
        this.drawShawdow();
    }

    function onAssetsLoaded(settings) {
//        settings.colorComponent = true;
        console.log(settings);
        settings.colorComponentInter = true;
//        settings.boxEmitterVelocity = true;
        sp = new Particle2D(settings);
        sp.emitter.start();
        sp.play();
        sp.x = 130;
        sp.y = 40;
        this.addChild(sp);
    }

    Laya.class(UILetterBox, "UILetterBox", Sprite);

    var _proto = UILetterBox.prototype;

    _proto.addLetterImg = function () {
        var imgSprite = new Sprite();
        imgSprite.loadImage('res/jiezou/wenzi2.png');
        this.addChild(imgSprite);
    }

//    _proto.addBgRect = function () {
//        var bgSp = new Sprite();
//        bgSp.graphics.
//    }

    _proto.drawShawdow = function () {

    }

})();





















