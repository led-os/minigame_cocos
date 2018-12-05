var UIView = require("UIView");
var UIViewController = require("UIViewController");
var UITabBarItem = cc.Class({
    extends: UIView,

    properties: {
        index: 0,
        sprite: cc.Sprite,
        textTitle: cc.Label,
    },

    //TabBarItemInfo
    UpdateItem: function (info) { 
        this.textTitle.string = info.title;
    }

});


var TabBarItemInfo = cc.Class({
    extends: cc.Object,
    properties: {
        title: 'title',
        pic: 'pic',
        controller: {
            default: null,
            type: UIViewController,
        },
    },
}); 