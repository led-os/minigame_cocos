
var LayOutElement = cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutElement",
        help: " ",
        // inspector: ' ',
    },

    properties: {
        ignoreLayout: false,
    },

});

cc.LayOutElement = module.export = LayOutElement; 
