// var Common = require("Common");

var LayoutScaleType = cc.Enum({
    //区分大小写
    MIN: 0,
    MAX: 1,

});

var LayoutScale = cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayoutScale",
        help: " ",
        // inspector: ' ',
    },
    statics: {
        //enum
        LayoutScaleType: LayoutScaleType,

        ScaleImage: function (image, isMaxFit) {
            // LayoutScale.ScaleNode(image.node, isMaxFit);
        },



    },

    properties: {

        _scaleType: LayoutScaleType.MIN,
        scaleType: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            type: LayoutScaleType,
            get: function () {
                return this._scaleType;
            },
            set: function (value) {
                this._scaleType = value;
                return this.LayOut();
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


        ratio: 1,
    },

    onLoad: function () {
        this.LayOut();
    },
    LayOut: function () {
        this.UpdateType(this.scaleType);
    },

    UpdateType: function (type) {
        this._scaleType = type;
        switch (this._scaleType) {
            case LayoutScaleType.MIN:
                {
                    this.ScaleNode(this.node, false);
                }
                break;
            case LayoutScaleType.MAX:
                {
                    this.ScaleNode(this.node, true);
                }
                break;

        }
    },

    ScaleNode: function (node, isMaxFit) {
        var size = node.getContentSize();

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
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);

        w = size.width;
        h = size.height;

        var scale = 0;
        if (isMaxFit == true) {
            scale = cc.Common.GetMaxFitScale(w, h, w_parent, h_parent);
        } else {
            scale = cc.Common.GetBestFitScale(w, h, w_parent, h_parent);
        }
        scale = scale*this.ratio;
        node.scaleX = scale;
        node.scaleY = scale;
    },

});

cc.LayoutScale = module.export = LayoutScale; 