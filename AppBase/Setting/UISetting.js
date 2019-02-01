var UIView = require("UIView");
var PopViewController = require("PopViewController");
var AppRes = require("AppRes");
var TextureCache = require("TextureCache");
var Common = require("Common");
var LayoutScale = require("LayoutScale");

cc.Class({
    extends: UIView,
    properties: {
        btnBack: {
            default: null,
            type: cc.Button
        },

        imageBg: cc.Sprite,
    },

    onLoad: function () { 

        var strImage = AppRes.IMAGE_HOME_BG;
        TextureCache.main.Load(strImage, function (err, tex) { 
            if (err) {
                cc.log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
        }.bind(this));

    },

    OnClickBtnBack: function (event, customEventData) { 
        cc.log("UISetting OnClickBtnBack");
       this.controller.Close();
    },

    
    LayOut: function () {
        LayoutScale.ScaleImage(this.imageBg,true);
    },
});

