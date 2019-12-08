var UIView = require("UIView");
var UITextView = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UITextView/UITextView",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        scrollView: cc.ScrollView,
        textContent: cc.UIText,

        text:
        {
            get: function () {
                if (this.textContent == null) {
                    return "text";
                }
                return this.textContent.text;
            },
            set: function (value) {
                if (this.textContent != null) {
                    this.textContent.text = value;
                    this.LayOut();
                }
            },
        },
        color: {
            get: function () {
                if (this.textContent == null) {
                    return cc.Color.BLACK;
                }
                return this.textContent.color;
            },
            set: function (value) {
                this.textContent.color = value;
            },
        },
        fontSize: {
            get: function () {
                if (this.textContent == null) {
                    return 64;
                }
                return this.textContent.fontSize;
            },
            set: function (value) {
                this.textContent.fontSize = value;
                this.LayOut();
            },
        },
    },


    onLoad: function () {
        this._super();
    },

    SetContentHeight(h) {
        // RectTransform rctran = objScrollContent.GetComponent<RectTransform>();
        // rctran.sizeDelta = new Vector2(rctran.sizeDelta.x, h);
    },

    LayOut() {
        this._super();
        // int fontsize = textContent.fontSize;
        // float str_w = Common.GetStringLength(textContent.text, AppString.STR_FONT_NAME, fontsize);

        // RectTransform rctran = this.GetComponent<RectTransform>();
        // float str_h = (str_w / rctran.rect.size.x + 1) * fontsize * 2;
        // SetContentHeight(str_h);
        // Debug.Log("textView str_w =" + str_w + " str_h=" + str_h + " rctran.rect.size.x=" + rctran.rect.size.x);
    },


});

cc.UITextView = module.export = UITextView;



