(function () {

    var Browser = Laya.Browser;
    var Ease = Laya.Ease;
    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var Sprite = Laya.Sprite;
    var Keyboard = Laya.Keyboard;
    var Tween = Laya.Tween;

    var bgManager;//背景管理
    var gameContainer;//游戏容器
    var roadArr = [];//四条路数组

    var wordsArr = ['private', 'public', 'class'];//单词数组
    var screenLetterBoxArr = [];//在屏幕中的字母数组

    function GameManager() {
        var _this = this;
        GameManager.super(_this);

        bgManager = new BgManager();
        this.addChild(bgManager);
        gameContainer = new Sprite();
        gameContainer.width = 920;
        gameContainer.height = 1380;
//        gameContainer.graphics.drawRect(0, 0, 920, 1380, "#FF0000");
        gameContainer.x = 78;
        gameContainer.y = 230;

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

        roadArr = [];

        for (var i = 0; i < ROAD_LEN; i++) {
            var oneRoadSprite = new Sprite();
            oneRoadSprite.width = 920;
            oneRoadSprite.height = 1380;
//            oneRoadSprite.graphics.drawRect(0, 0, 920, 1392, getRandomColor());
//            oneRoadSprite.graphics.drawRect(0, 0, 920, 1392);
//            oneRoadSprite.alpha = 0.5;

            roadArr.push(oneRoadSprite);
            gameContainer.addChild(oneRoadSprite);
        }

//        for (var j = 0; j < ROAD_LEN; j++) {
//            var letter = wordStr[j];
//            var letterBox = new UILetterBox(letter);
//            _this.appendOneLetter(letterBox);
//        }

        setInterval(function () {
            var letterBox = new UILetterBox("A");
            _this.appendOneLetter(letterBox);
//        }, 2000);
        }, 30);
    }

    var fourRoadPosition = [
        {
            start: {
                x: 228,
                y: -20,
                skewX: -10,
                scaleX: 0.6,
                scaleY: 0.6,
                alpha: 0
            },
            end: {
                x: -43,
                y: 1300,
                scaleX: 1.2,
                scaleY: 1.2,
            }
        }, {
            start: {
                x: 330,
                y: -20,
                skewX: -2,
                scaleX: 0.57,
                scaleY: 0.57,
                alpha: 0
            },
            end: {
                x: 185,
                y: 1300,
                scaleX: 1.22,
                scaleY: 1.22,
            }
        }, {
            start: {
                x: 442,
                y: -20,
                skew: 2,
                scaleX: 0.57,
                scaleY: 0.57,
                alpha: 0
            },
            end: {
                x: 424,
                y: 1300,
                scaleX: 1.22,
                scaleY: 1.22,
            }
        }, {
            start: {
                x: 542,
                y: -20,
                skewX: 7,
                scaleX: 0.55,
                scaleY: 0.55,
                alpha: 0
            },
            end: {
                x: 655,
                y: 1300,
                scaleX: 1.2,
                scaleY: 1.2
            }
        }
    ];

    _proto.appendOneLetter = function (letterBox) {
        screenLetterBoxArr.push(letterBox);

        var randomIndex = _.random(0, 3);
//        randomIndex = 1

        _.extend(letterBox, fourRoadPosition[randomIndex].start);
        roadArr[randomIndex].addChild(letterBox);
        var handler = new Handler(letterBox, function (rIndex) {
            var letterBox = screenLetterBoxArr.splice(screenLetterBoxArr.indexOf(this), 1)[0];
            roadArr[rIndex].removeChild(letterBox);
            letterBox.destroy(true);
        }, [randomIndex]);
        var V = 200;
        Tween.to(letterBox, fourRoadPosition[randomIndex].end, V, Ease.linearIn, handler);
        Tween.to(letterBox, {alpha: 1}, V * 0.4);
    }

    _proto.addEvents = function () {
        var _this = this;
        Laya.stage.on(Event.KEY_DOWN, this, function (e) {
            _this.onKeyDown(e);
        });
    }

    _proto.onKeyDown = function (e) {
//        console.log(e.keyCode === Keyboard['A']);
    }


})();