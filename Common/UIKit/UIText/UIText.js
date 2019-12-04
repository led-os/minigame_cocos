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
        text: cc.Label,
    },


    onLoad: function () {

        this.Init();
    },

    Init: function () {

    },



});

cc.UIText = module.export = UIText;



