var UIViewController = require("UIViewController");
// var UIGameItem = require("UIGameItem");
var UIView = require("UIView");
var GameBase = require("GameBase");

//shu： wx621ff1107207384c
//weixin小程序appid: heng: wx2c5d3abfad26e8b1
//cocos: wx6ac3f5090a6b99c5
//weixin test app：wx844d0aa648111acb
var GameCaiCaiLe = cc.Class({
    extends: GameBase,
    statics: {

    },

    properties: {
    },
    //百度tts:  http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=你要转换的文字 
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

    },

    Init: function () {
    },


    LayOut() {
        var x, y, w, h;
    },

});
