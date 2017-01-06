(function () {

    var BlurFilter = Laya.BlurFilter;
    var Browser = Laya.Browser;
    var Ease = Laya.Ease;
    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var SoundManager = Laya.SoundManager;
    var Sprite = Laya.Sprite;
    var Keyboard = Laya.Keyboard;
    var Tween = Laya.Tween;

    var bgManager;//游戏主背景
    var scoreManager;//分数容器
    var gameContainer;//游戏容器
    var gamePanel;//游戏区容器
    var gameBgPanel;//游戏区背景
    var bottomManager;//底部容器
    var roadArr = [];//四条路数组
    var pressBgArr = [];//四个按键闪光数组

    var wordsArr = [
        'PRINT HELLO NEW YEAR',
        'ECHO HAPPY EVERY DAY',
        'ALERT END'
    ];//单词数组
    var letterObjArr = [];
    var showLetterObjArr = [];
    var currLetter = {};//当前字母

    var screenLetterBoxArr = [];//在屏幕中的字母数组

    var bgMusicChannel;//背景音乐实例

    var i = 0, j = 0;//数组下标

    function GameManager() {
        var _this = this;
        GameManager.super(_this);

        bgManager = new BgManager();
        this.addChild(bgManager);

        gameContainer = new Sprite();
        gameContainer.y = 315;
        this.addChild(gameContainer);

        gameBgPanel = new Sprite();//游戏区背景
        gameBgPanel.loadImage("res/imgs/BG_02.png");
        gamePanel = new Sprite();
        gamePanel.width = 920;
        gamePanel.height = 1321;
        gamePanel.x = 78;

        gameContainer.addChild(gameBgPanel);
        gameContainer.addChild(gamePanel);

        scoreManager = new ScoreManager();
        this.addChild(scoreManager);

        bottomManager = new BottomManager();
        bottomManager.y = 1636;

        this.initLetterObjArr();

        this.addChild(bottomManager);

        _this.initGame();
        _this.addEvents();
    }

    Laya.class(GameManager, "GameManager", Sprite);

    var _proto = GameManager.prototype;

    _proto.initLetterObjArr = function () {
        for (var i = 0; i < wordsArr.length; i++) {
            var linArr = [];
            var line = wordsArr[i];
            for (var j = 0; j < line.length; j++) {
                linArr.push({letter: line[j], status: 0, position: [i, j]});
            }
            letterObjArr.push(linArr);
        }
    }

    _proto.initGame = function () {
        var _this = this;

//        _this.playMusic();
        _this.startWordArr();
        bottomManager.startGame();
    }

    _proto.playMusic = function () {
        SoundManager.autoStopMusic = false;
        bgMusicChannel = SoundManager.playMusic("res/sounds/bgMusic.mp3", 0);
    }

    _proto.startWordArr = function () {
        var _this = this;
        var ROAD_LEN = 4;

        roadArr = [];
        for (var i = 0; i < ROAD_LEN; i++) {
            var oneRoadSprite = new Sprite();
            oneRoadSprite.width = 920;
            oneRoadSprite.height = 1380;

            var pressBg = new Sprite();
            pressBg.loadImage("res/imgs/pressBg.png");
            oneRoadSprite.addChild(pressBg);

            _.extend(pressBg, roadPressPosition[i]);
            pressBg.alpha = 0;

            pressBgArr.push(pressBg);
            roadArr.push(oneRoadSprite);
            gamePanel.addChild(oneRoadSprite);
        }

        //按letterObjArr输出
        i = 0;
        j = 0;

        var intervalId = setInterval(function () {
            do {
                if (!currLetter) {
                    i++;
                    j = 0;
                }
                if (letterObjArr[i]) {
                    currLetter = letterObjArr[i][j++];
                } else {
                    var lastLine = letterObjArr[letterObjArr.length - 1];
                    currLetter = lastLine[lastLine.length - 1];
                    clearInterval(intervalId);
                    return;
                }
            } while (!currLetter || currLetter.letter == " ");

            var letterBox = new UILetterBox(currLetter);
            _this.appendOneLetter(letterBox);
            bottomManager.outputLetterArr(letterObjArr, currLetter.position);
        }, 1000);
    }

    _proto.appendOneLetter = function (letterBox) {
        var _this = this;
        screenLetterBoxArr.push(letterBox);

        var randomIndex = _.random(0, 3);
        letterBox.guidao = randomIndex;
        _.extend(letterBox, fourRoadPosition[randomIndex].start);
        roadArr[randomIndex].addChild(letterBox);

        var handler = new Handler(letterBox, function () {
            this.setStatus(-1);
            if (currLetter) {
                bottomManager.outputLetterArr(letterObjArr, currLetter.position);
            }
            _this.removeLetter(this);
        });
        var V = 4000;
        letterBox.moveTween = Tween.to(letterBox, fourRoadPosition[randomIndex].end, V, Ease.linearNone, handler);
        letterBox.alphaTween = Tween.to(letterBox, {alpha: 1}, V * 0.2);

        letterBox.on('UILetterBox_Remove_Event', this, _this.removeLetter);
    }

    _proto.removeLetter = function (letter) {
        var letterBox = screenLetterBoxArr.splice(screenLetterBoxArr.indexOf(letter), 1)[0];
        letterBox.destroyMe();
        letterBox.removeSelf();
        letterBox.destroy(true);
    }

    _proto.addEvents = function () {
        var _this = this;
        Laya.stage.on(Event.KEY_DOWN, this, function (e) {
            _this.onKeyDown(e);
        });
    }

    _proto.onKeyDown = function (e) {
        var _this = this;
        var keyDownLetter = String.fromCharCode(e.keyCode);
        var letter;
        for (var i = 0; i < screenLetterBoxArr.length; i++) {
            letter = screenLetterBoxArr[i];
            if (letter.wordObj.letter == keyDownLetter && letter.isOver == false) {
                if (letter.y < 980) {
                    _this.onKeyDownLetter(letter, false);
                    break;
                } else if (letter.y >= 980 && letter.y < 1042) {
                    _this.onKeyDownLetter(letter, true, 5);
                    break;
                } else if (letter.y >= 1042 && letter.y < 1090) {
                    _this.onKeyDownLetter(letter, true, 10);
                    break;
                } else if (letter.y >= 1090 && letter.y < 1140) {
                    _this.onKeyDownLetter(letter, true, 20);
                    break;
                } else if (letter.y >= 1140 && letter.y < 1235) {
                    _this.onKeyDownLetter(letter, true, 10);
                    break;
                } else if (letter.y >= 1235 && letter.y < 1280) {
                    _this.onKeyDownLetter(letter, true, 5);
                    break;
                } else {
                    console.log('不在范围里 ' + letter.y);
                }
            }
        }
        if (currLetter) {
            bottomManager.outputLetterArr(letterObjArr, currLetter.position);
        }
    }

    _proto.onKeyDownLetter = function (letter, isPipei, score) {
        if (isPipei) {
            var pressBg = pressBgArr[letter.guidao];
            var handler = new Handler(pressBg, function () {
                Tween.to(pressBg, {alpha: 0}, 200, null, null, 300);
            });
            Tween.clearAll(pressBg);
            Tween.to(pressBg, {alpha: 1}, 100, null, handler);
            letter.pipei(score);
            scoreManager.addScore(score);
        } else {
            letter.bupipei();
        }
    }

})();