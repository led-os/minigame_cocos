var UIView = require("UIView");
//var LayoutAlign = require("LayoutAlign");

var RectSizeType = cc.Enum({
    //区分大小写
    MATCH_PARENT: 0,//和父节点一样大
    MATCH_CONTENT: 1,//按内容大小

});

var RectTransform = cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/Layout/RectTransform",
        help: " ",
        // inspector: ' ',
    },

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
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
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
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },


        //     The normalized position in the parent RectTransform that the lower left corner
        //     is anchored to.
        _anchorMin: cc.Vec2,
        anchorMin:
        {
            type: cc.Vec2,
            get: function () {
                return this._anchorMin;
            },
            set: function (value) {
                this._anchorMin = value;
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },

        //     The normalized position in the parent RectTransform that the upper right corner
        //     is anchored to.
        _anchorMax: cc.Vec2,
        anchorMax:
        {
            type: cc.Vec2,
            get: function () {
                return this._anchorMax;
            },
            set: function (value) {
                this._anchorMax = value;
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },



        //     The position of the pivot of this RectTransform relative to the anchor reference
        //     point. 
        _anchoredPosition: cc.Vec2,
        anchoredPosition:
        {
            type: cc.Vec2,
            get: function () {
                return this._anchoredPosition;
            },
            set: function (value) {
                this._anchoredPosition = value;
            },
        },


        _alignType: cc.Align.NONE,
        alignType: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: cc.Align,
            get: function () {
                return this._alignType;
            },
            set: function (value) {
                return this.UpdateAlign(value);
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
        this.width = this._width;
        this.height = this._height;
        this.LayOut();

    },

    start: function () {
        this.LayOut();
    },

    LayOut: function () {
        this.UpdateType(this.sizeTypeX, true);
        this.UpdateType(this.sizeTypeY, false);

        var x, y, w, h;
        w = this.node.getContentSize().width;
        h = this.node.getContentSize().height;
        //cc.Debug.Log("OnResize w=" + w + " h=" + h);

        var children = this.node._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var rctran = child.getComponent(RectTransform);
            if (rctran != null) {
                // cc.Debug.Log("OnResize child");
                rctran.LayOut();
            }

        }

        //align
        // var lA = this.node.getComponent(LayoutAlign);
        // if (lA != null) {
        //     lA.UpdateType(lA.alignType);
        // }

        this.UpdateAlign(this.alignType);

        var view = this.node.getComponent(UIView);
        if (view != null) {
            // cc.Debug.Log("OnResize child");
            view.LayOutDidFinish();
        }
    },

    UpdateType: function (type, isX) {
        if (isX == true) {
            this._sizeTypeX = type;
        } else {
            this._sizeTypeY = type;
        }
        var sizeParent = cc.Common.GetSizeOfParnet(this.node);
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
                        // y += this.offsetMin.y / 2 - this.offsetMax.y / 2;
                        this.node.setPosition(x, y, 0);
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
                        //x += this.offsetMin.x / 2 - this.offsetMax.x / 2;
                        y = this.offsetMin.y / 2 - this.offsetMax.y / 2;
                        this.node.setPosition(x, y, 0);
                    }
                    break;

            }
        }

        //this.node.setPosition(x, y, 0);
    },
    UpdateSize: function (w,h) {
        this.width = w;
        this.height =h;
        this.node.setContentSize(w,h);
    },

    UpdateAlign: function (type) {
        this._alignType = type;
        if (type == cc.Align.NONE) {
            return;
        }
        var x, y, w, h;
        var rectParent = this.node.parent.getBoundingBox();
        var sizeParent = this.node.parent.getContentSize();
        var w_parent = rectParent.width;
        var h_parent = rectParent.height;
        w_parent = sizeParent.width;
        h_parent = sizeParent.height;
        var sizeCanvas = cc.Common.GetSizeCanvas(null);//屏幕分辨率
        if (w_parent == 0) {
            w_parent = sizeCanvas.width;
        }
        if (h_parent == 0) {
            h_parent = sizeCanvas.height;
        }


        var size = this.node.getContentSize();
        w = size.width;
        h = size.height;
        x = this.node.getPosition().x;
        y = this.node.getPosition().y;
        //cc.Debug.Log("UpdateType this.alignType=" + this._alignType + " w=" + w + " h=" + h + " x=" + x + " y=" + y + " w_parent=" + w_parent + " h_parent=" + h_parent);
        //Common.appSceneMain.sizeCanvas.height 
        switch (this._alignType) {
            case cc.Align.UP:
                {
                    x = this.node.getPosition().x;
                    y = h_parent / 2 - h / 2 - this.offsetMax.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.Align.DOWN:
                {
                    x = this.node.getPosition().x;
                    y = -h_parent / 2 + h / 2 + this.offsetMin.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.Align.LEFT:
                {
                    x = -w_parent / 2 + w / 2 + this.offsetMin.x;
                    y = this.node.getPosition().y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.Align.RIGHT:
                {
                    x = w_parent / 2 - w / 2 - this.offsetMax.x;
                    y = this.node.getPosition().y;
                    this.node.setPosition(x, y, 0);
                }
                break;

            case cc.Align.UP_LEFT:
                {
                    //x = this.node.getPosition().x;
                    x = -w_parent / 2 + w / 2 + this.offsetMin.x;
                    y = h_parent / 2 - h / 2 - this.offsetMax.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.Align.UP_RIGHT:
                {
                    x = w_parent / 2 - w / 2 - this.offsetMax.x;
                    y = h_parent / 2 - h / 2 - this.offsetMax.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.Align.DOWN_LEFT:
                {
                    x = -w_parent / 2 + w / 2 + this.offsetMin.x;
                    y = -h_parent / 2 + h / 2 + this.offsetMin.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.Align.DOWN_RIGHT:
                {
                    x = w_parent / 2 - w / 2 - this.offsetMax.x;
                    y = -h_parent / 2 + h / 2 + this.offsetMin.y;
                    this.node.setPosition(x, y, 0);
                }
                break;

        }
    },
});
cc.RectTransform = module.export = RectTransform;

