var UIHomeBase = require("UIHomeBase");
var AppRes = require("AppRes");
//var LayoutScale = require("LayoutScale");
// var Common = require("Common");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");
//var NaviViewController = require("NaviViewController"); 
var GameShapeColor = require("GameShapeColor");

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
    GotoGameByMode: function (mode) {
        //AudioPlay.main.PlayFile(AppCommon.AUDIO_BTN_CLICK);
        cc.GameManager.gameMode = mode;
        //cc.GameManager.placeLevel = mode;
        if (this.controller != null) {
            var navi = this.controller.naviController;
            var total = cc.GameManager.placeTotal;
            if (cc.Config.main().appKeyName != cc.AppType.SHAPECOLOR) {
                total = 0;
            }
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

    OnClickBtnShape: function (event, customEventData) {
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE);
    },
    OnClickBtnColor: function (event, customEventData) {
        this.GotoGameByMode(GameShapeColor.GAME_MODE_COLOR);
    },
    OnClickBtnShapeColor: function (event, customEventData) {
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE_COLOR);
    },
    OnClickBtnBoard: function (event, customEventData) {
    },
});

