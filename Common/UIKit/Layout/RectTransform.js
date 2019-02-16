var Common = require("Common");
var LayoutAlign = require("LayoutAlign");

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
        _sizeTypeX: RectSizeType.MATCH_PARENT,
        sizeTypeX: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: RectSizeType,
            get: function () {
                return this._sizeTypeX;
            },
            set: function (value) {
                this.UpdateType(value, true);
            },
        },

        _sizeTypeY: RectSizeType.MATCH_PARENT,
        sizeTypeY: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: RectSizeType,
            get: function () {
                return this._sizeTypeY;
            },
            set: function (value) {
                this.UpdateType(value, false);
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
                this.UpdateType(this.sizeType, true);
                this.UpdateType(this.sizeType, false);
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
                this.UpdateType(this.sizeType, true);
                this.UpdateType(this.sizeType, false);
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
        this.OnResize();

    },

    OnResize: function () {

        this.UpdateType(this.sizeTypeX, true);
        this.UpdateType(this.sizeTypeY, false);

        var x, y, w, h;
        w = this.node.getContentSize().width;
        h = this.node.getContentSize().height;
        cc.log("OnResize w=" + w + " h=" + h);

        var children = this.node._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var rctran = child.getComponent(RectTransform);
            if (rctran != null) {
                cc.log("OnResize child");
                rctran.OnResize();
            }

        }

        var lA = this.node.getComponent(LayoutAlign);
        if(lA!=null){
            lA.UpdateType(lA.alignType);
        }
    },

    UpdateType: function (type, isX) {
        if (isX == true) {
            this._sizeTypeX = type;
        } else {
            this._sizeTypeY = type;
        }
        var sizeParent = Common.GetSizeOfParnet(this.node);
        var pos = this.node.getPosition();
        var x, y, w, h;
        x = pos.x;
        y = pos.y;

        if (isX == true) {
            switch (this._sizeTypeX) {
                case RectSizeType.MATCH_CONTENT:
                    {
                        this.width = this.node.getContentSize().width;
                        this.height = this.node.getContentSize().height;
                    }
                    break;
                case RectSizeType.MATCH_PARENT:
                    {
                        w = sizeParent.width - this.offsetMin.x - this.offsetMax.x;
                        //h = sizeParent.height - this.offsetMin.y - this.offsetMax.y;
                        h = this.node.getContentSize().height;
                        this.width = w;
                        this.height = h;
                        this.node.setContentSize(new cc.size(w, h));
                        x = this.offsetMin.x / 2 - this.offsetMax.x / 2;
                        y = this.offsetMin.y / 2 - this.offsetMax.y / 2;
                    }
                    break;

            }
        } else {
            switch (this._sizeTypeY) {
                case RectSizeType.MATCH_CONTENT:
                    {
                        this.width = this.node.getContentSize().width;
                        this.height = this.node.getContentSize().height;
                    }
                    break;
                case RectSizeType.MATCH_PARENT:
                    {
                        //w = sizeParent.width - this.offsetMin.x - this.offsetMax.x;
                        h = sizeParent.height - this.offsetMin.y - this.offsetMax.y;
                        w = this.node.getContentSize().width;
                        this.width = w;
                        this.height = h;
                        this.node.setContentSize(new cc.size(w, h));
                        x = this.offsetMin.x / 2 - this.offsetMax.x / 2;
                        y = this.offsetMin.y / 2 - this.offsetMax.y / 2;
                    }
                    break;

            }
        }





        this.node.setPosition(x, y, 0);
    },

});
// cc.RectTransform = module.export = RectTransform;

