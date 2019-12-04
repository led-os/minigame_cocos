var UIView = require("UIView");


var UIImage = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UIImage/UIImage",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        image: cc.Sprite,
    },


    onLoad: function () {
        this.Init();
    },

    Init: function () {

    },



});

cc.UIImage = module.export = UIImage;



