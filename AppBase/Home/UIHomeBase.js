var UIView = require("UIView");
// var Common = require("Common"); 
//var LayoutScale = require("LayoutScale");
//var Language = require("Language");
var GameViewController = require("GameViewController");

cc.Class({
    extends: UIView,
    properties: {
        btnAdVideo: {
            default: null,
            type: cc.Button
        },
        topBar: {
            default: null,
            type: cc.Node
        },
        layoutBtn: {
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
        var name = cc.Language.main().GetString("APP_NAME");
        this.textName.string = name;
        cc.Tts.Speak(name, true);

        var strImage = cc.AppRes.IMAGE_HOME_BG;
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);


            this.LayOut();
        }.bind(this));


        var x, y, w, h;
        w = 1024;
        var node = new cc.Node("hpText");
        this.labelTmp = node.addComponent(cc.Label); 
        this.labelTmp.fontSize = 100;
        this.labelTmp.string = name;
        this.labelTmp.overflow = cc.Label.Overflow.CLAMP;
        this.node.addChild(node);
        cc.log("labelTmp = " + this.labelTmp.node.getContentSize());
        h = this.imageNameBg.node.getContentSize().height;
        this.imageNameBg.node.setContentSize(w, h);
    },

    LayOut: function () {
        //  LayoutScale.ScaleImage(this.imageBg,true);

        var size = this.node.getContentSize();
        var x, y, w, h;
        //layoutbtn:
        x = 0;
        y = size.height / 4;

        this.imageNameBg.node.setPosition(x, y);

        //TextName
        size = this.textName.node.getContentSize();
        cc.log("size TextName= " + size);

        cc.log("labelTmp2 = " + this.labelTmp.node.getContentSize());
    },

});

