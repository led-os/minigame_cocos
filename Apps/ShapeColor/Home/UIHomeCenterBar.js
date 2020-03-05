var UIView = require("UIView");
var AppRes = require("AppRes");
var GameShapeColor = require("GameShapeColor");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");

cc.Class({
    extends: UIView,
    properties: {
        indexAction: 0,
        timeAction: 0.3,
        isActionFinish: false,
        btnLearn: cc.UIButton,
        btnAdVideo: cc.UIButton,
        btnAddLove: cc.UIButton,

        btnShape: cc.UIButton,
        btnColor: cc.UIButton,
        btnShapeColor: cc.UIButton,
 

    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        this.btnLearn.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_LEARN,
            success: function () {
            }.bind(this),
        });

        this.btnAdVideo.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_VIDEO,
            success: function () {
            }.bind(this),
        });


        this.btnAddLove.UpdateImage({
            bg: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_LOVE,
            success: function () {
            }.bind(this),
        });

        this.LayOut();

    },

    start: function () {
        this.LayOut();
    },
    LayOut: function () {
        this._super();
        var size = this.node.getContentSize();
        var x, y, w, h;
        var ly = this.node.getComponent(cc.LayOutGrid);
        var rctran = this.node.getComponent(cc.RectTransform);
        cc.Debug.Log("UIHomeCenterBar  w=  " + rctran.width + " h=" + rctran.height);
        if (ly != null) {
            ly.col = cc.LayoutUtil.main().GetChildCount(this.node, false);
            cc.Debug.Log("GetItemPostion ly.col =" + ly.col);
            //有些按钮隐藏后重新布局
            ly.LayOut();
        }

    },

    
    GotoGameByMode: function (mode) {
        cc.GameManager.gameMode = mode;
        cc.LevelManager.main().StartParsePlace(function () {
            this.GotoGameByModeInteranl();
        }.bind(this)
        );
    },
    GotoGameByModeInteranl: function () { 
        if (this.controller != null) {
            var navi = this.controller.naviController;
            var total = cc.LevelManager.main().placeTotal;
            // total = 0;
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

    OnClickBtnLearn: function (event, customEventData) {
    },
    OnClickBtnAddLove: function (event, customEventData) {
    },

    OnClickBtnAdVideo: function (event, customEventData) {
    },

    OnClickBtnShape: function (event, customEventData) {

        ////3.主动拉起分享接口
        // cc.loader.loadRes(cc.AppRes.IMAGE_HOME_BG, function (err, data) {
        //     console.log("share image=" + data.url);
        //     wx.shareAppMessage({
        //         title: "经典打飞机游戏始终好玩如初，来吧！一起回味经典的乐趣。",
        //         imageUrl: data.url,
        //         success(res) {
        //             console.log(res)
        //         },
        //         fail(res) {
        //             console.log(res)
        //         }
        //     })
        // }); pp

        // if (!this.isActionFinish) {
        //    // return;
        // }
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE);



        // let score = "60";
        // cc.Debug.Log("OnGameWin score="+score);
        // cc.FrendBoard.main().SaveData(score);

    },
    OnClickBtnColor: function (event, customEventData) {
      
        this.GotoGameByMode(GameShapeColor.GAME_MODE_COLOR);

        // let score = '' + 50;
        // cc.FrendBoard.main().SaveData(score);
    },
    OnClickBtnShapeColor: function (event, customEventData) {
     
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE_COLOR);
    },

});

