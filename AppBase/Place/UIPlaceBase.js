var UIView = require("UIView");

cc.Class({
    extends: UIView,
    properties: {

    },

    onLoad: function () {

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

