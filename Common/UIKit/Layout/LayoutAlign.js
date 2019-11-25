// var Common = require("Common");

// var AlignType = cc.Enum({
//     //区分大小写
//     NONE: 0,
//     UP: 1,
//     DOWN: 2,
//     LEFT: 3,
//     RIGHT: 4,
//     UP_LEFT: 5,
//     UP_RIGHT: 6,
//     DOWN_LEFT: 7,
//     DOWN_RIGHT: 8,

// });

//对齐
var LayoutAlign = cc.Class({
    extends: cc.Component,

    statics: {
        //enum 

    },

    properties: {
        _alignType: cc.Align.NONE,
        alignType: {
            //default 和 get set 不能同时存在
            // default:AlignType.UP, 
            type: cc.Align,
            get: function () {
                return this._alignType;
            },
            set: function (value) {
                return this.UpdateType(value);
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
                this.LayOut();
            },
        },
    },




    onLoad: function () {
        this.LayOut();
    },

    start: function () {
        this.LayOut();
    },

    LayOut: function () {
        this.UpdateType(this.alignType);
    },
    UpdateType: function (type) {
        this._alignType = type;
        if (type == cc.Align.NONE) {
            return;
        }
        var x, y, w, h;
        //var rectParent = this.node.parent.getBoundingBox();
        //var sizeParent = this.node.parent.getContentSize();
        var rctranParent = this.node.getComponent(cc.RectTransform);
        var w_parent = 0;
        var h_parent = 0;
        if (rctranParent != null) {
            w_parent = rctranParent.width;
            h_parent = rctranParent.height;
        }
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
        cc.Debug.Log("UpdateType this.alignType=" + this._alignType + " w=" + w + " h=" + h + " x=" + x + " y=" + y + " w_parent=" + w_parent + " h_parent=" + h_parent);
        //Common.appSceneMain.sizeCanvas.height 
        switch (this._alignType) {
            case cc.AlignUP:
                {
                    x = this.node.getPosition().x;
                    y = h_parent / 2 - h / 2 - this.offsetMax.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.AlignDOWN:
                {
                    x = this.node.getPosition().x;
                    y = -h_parent / 2 + h / 2 + this.offsetMin.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.AlignLEFT:
                {
                    x = -w_parent / 2 + w / 2 + this.offsetMin.x;
                    y = this.node.getPosition().y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.AlignRIGHT:
                {
                    x = w_parent / 2 - w / 2 - this.offsetMax.x;
                    y = this.node.getPosition().y;
                    this.node.setPosition(x, y, 0);
                }
                break;

            case cc.AlignUP_LEFT:
                {
                    //x = this.node.getPosition().x;
                    x = -w_parent / 2 + w / 2 + this.offsetMin.x;
                    y = h_parent / 2 - h / 2 - this.offsetMax.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.AlignUP_RIGHT:
                {
                    x = w_parent / 2 - w / 2 - this.offsetMax.x;
                    y = h_parent / 2 - h / 2 - this.offsetMax.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.AlignDOWN_LEFT:
                {
                    x = -w_parent / 2 + w / 2 + this.offsetMin.x;
                    y = -h_parent / 2 + h / 2 + this.offsetMin.y;
                    this.node.setPosition(x, y, 0);
                }
                break;
            case cc.AlignDOWN_RIGHT:
                {
                    x = w_parent / 2 - w / 2 - this.offsetMax.x;
                    y = -h_parent / 2 + h / 2 + this.offsetMin.y;
                    this.node.setPosition(x, y, 0);
                }
                break;

        }
    },

});

cc.LayoutAlign = module.export = LayoutAlign; 
