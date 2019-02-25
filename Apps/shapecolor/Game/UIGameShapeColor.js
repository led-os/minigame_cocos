var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameShapeColor = require("GameShapeColor");
var AppType = require("AppType");
//var LoadItemInfo = require("LoadItemInfo");

var UIGameShapeColor = cc.Class({
    extends: UIGameBase,
    properties: {
    
        btnBack: {
            default: null,
            type: cc.Button
        },
        game: {
            default: null,
            type: GameShapeColor
        },

        listShape: {
            default: [],
            type: cc.Object
        },
        listColor: {
            default: [],
            type: cc.Object
        },
        listBg: {
            default: [],
            type: cc.Object
        },

    },
    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
   
        this.LoadGamePrefab();
        //var ev = this.node.addComponent(cc.UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent;
    },
    start: function () {

    },

    // void Start()
    // {
    //     UpdateGuankaLevel(GameManager.gameLevel);
    //     LayOut();
    // }

    // Init: function () {
    // },

    CreateGame: function () {
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameShapeColor);
        this.game.node.parent = this.node;

        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;

        //shape
        {
            this.StartParseShape();
        }
        //color
        {
            this.StartParseColor();
        }
        //bglist
        {
            this.StartParseBgList();
        }

    },

    UpdateGuankaLevel: function (level) {
        cc.log("UIGameShapeColor::UpdateGuankaLevel");
        this.game.listShape = this.listShape;
        this.game.listColor = this.listColor;

        this.game.LoadGame(cc.GameManager.gameMode);
    },

    CheckAllLoad: function () {
        cc.log("UIGameShapeColor::CheckAllLoad");
        if (cc.Common.CheckAllLoad(this.listProLoad) == true) {
            this.UpdateGuankaLevel(cc.GameManager.gameLevel);
        }
    },


    ParseGuanka: function () {
        cc.log("ParseGuanka UIGameShapeColor");
        return 0;
    },

    StartParseShape: function () {


        var info = new cc.LoadItemInfo();
        info.id = this.shapeId = "shape";
        info.isLoad = false;
        this.listProLoad.push(info);

        var filepath = cc.Common.GAME_RES_DIR + "/guanka/shape_list_place" + cc.GameManager.placeLevel + ".json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
            }
            if (err == null) {
                var infoload = cc.Common.GetLoadItemById(this.listProLoad, info.id);
                if (infoload != null) {
                    infoload.isLoad = true;
                }
                this.ParseShape(rootJson.json);
            }
        }.bind(this));

    },

    StartParseColor: function () {

        var info = new cc.LoadItemInfo();
        info.id = this.colorId = "color";
        info.isLoad = false;
        this.listProLoad.push(info);

        var filepath = cc.Common.GAME_RES_DIR + "/guanka/color.json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
            }
            if (err == null) {
                var infoload = cc.Common.GetLoadItemById(this.listProLoad, info.id);
                if (infoload != null) {
                    infoload.isLoad = true;
                }

                this.ParseColor(rootJson.json);
            }
        }.bind(this));

    },
    StartParseBgList: function () {


        var info = new cc.LoadItemInfo();
        info.id = this.bglistId = "bglist";
        info.isLoad = false;
        this.listProLoad.push(info);

        var filepath = cc.Common.GAME_RES_DIR + "/image_bg/bg.json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
            }
            if (err == null) {
                var infoload = cc.Common.GetLoadItemById(this.listProLoad, info.id);
                if (infoload != null) {
                    infoload.isLoad = true;
                }
                this.ParseBgList(rootJson.json);
            }
        }.bind(this));

    },
    ParseShape: function (json) {
        if ((this.listShape != null) && (this.listShape.length != 0)) {
            return;
        }
        var idx = cc.GameManager.placeLevel;
        var strPlace = json.place;
        var items = json.list;
        if (items == null) {
            items = json.items;
        }

        for (var i = 0; i < items.length; i++) {
            var info = new cc.ShapeColorItemInfo();
            var item = items[i];
            info.id = item.id;
            var picdir = cc.Common.GAME_RES_DIR + "/image/" + info.id;
            if (cc.Config.main().appKeyName != cc.AppType.SHAPECOLOR) {
                picdir = cc.Common.GAME_RES_DIR + "/image/" + strPlace;

            }
            info.pic = picdir + "/" + info.id + ".png";
            info.picInner = picdir + "/" + info.id + "_inner.png";
            info.picOuter = picdir + "/" + info.id + "_outer.png";
            if (cc.Config.main().appKeyName != cc.AppType.SHAPECOLOR) {
                info.picInner = info.pic;
                info.picOuter = info.pic;
            }
            this.listShape.push(info);
            this.listGuanka.push(info);
        }

        this.CheckAllLoad();
    },
    ParseColor: function (json) {
        if ((this.listColor != null) && (this.listColor.length != 0)) {
            return;
        }
        var idx = cc.GameManager.placeLevel;
        var items = json.list;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ShapeColorItemInfo();
            var item = items[i];
            info.id = item.id;
            info.color = cc.Common.RGBString2Color(item.color);
            cc.log("i="+i+" info.color="+info.color+" item.color="+item.color);
            this.listColor.push(info);
        }
        this.CheckAllLoad();
    },
    ParseBgList: function (json) {
        if ((this.listBg != null) && (this.listBg.length != 0)) {
            return;
        }
        var items = json.list;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ShapeColorItemInfo();
            var item = items[i];
            var strdir = cc.Common.GAME_RES_DIR + "/image_bg";
            info.pic = strdir + "/" + item.pic;
            var colorFilter = item.color_filter;
            for (var j = 0; j < colorFilter.length; j++) {
                var itemtmp = colorFilter[j];
                var infotmp = new cc.ShapeColorItemInfo();
                infotmp.id = itemtmp.color_id;
                info.listColorFilter.push(infotmp);

            }
            this.listBg.push(info);
        }

        this.CheckAllLoad();
    }

});
