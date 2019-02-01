var UIView = require("UIView");
var PopViewController = require("PopViewController");
cc.Class({
    extends: UIView,
    properties: {
        btnBack: {
            default: null,
            type: cc.Button
        },
    },

    onLoad: function () { 
    },

    OnClickBtnBack: function (event, customEventData) { 
        cc.log("UISetting OnClickBtnBack");
       this.controller.Close();
    },
});

