(function () {

    var Event = Laya.Event;
    var Sprite = Laya.Sprite;
    var HTMLDivElement = Laya.HTMLDivElement;
    var Handler = Laya.Handler;
    var Tween = Laya.Tween;

    var endContainer;
    var imgContainer;
    var codeTxt;
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

    var bxCodeArr = [
        'Loading BIOS …… Success.',
        'Loading MBR …… Success.',
        'Loading GRUB …… Success.',
        'Uncompressing Linux …… OK, booting the kernel.',
        'Starting Initialization …… Success.',
        'Auto-Detecting Source code …… 1 Founded.'
    ];
    var lastStr = 'Auto-Executing Source code ……';

    _proto.showEndPanel = function (score, baifenbi, hasGift, letterObjArr, positionIJ) {
        var _this = this;
        var codeIndex = 0;
        var codeArr = ['', bxCodeArr[codeIndex]];

        var userHTMLArr = _this.getUserLetterArr(letterObjArr, positionIJ);
        var totalArr = _.union(bxCodeArr, userHTMLArr);
        totalArr.push(lastStr);

        console.log(totalArr);

        codeTxt = new HTMLDivElement();
        codeTxt.style.width = 600;
        codeTxt.style.height = 140;
        codeTxt.style.fontFamily = 'Impact';
        codeTxt.style.fontSize = 30;
        codeTxt.style.color = '#3CFFBE';
//        codeTxt.style.backgroundColor = '#FF0000';
        codeTxt.style.lineHeight = 40;
        codeTxt.innerHTML = codeArr.join('<br/>');
        codeTxt.x = 105;
        codeTxt.y = 235;
        imgContainer.addChild(codeTxt);

        var intervalId = setInterval(function () {
            codeIndex++;
            if(codeIndex == totalArr.length - 1) {
                clearInterval(intervalId);
            }
            if(codeArr.length == 2) {
                codeArr.shift();
            }
            codeArr.push(totalArr[codeIndex]);
            codeTxt.innerHTML = codeArr.join('<br/>');
        }, 500);

        tipTxt = new HTMLDivElement();
        tipTxt.style.width = 600;
        tipTxt.style.height = 300;
        tipTxt.style.fontFamily = '方正小标宋简体';
        tipTxt.style.fontSize = 40;
        tipTxt.style.color = '#3CFFBE';
        tipTxt.style.align = 'center';
        tipTxt.style.lineHeight = 70;
        tipTxt.innerHTML = '恭喜你！<br/><span>完成了本次挑战，获得' + score + '分！</span><br/><span>领先全球' + baifenbi + '％玩家</span>';
        tipTxt.x = 105;
        tipTxt.y = 435;
        imgContainer.addChild(tipTxt);

        menuBtn = new Sprite();
        menuBtn.loadImage("res/imgs/menu-btn.png");
        menuBtn.pivot(340, 68);
        menuBtn.x = 415;
        menuBtn.y = 820;
        menuBtn.scaleY = 0;
        menuBtn.mouseEnabled = true;
        menuBtn.on(Event.CLICK, this, function () {
            window.location.href = 'http://baidu.com';
        });
        imgContainer.addChild(menuBtn);

        endContainer.visible = true;
        imgContainer.scaleX = 0;
        Tween.to(imgContainer, {scaleX: 1}, 300, null, new Handler(this, function () {
            Tween.to(menuBtn, {scaleY: 1}, 200);
        }));
    }

    _proto.getUserLetterArr = function (letterObjArr, positionIJ) {
        var arr = [];
        var htmlStr = '';
        if (!positionIJ) {
            return;
        }

        var endI = positionIJ[0];
        var endJ = positionIJ[1];

        for (var i = 0; i <= endI; i++) {
            var endJJ;
            htmlStr = '';
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
                    if (letterObj.status == 1) {
                        htmlStr += '<span style="color: #00F8B0;">' + letterObj.letter + '</span>';
                    } else if (letterObj.status == -1) {
                        htmlStr += '<span style="color: #FF6464;">' + letterObj.letter + '</span>';
                    }
                }
            }
            arr.push(htmlStr);
        }
        return arr;
    }
})();