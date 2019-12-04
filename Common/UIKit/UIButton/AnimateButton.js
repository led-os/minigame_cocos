

var AnimateButton = cc.Class({
    extends: cc.Button,
    editor: CC_EDITOR && {
        menu: "UIKit/UIButton/AnimateButton",
        help: " ",
        // inspector: ' ',
    },

    statics: {

    },
    properties: {

    },


    onLoad: function () {

    },



});

cc.AnimateButton = module.export = AnimateButton;



