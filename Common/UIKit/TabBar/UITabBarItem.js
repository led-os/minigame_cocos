var UIView = require("UIView");
var UIViewController = require("UIViewController");
var UITabBarItem = cc.Class({
    extends: UIView,

    properties: {
        index: 0,
        sprite: cc.Sprite,
    },
    test: function () {
        cc.log("run test");

    },

});


var TabBarItemInfo = cc.Class({
    extends: cc.Object,
    properties: {
        title: 'title',
        controller: UIViewController,
    },
}); 