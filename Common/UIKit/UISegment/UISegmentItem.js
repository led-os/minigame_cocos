var UIView = require("UIView");
var UIText = require("UIText");
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
        textTitle: UIText,
        colorSel: cc.Color.RED,
        colorUnSel: cc.Color.WHITE,
        infoItem: null,
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
                if (this.textTitle == null) {
                    return;
                }
                this.textTitle.fontSize = value;
                this.LayOut();
            },
        },
        // color: {
        //     get: function () {
        //         if (this.textTitle == null) {
        //             return cc.Color.BLACK;
        //         }
        //         return this.textTitle.color;
        //     },
        //     set: function (value) {
        //         this.textTitle.color = value;
        //     },
        // },

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
        //this.textTitle.color = cc.Color.BLUE;
    },

    LayOut: function () {
        this._super();
    },

    UpdateItem(info) {
       // this.fontSize = 64;
        this.infoItem = info;
        this.textTitle.color = this.colorUnSel;
        this.textTitle.text = info.title;

        cc.Debug.Log("UISegmentItem UpdateItem title=" + info.title);
        // this.scheduleOnce(this.LayOutInternal, 0.25);
    },

    SetSelect(isSel) {
        if (isSel) {
            cc.Debug.Log("UISegmentItem SetSelect set color=" + this.colorSel);
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
        // this.SetSelect(true);
    },

});

//cc.UISegmentItem = module.export = UISegmentItem;

