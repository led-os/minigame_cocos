var UIView = require("UIView");
// var Common = require("Common");
cc.Class({
    extends: UIView,
    properties: {

    },

    onLoad: function () {
        this._super();
    },

    OnClickBtnBack: function (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },
});

