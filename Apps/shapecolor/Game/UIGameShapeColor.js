var UIViewController = require("UIViewController");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var UIGameBase = require("UIGameBase");
var Language = require("Language");
var GameShapeColor = require("GameShapeColor");
var GameManager = require("GameManager");
var ShapeColorItemInfo = require("ShapeColorItemInfo");
var AppType = require("AppType");
var LoadItemInfo = require("LoadItemInfo");

var UIGameShapeColor = cc.Class({
    extends: UIGameBase,
    properties: {
        imageBg: cc.Sprite,
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

        listProLoad: {
            default: [],
            type: LoadItemInfo
        },

    },
    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        this.LoadGamePrefab();


        //shape
        {
            var info = new LoadItemInfo();
            info.id = "shape";
            info.isLoad = false;
            this.listProLoad.push(info);
            this.StartParseShape();
        }
        //color
        {
            var info = new LoadItemInfo();
            info.id = "color";
            info.isLoad = false;
            this.listProLoad.push(info);
            this.StartParseColor();
        }
        //bglist
        {
            var info = new LoadItemInfo();
            info.id = "bglist";
            info.isLoad = false;
            this.listProLoad.push(info);
            this.StartParseBgList();
        }

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
    },

    UpdateGuankaLevel: function (level) {
    },

    CheckAllLoad: function () {
        if (Common.CheckAllLoad(this.listProLoad) == true) {
            this.UpdateGuankaLevel(GameManager.gameLevel);
        }
    },


    ParseGuanka: function () {
        cc.log("ParseGuanka UIGameShapeColor");
        return 0;
    },

    StartParseShape: function () {
        var filepath = Common.GAME_RES_DIR + "/guanka/shape_list_place" + GameManager.placeLevel + ".json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
            }
            if (err == null) {
                this.ParseShape(rootJson.json);
            }
        }.bind(this));

    },

    StartParseColor: function () {
        var filepath = Common.GAME_RES_DIR + "/guanka/color.json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
            }
            if (err == null) {
                this.ParseColor(rootJson.json);
            }
        }.bind(this));

    },
    StartParseBgList: function () {
        var filepath = Common.GAME_RES_DIR + "/image_bg/bg.json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
            }
            if (err == null) {
                this.ParseBgList(rootJson.json);
            }
        }.bind(this));

    },
    ParseShape: function (json) {
        if ((this.listShape != null) && (this.listShape.length != 0)) {
            return;
        }
        var idx = GameManager.placeLevel;
        var strPlace = json.place;
        var items = json.list;
        if (items == null) {
            items = json.items;
        }

        for (var i = 0; i < items.length; i++) {
            var info = new ShapeColorItemInfo();
            var item = items[i];
            info.id = items.id;
            var picdir = Common.GAME_RES_DIR + "/image/" + info.id;
            if (Config.main().appKeyName != AppType.SHAPECOLOR) {
                picdir = Common.GAME_RES_DIR + "/image/" + strPlace;

            }
            info.pic = picdir + "/" + info.id + ".png";
            info.picInner = picdir + "/" + info.id + "_inner.png";
            info.picOuter = picdir + "/" + info.id + "_outer.png";
            if (Config.main().appKeyName != AppType.SHAPECOLOR) {
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
        var idx = GameManager.placeLevel;
        var items = json.list;
        for (var i = 0; i < items.length; i++) {
            var info = new ShapeColorItemInfo();
            var item = items[i];
            info.id = item.id;
            info.color = Common.RGBString2Color(item.color);
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
            var info = new ShapeColorItemInfo();
            var item = items[i];
            var strdir = Common.GAME_RES_DIR + "/image_bg";
            info.pic = strdir + "/" + item.pic;
            var colorFilter = item.color_filter;
            for (var j = 0; j < colorFilter.length; j++) {
                var itemtmp = colorFilter[j];
                var infotmp = new ShapeColorItemInfo();
                infotmp.id = itemtmp.color_id;
                info.listColorFilter.push(infotmp);

            }
            this.listBg.push(info);
        }

        this.CheckAllLoad();
    }

});
