var UIView = require("UIView");
var UIViewController = require("UIViewController");
cc.Class({
    extends: UIView,
    index: 0,
    test: function () {
        cc.log("run test");

    },

});


var TabBarItemInfo = cc.Class({
    extends: cc.Object,
    title: 'title',
    controller: UIViewController,
}); 