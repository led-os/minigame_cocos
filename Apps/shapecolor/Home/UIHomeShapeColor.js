var UIHomeBase = require("UIHomeBase");
var TextureCache = require("TextureCache");
var AppRes = require("AppRes");
var LayoutScale = require("LayoutScale");
var Common = require("Common");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");
//var NaviViewController = require("NaviViewController"); 

cc.Class({
    extends: UIHomeBase,
    properties: {
        btnShape: {
            default: null,
            type: cc.Button
        },
        btnColor: {
            default: null,
            type: cc.Button
        },
        btnShapeColor: {
            default: null,
            type: cc.Button
        },
        btnBoard: {
            default: null,
            type: cc.Button
        },
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        this.UnifyButtonSprite(this.btnShape);
        this.UnifyButtonSprite(this.btnColor);
        this.UnifyButtonSprite(this.btnShapeColor);
        this.UnifyButtonSprite(this.btnBoard);

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
       // LayoutScale.ScaleImage(this.imageBg, true);
    },


    OnClickBtnShape: function (event, customEventData) { 
        if (this.controller != null) {
            var navi = this.controller.naviController;
            var total = 2;//GameManager.placeTotal;
            if (total > 1) {
                if (navi != null) {
                    navi.Push(PlaceViewController.main());
                }

            }
            else {
                navi.Push(GuankaViewController.main());
            }
        }

    },
    OnClickBtnColor: function (event, customEventData) {
    },
    OnClickBtnShapeColor: function (event, customEventData) {
    },
    OnClickBtnBoard: function (event, customEventData) {
    },
});

