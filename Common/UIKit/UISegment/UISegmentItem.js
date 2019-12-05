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
        textTitle: cc.UIText,
        text:
        {
            get: function () {
                return this.label.string;
            },
            set: function (value) {
                //this._text = value;
                this.label.string = value;
                this.LayOut();
            },
        },

        fontSize: {
            get: function () {
                return this.label.fontSize;
            },
            set: function (value) {
                this.label.fontSize = value;
                this.label.lineHeight = value;
                this.LayOut();
            },
        },
        color: {
            get: function () {
                return this.label.node.color;
            },
            set: function (value) {
                this.label.node.color = value;
            },
        },
    },


    onLoad: function () {
        this._super();
    },

    LayOut: function () {
        this._super();
    },

});

cc.UISegmentItem = module.export = UISegmentItem;



