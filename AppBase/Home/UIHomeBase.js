var UIView = require("UIView");
var Common = require("Common");
var TextureCache = require("TextureCache");
var AppRes = require("AppRes");

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
        var x, y, w, h;
        // if(AppSceneBase.main==null){
        //     cc.log(" AppSceneBase.main size is null");
        // }else{
        //     cc.log(" AppSceneBase.main size is not null");
        // }
        w = Common.appSceneBase.sizeCanvas.width;
        var size = this.objTopBar.getContentSize();
        h = size.height;
        y = Common.appSceneBase.sizeCanvas.height / 2 - h / 2;
        this.objTopBar.setContentSize(cc.size(w, h));
        this.objTopBar.setPosition(0, y, 0);


        cc.log("objTopBar size=" + size);
        size = this.objLayoutBtn.getContentSize();
        h = size.height;
        y = -Common.appSceneBase.sizeCanvas.height / 2 + h / 2;
        this.objLayoutBtn.setContentSize(cc.size(w, h));
        this.objLayoutBtn.setPosition(0, y, 0);

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


        cc.log("objLayoutBtn size=" + size);
    },

    LayOut: function () {
        var size = this.imageBg.node.getContentSize();
        var x = size.width;
        var y = size.height;
        var scale = Common.GetMaxFitScale(x, y, Common.appSceneBase.sizeCanvas.width, Common.appSceneBase.sizeCanvas.height); 
        this.imageBg.node.scaleX = scale;
        this.imageBg.node.scaleY = scale;
    },

});

