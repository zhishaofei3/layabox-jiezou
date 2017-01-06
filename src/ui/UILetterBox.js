(function () {

    var Animation = Laya.Animation;
    var Handler = Laya.Handler;
    var Sprite = Laya.Sprite;
    var Loader = Laya.Loader;
    var Particle2D = Laya.Particle2D;
    var Tween = Laya.Tween;

    function UILetterBox(wordObj) {
        UILetterBox.super(this);

        this.wordObj = wordObj;
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
        imgSprite.loadImage('res/imgs/' + this.wordObj.letter + '.png');
        imgSprite.scaleX = 0.45;
        imgSprite.scaleY = 0.45;
        imgSprite.x = 24;
        this.zimuCon.addChild(imgSprite);
    }

    _proto.destroyMe = function () {
        this.sp.stop();
        this.sp.destroy(true);
        this.sp = null;
        while (this.liziCon.numChildren) {
            this.liziCon.removeChildAt(0);
        }
        this.liziCon = null;
        while (this.zimuCon.numChildren) {
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

    _proto.setStatus = function (status) {
        this.wordObj.status = status;
    }

    _proto.bupipei = function (score) {
        var _this = this;
        _this.wordObj.status = -1;
        _this.xiaoshi();
    }

    _proto.pipei = function (score) {
        var _this = this;

//        console.log(_this.wordObj);
        _this.wordObj.status = 1;

//        console.log('有y ' + this.y);
//        console.log('字母' + this.wordObj.letter + ' 得分' + score);

        var color = "#FF0000";
        if (score == 5) {
            color = '#0000FF';
        } else if (score == 10) {
            color = '#FFFF00';
        } else if (score == 20) {
            color = '#00FF00';
        }

        var ani = new Animation();
        ani.loadAtlas('res/mc/assets.json'); // 加载图集动画
        ani.interval = 30;			// 设置播放间隔（单位：毫秒）
        ani.index = 1; 				// 当前播放索引
        ani.play(); 				// 播放图集动画
        ani.x = -120;
        ani.y = -170;
        ani.scaleX = 1.6;
        ani.scaleY = 1.6;
        _this.addChild(ani);

//        _this.zimuCon.graphics.drawRect(0, 0, 468, 352, color);
        _this.xiaoshi();
    }


})();





















