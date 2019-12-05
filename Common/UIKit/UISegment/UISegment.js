var UIView = require("UIView");
var UIText = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UIText/UIText",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        label: cc.Label,

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

        this.Init();
    },

    Init: function () {

    },



});

cc.UIText = module.export = UIText;



