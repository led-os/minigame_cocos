var UIView = require("UIView");
var UISegmentItem = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UISegment/UISegmentItem",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        imageBg: cc.UIImage,
        textTitle: cc.UIText,

        colorSel: cc.Color.RED,
        colorUnSel: cc.Color.WHITE,

        text:
        {
            get: function () {
                if (this.textTitle == null) {
                    return "text";
                }
                return this.textTitle.text;
            },
            set: function (value) {
                //this._text = value;
                this.textTitle.text = value;
                this.LayOut();
            },
        },

        fontSize: {
            get: function () {
                if (this.textTitle == null) {
                    return 12;
                }
                return this.textTitle.fontSize;
            },
            set: function (value) {
                this.textTitle.fontSize = value;
                this.LayOut();
            },
        },
        color: {
            get: function () {
                if (this.textTitle == null) {
                    return cc.Color.BLACK;
                }
                return this.textTitle.color;
            },
            set: function (value) {
                this.textTitle.color = value;
            },
        },

        /*
        { 
            OnDidClickItem: function (ui) {
            },  
        }
        */
        objCallBack: null,
    },


    onLoad: function () {
        this._super();
    },

    LayOut: function () {
        this._super();
    },

    UpdateItem(info) {
        // infoItem = info;
        this.textTitle.color = this.colorUnSel;
        this.textTitle.text = info.title;
    }
    , SetSelect(isSel) {
        if (isSel) {
            this.textTitle.color = this.colorSel;
        }
        else {
            this.textTitle.color = this.colorUnSel;
        }
    }
    ,
    OnClickItem: function (event, customEventData) {
        if (this.objCallBack != null) {
            this.objCallBack.OnDidClickItem(this);
        }
    },

});

cc.UISegmentItem = module.export = UISegmentItem;

