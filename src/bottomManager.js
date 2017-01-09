(function () {

    var Sprite = Laya.Sprite;
    var Text = Laya.Text;

    var bottomBgPanel;//分数区容器
    var HTMLDivElement = Laya.HTMLDivElement;

    var beforeTxt;
    var bottomHTMLTxt;

    var hasUnderLineAtLast = false;

    function BottomManager() {
        var _this = this;
        BottomManager.super(_this);

        _this.initBg();
        _this.initText();
    }

    Laya.class(BottomManager, "BottomManager", Sprite);

    var _proto = BottomManager.prototype;

    _proto.startGame = function () {
        Laya.timer.loop(400, this, this.underLineTimer);
    }

    _proto.underLineTimer = function () {
        var _this = this;
        hasUnderLineAtLast = !hasUnderLineAtLast;
        if (_this.letterObjArr) {
            _this.outputLetterArr(_this.letterObjArr, _this.positionIJ);
        } else {
            var htmlStr = '';
            if (hasUnderLineAtLast) {
                htmlStr = '<span style="color: #00F8B0;">▌</span>';
            }
            bottomHTMLTxt.innerHTML = htmlStr;
        }
    }

    _proto.initBg = function () {
        var _this = this;
        bottomBgPanel = new Sprite();
        bottomBgPanel.loadImage("res/imgs/BG_03.png");
        _this.addChild(bottomBgPanel);
    }

    _proto.initText = function () {
        var _this = this;

        var beforeTxt = new Text();
        beforeTxt.font = "Impact";
        beforeTxt.fontSize = 35;
        beforeTxt.color = "#00F8B0";
        beforeTxt.fontWeight = "bold";
        beforeTxt.x = 122;
        beforeTxt.y = 38;
        beforeTxt.text = '>';
        _this.addChild(beforeTxt);

        bottomHTMLTxt = new HTMLDivElement();
        bottomHTMLTxt.style.font = "Impact";
        bottomHTMLTxt.style.fontSize = 35;
        bottomHTMLTxt.style.color = "#aeaeb1";
        bottomHTMLTxt.style.fontWeight = "bold";
        bottomHTMLTxt.style.lineHeight = 50;
        bottomHTMLTxt.style.letterSpacing = 8;
        bottomHTMLTxt.width = 825;
        bottomHTMLTxt.height = 156;
        bottomHTMLTxt.x = 152;
        bottomHTMLTxt.y = 32;
        _this.addChild(bottomHTMLTxt);
    }

    _proto.outputLetterArr = function (letterObjArr, positionIJ) {
        var _this = this;
        var htmlStr = '';
        if (!positionIJ) {
            return;
        }
        var endI = positionIJ[0];
        var endJ = positionIJ[1];

        _this.letterObjArr = letterObjArr;//缓存引用
        _this.positionIJ = positionIJ;//缓存引用

        for (var i = 0; i <= endI; i++) {
            var endJJ;
            if (i < endI) {
                endJJ = letterObjArr[i].length;
            } else {
                endJJ = endJ + 1;
            }
            for (var j = 0; j < endJJ; j++) {
                var letterObj = letterObjArr[i][j];
                if (letterObj.letter == " ") {
                    htmlStr += '&nbsp;';
                } else {
                    if (letterObj.status == 0) {
                        htmlStr += '<span style="color: #AEAEB1;">' + letterObj.letter + '</span>';
                    } else if (letterObj.status == 1) {
                        htmlStr += '<span style="color: #00F8B0;">' + letterObj.letter + '</span>';
                    } else if (letterObj.status == -1) {
                        htmlStr += '<span style="color: #FF6464;">' + letterObj.letter + '</span>';
                    }
                }
            }
            if (i != endI) {
                htmlStr += '<br/>';
            }
        }
        if (hasUnderLineAtLast) {
            htmlStr += '<span style="color: #00F8B0;">▌</span>';
        }
        bottomHTMLTxt.innerHTML = htmlStr;

    }

})();