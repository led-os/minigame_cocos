var UIView = require("UIView");
var Common = require("Common");
var TextureCache = require("TextureCache");
var AppRes = require("AppRes");
var LayoutScale = require("LayoutScale");

cc.Class({
    extends: UIView,
    properties: {
        btnAdVideo: {
            default: null,
            type: cc.Button
        },
        objTopBar: {
            default: null,
            type: cc.Node
        },
        objLayoutBtn: {
            default: null,
            type: cc.Node
        },

        imageBg: cc.Sprite,
        imageNameBg: cc.Sprite,
        textName: cc.Label,

    },

    onLoad: function () {
        this._super();
       // this.node.setContentSize(Common.appSceneMain.sizeCanvas); 
       this.node.setContentSize(this.node.parent.getContentSize());

        var x, y, w, h; 
        this.textName.string = "ImageNameText";

        var strImage = AppRes.IMAGE_HOME_BG;
        TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
        }.bind(this));


        strImage = "Common/UI/UIKit/barbg";
        TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.log(err.message || err);
                return;
            }
            this.imageNameBg.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
        }.bind(this));
 
    },

    LayOut: function () {
        LayoutScale.ScaleImage(this.imageBg,true);
    },

});

