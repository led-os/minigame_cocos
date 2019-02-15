var UIHomeBase = require("UIHomeBase");
var TextureCache = require("TextureCache");
var AppRes = require("AppRes");
var LayoutScale = require("LayoutScale");
var Common = require("Common");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");
//var NaviViewController = require("NaviViewController"); 
var Language = require("Language");

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
 
    },

    LayOut: function () { 
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

