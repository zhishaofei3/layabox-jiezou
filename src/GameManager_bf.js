(function () {

    var Browser = Laya.Browser;
    var Event   = Laya.Event;
    var Sprite = Laya.Sprite;
    var Keyboard = Laya.Keyboard;

    var bgManager;//背景管理
    var gameContainer;//游戏容器

    var wordsArr = ['private', 'public', 'class'];//单词数组
    var screenLetterArr = [];//在屏幕中的字母数组

    function GameManager() {
        var _this = this;
        GameManager.super(_this);

        bgManager = new BgManager();
        this.addChild(bgManager);
        gameContainer = new Sprite();
        gameContainer.width = 620;
//        gameContainer.skewX = 50;
//        gameContainer.skewY = 4;
        this.addChild(gameContainer);

        _this.initGame();
        _this.addEvents();
    }

    Laya.class(GameManager, "GameManager", Sprite);

    var _proto = GameManager.prototype;

    _proto.initGame = function () {
        var _this = this;
        var randomInt = _.random(0, wordsArr.length - 1);
        var wordStr = wordsArr[randomInt];
        _this.startOneWord(wordStr);
    }

    _proto.startOneWord = function (wordStr) {
        var _this = this;
        var wordLen = wordStr.length;
        var ROAD_LEN = 4;
        var oneRoadWidth = 1080 / 4;

        var roadArr = [];

        for(var i = 0; i < ROAD_LEN; i++) {
            var oneRoadSprite = new Sprite();
            oneRoadSprite.width = oneRoadWidth;
            oneRoadSprite.x = oneRoadWidth * i;
            oneRoadSprite.graphics.drawRect(0,0, oneRoadWidth, Browser.clientHeight, getRandomColor());
            oneRoadSprite.alpha = 0.7;
            if(i == 0) {
                oneRoadSprite.skewX = -2;
            } else if(i == 1) {
                oneRoadSprite.skewX = -1;
            } else if(i==2) {
                oneRoadSprite.skewX = 1;
            } else {
                oneRoadSprite.skewX = 2;
            }
            roadArr.push(oneRoadSprite);
            gameContainer.addChild(oneRoadSprite);
        }

        for(var j = 0; j < ROAD_LEN; j++) {
            var letter = wordStr[j];
            var dropbox = new UIDropBox(letter);
//            dropbox.x = dropbox.width;
            screenLetterArr.push(dropbox);
            roadArr[j].addChild(dropbox);
        }

        Laya.timer.frameLoop(2, _this, _this.slowDown);
    }

    _proto.slowDown = function () {
        for(var i in screenLetterArr) {
            var dropBox = screenLetterArr[i];
            dropBox.y += 4;
        }
    }

    _proto.addEvents = function () {
        var _this = this;
//        console.log('addEvent');
        Laya.stage.on(Event.KEY_DOWN, this, function (e) {
            _this.onKeyDown(e);
        });
    }

    _proto.onKeyDown = function (e) {
//        console.log(e.keyCode === Keyboard['A']);
    }



})();