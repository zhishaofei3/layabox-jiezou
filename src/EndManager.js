(function () {

    var Event = Laya.Event;
    var Sprite = Laya.Sprite;
    var HTMLDivElement = Laya.HTMLDivElement;
    var Handler = Laya.Handler;
    var Tween = Laya.Tween;

    var endContainer;
    var imgContainer;
    var tipTxt;
    var menuBtn;

    function EndManager() {
        var _this = this;
        EndManager.super(_this);

        _this.initBg();
    }

    Laya.class(EndManager, "EndManager", Sprite);

    var _proto = EndManager.prototype;
    _proto.initBg = function () {
        var _this = this;
        endContainer = new Sprite();

        var bgCon = new Sprite();
        bgCon.graphics.drawRect(0, 0, 1080, 1920, '#000');
        bgCon.alpha = 0.8;
        endContainer.addChild(bgCon);

        imgContainer = new Sprite();
        imgContainer.loadImage("res/imgs/endPanel.png");
        imgContainer.pivot(409, 549);
        imgContainer.x = 540;
        imgContainer.y = 960;
        endContainer.addChild(imgContainer);

        endContainer.visible = false;
        _this.addChild(endContainer);
    }

    _proto.showEndPanel = function (score, baifenbi, hasGift) {
        var _this = this;
        tipTxt = new HTMLDivElement();
        tipTxt.style.width = 600;
        tipTxt.style.height = 300;
        tipTxt.style.fontFamily = '方正小标宋简体';
        tipTxt.style.fontSize = 40;
        tipTxt.style.color = '#3CFFBE';
        tipTxt.style.align = 'center';
        tipTxt.style.lineHeight = 70;
        tipTxt.innerHTML = '恭喜你！<br/><span>完成了本次挑战，获得' + score + '分！</span><br/><span>领先全球' + baifenbi + '％玩家</span>';
        tipTxt.x = 100;
        tipTxt.y = 235;
        imgContainer.addChild(tipTxt);

        menuBtn = new Sprite();
        menuBtn.loadImage("res/imgs/menu-btn.png");
        menuBtn.pivot(340, 68);
        menuBtn.x = 415;
        menuBtn.y = 760;
        menuBtn.scaleY = 0;
        menuBtn.mouseEnabled = true;
        menuBtn.on(Event.CLICK, this, function () {
            window.location.href = 'http://baidu.com';
        });
        imgContainer.addChild(menuBtn);

        imgContainer.visible = true;
        imgContainer.scaleX = 0;
        Tween.to(imgContainer, {scaleX: 1}, 300, null, new Handler(this, function () {
            Tween.to(menuBtn, {scaleY: 1}, 200);
        }));
    }

})();