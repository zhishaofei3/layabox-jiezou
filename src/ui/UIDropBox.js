(function () {

    var Sprite = Laya.Sprite;
    var Text = Laya.Text;

    function UIDropBox() {
        UIDropBox.super(this);

        this.txt = this.getTextFeild();
        this.txt.y = 50;
        this.txt.text = 'A';
        this.addChild(this.txt);
    }

    Laya.class(UIDropBox, "UIDropBox", Sprite);

    var _proto = UIDropBox.prototype;
    _proto.getTextFeild = function () {
        var text = new Text();
        text.overflow = Text.VISIBLE;
        text.color = "#000";
        text.fontSize = 80;
        return text;
    }

})();