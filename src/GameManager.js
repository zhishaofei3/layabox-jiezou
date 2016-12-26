(function () {

    var Browser = Laya.Browser;
    var Sprite = Laya.Sprite;
    var Text = Laya.Text;

    var bgManager;//背景管理
    var gameContainer;//游戏容器

    var txtArr = ['private', 'public', 'class'];

    function GameManager() {
        var _this = this;
        GameManager.super(_this);

        bgManager = new BgManager();
        this.addChild(bgManager);
        gameContainer = new Sprite();
        gameContainer.width = 620;
        this.addChild(gameContainer);

        _this.initGame();
        _this.addEvents();
    }

    Laya.class(GameManager, "GameManager", Sprite);

    var _proto = GameManager.prototype;

    _proto.initGame = function () {
        var _this = this;
        var randomInt = _.random(0, txtArr.length - 1);
        var wordStr = txtArr[randomInt];
        _this.startOneWord(wordStr);
    }

    _proto.startOneWord = function (wordStr) {
        var wordLen = wordStr.length;
        var oneRoadWidth = 620 / wordLen;

        var roadArr = [];

        for(var i = 0; i < wordLen; i++) {
            var oneSprite = new Sprite();
            oneSprite.width = oneRoadWidth;
            oneSprite.x = oneRoadWidth * i;
            oneSprite.graphics.drawRect(0,0, oneRoadWidth, Browser.clientHeight, getRandomColor());
            oneSprite.alpha = 0.7;
            gameContainer.addChild(oneSprite);
        }



        var dropbox = new UIDropBox();
        gameContainer.addChild(dropbox);
    }

    _proto.addEvents = function () {

        

    }



})();