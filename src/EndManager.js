(function () {

    var Event = Laya.Event;
    var Sprite = Laya.Sprite;
    var HTMLDivElement = Laya.HTMLDivElement;
    var Handler = Laya.Handler;
    var Text = Laya.Text;
    var Tween = Laya.Tween;

    var endContainer;
    var imgContainer;

    var rankTxt;
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
        imgContainer.pivot(438, 689);
        imgContainer.x = 545;
        imgContainer.y = 915;
        endContainer.addChild(imgContainer);

        endContainer.visible = false;
        _this.addChild(endContainer);
    }

    _proto.showEndPanel = function (scoreObj) {
        var _this = this;

        var rank = _this.saveAndGetRank(scoreObj.totalScore);
        var rankStr = _this.getRankStr(rank);

        rankTxt = new HTMLDivElement();
        rankTxt.style.width = 150;
        rankTxt.style.fontFamily = 'Impact';
        rankTxt.style.fontSize = 60;
        rankTxt.style.color = '#0EAB77';
        rankTxt.style.lineHeight = 60;
        rankTxt.style.align = 'center';
        rankTxt.x = 385;
        rankTxt.y = 220;
        rankTxt.innerHTML = rankStr;
        imgContainer.addChild(rankTxt);

        var arr = [
            {name: 'perfect', txt: '> Perfect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'},
            {name: 'good', txt: '> Good . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'},
            {name: 'miss', txt: '> Miss . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'},
            {name: 'comboMax', txt: '> Combo Max . . . . . . . . . . . . . . . . . . . . . . . . . . .'},
            {name: 'totalScore', txt: '> Total Score . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}
        ]

        var scoreTxtArr = [];
        for(var i = 0; i < arr.length; i++) {
            var lineArr = [];
            var txt = arr[i].txt;
            var nameTf = new Text();
            nameTf.width = 600;
            nameTf.height = 100;
            nameTf.font = 'Charcoal CY';
            nameTf.fontSize = 40;
            nameTf.bold = true;
            nameTf.color = '#0EAB77';
            nameTf.italic = true;
            nameTf.overflow = 'hidden';
            nameTf.x = 145;
            nameTf.text = txt;
            nameTf.visible = false;
            imgContainer.addChild(nameTf);
            lineArr.push(nameTf);

            var name = arr[i].name;
            if(name) {
                var scoreHtml = new HTMLDivElement();
                scoreHtml.style.height = 100;
                scoreHtml.style.fontFamily = 'Charcoal CY';
                scoreHtml.style.fontSize = 40;
                scoreHtml.style.bold = true;
                scoreHtml.style.color = '#0EAB77';
                scoreHtml.style.lineHeight = 40;
                scoreHtml.style.italic = true;
                scoreHtml.style.align = 'right';
                scoreHtml.x = 540;
                scoreHtml.innerHTML = (scoreObj[name]).toString();
                scoreHtml.visible = false;
                nameTf.width = 600 - scoreHtml.contextWidth - 5;
                imgContainer.addChild(scoreHtml);
                lineArr.push(scoreHtml);
            }
            scoreTxtArr.push(lineArr);
        }

        var index = 0;
        var intervalId = setInterval(function () {
            var currShowArr = [];
            for(var j = 0; j <= index; j++) {
                var lineArr = scoreTxtArr[j];
                currShowArr.push(lineArr);
            }
            currShowArr.reverse();
            for (var k = 0; k < currShowArr.length; k++) {
                var lineArr = currShowArr[k];
                for (var n in lineArr) {
                    lineArr[n].y = 950 - k * 100;
                    lineArr[n].visible = true;
                }
            }
            index++;
            if(index == scoreTxtArr.length) {
                clearInterval(intervalId);

                menuBtn = new Sprite();
                menuBtn.loadImage("res/imgs/menu-btn.png");
                menuBtn.pivot(321, 51);
                menuBtn.x = 446;
                menuBtn.y = 1150;
                menuBtn.scaleX = 0;
                menuBtn.mouseEnabled = true;
                menuBtn.size(643, 102);
                menuBtn.on(Event.MOUSE_OVER, this, function () {
                    menuBtn.graphics.clear();
                    menuBtn.loadImage("res/imgs/menu-btn-hover.png");
                });
                menuBtn.on(Event.MOUSE_OUT, this, function () {
                    menuBtn.graphics.clear();
                    menuBtn.loadImage("res/imgs/menu-btn.png");
                });
                menuBtn.on(Event.CLICK, this, function () {
                    window.location.href = '../index/index-number.html';
                });
                imgContainer.addChild(menuBtn);
                Tween.to(menuBtn, {scaleX: 1}, 200);

                var guoguan = new Sprite();
                guoguan.loadImage("res/imgs/guoguan.png");
                guoguan.pivot(0, 96);
                guoguan.x = 470;
                guoguan.y = 1040;
                guoguan.scaleX = 4;
                guoguan.scaleY = 4;
                Tween.to(guoguan, {scaleX: 1, scaleY: 1}, 200);
                imgContainer.addChild(guoguan);
            }
        }, 200);
        endContainer.visible = true;
    }

    _proto.saveAndGetRank = function (score) {
        var scoreStr = localStorage.getItem('score');
        var scoreArr = [];
        if(scoreStr) {
            scoreArr = scoreStr.split(',');
            scoreArr.sort(function (a, b) {
                return parseInt(a) - parseInt(b);
            });
        }

        var paiming = scoreArr.length + 1;
        for(var i = 0; i < scoreArr.length; i++) {
            if(score > parseInt(scoreArr[i])) {
                paiming--;
            }
        }

        scoreArr.push(score);
        var newScoreStr = scoreArr.join(',');
        localStorage.setItem('score', newScoreStr);
        return paiming;
    }

    _proto.getRankStr = function (rank) {
        var rankStr = '';
        if(rank == 1) {
            rankStr = '1<span style="font-size: 47px; line-height: 50;">st</span>';
        } else if (rank == 2) {
            rankStr = '2<span style="font-size: 47px; line-height: 50;">nd</span>';
        } else if (rank == 3) {
            rankStr = '3<span style="font-size: 47px; line-height: 50;">rd</span>';
        } else {
            rankStr = rank + '<span style="font-size: 47px; line-height: 50;">th</span>';
        }
        return rankStr;
    }

})();