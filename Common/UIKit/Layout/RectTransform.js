var Common = require("Common");

var RectSizeType = cc.Enum({
    //区分大小写
    MATCH_PARENT: 0,//和父节点一样大
    MATCH_CONTENT: 1,//按内容大小

});

var RectTransform = cc.Class({
    extends: cc.Component,
    statics: {
        //enum
        RectSizeType: RectSizeType,
    },

    properties: {
        _sizeType: RectSizeType.MATCH_PARENT,
        sizeType: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: RectSizeType,
            get: function () {
                return this._sizeType;
            },
            set: function (value) {
                this.UpdateType(value);
            },
        },

        //     The offset of the lower left corner of the rectangle relative to the lower left
        //     anchor.
        _offsetMin: cc.Vec2,
        offsetMin:
        {
            type: cc.Vec2,
            get: function () {
                return this._offsetMin;
            },
            set: function (value) {
                this._offsetMin = value;
                this.UpdateType(this.sizeType);
            },
        },

        _offsetMax: cc.Vec2,
        //     The offset of the upper right corner of the rectangle relative to the upper right
        //     anchor.
        offsetMax:
        {
            type: cc.Vec2,
            get: function () {
                return this._offsetMax;
            },
            set: function (value) {
                this._offsetMax = value;
                this.UpdateType(this.sizeType);
            },
        },
        _width: 0,
        width:
        {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                //this.UpdateType(this.sizeType);
            },
        },
        _height: 0,
        height:
        {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                // this.UpdateType(this.sizeType);
            },
        },

    },
    onLoad: function () {
        this.UpdateType(this.sizeType);
    },
    UpdateType: function (type) {
        this._sizeType = type;
        var sizeParent = Common.GetSizeOfParnet(this.node);
        var x, y, w, h;

        switch (this._sizeType) {
            case RectSizeType.MATCH_CONTENT:
                {
                    this.width = this.node.getContentSize().width;
                    this.height = this.node.getContentSize().height;
                }
                break;
            case RectSizeType.MATCH_PARENT:
                {
                    w = sizeParent.width - this.offsetMin.x - this.offsetMax.x;
                    h = sizeParent.height - this.offsetMin.y - this.offsetMax.y;
                    this.width = w;
                    this.height = h;
                    this.node.setContentSize(new cc.size(w, h));
                }
                break;

        }
    },

});
// cc.RectTransform = module.export = RectTransform;

