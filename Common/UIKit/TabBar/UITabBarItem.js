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

        //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
        cc.loader.loadRes(info.pic, cc.Texture2D, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.log("UITabBarItem loadRes  fail");
                cc.log(err.message || err);
                return;
            }
            cc.log("UITabBarItem loadRes  ok");
            this.sprite.spriteFrame = new cc.SpriteFrame(tex);
            // this.sprite.spriteFrame.setTexture(tex);
        }.bind(this));
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