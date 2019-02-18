var UIViewController = require("UIViewController");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var UIGameBase = require("UIGameBase");
var Language = require("Language");
var GameShapeColor = require("GameShapeColor");
var GameManager = require("GameManager");
var ShapeColorItemInfo = require("ShapeColorItemInfo");


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
    },
    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        this.LoadGamePrefab();
        this.StartParseShape();
        this.StartParseColor();
    },

    // Init: function () {
    // },

    CreateGame: function () {
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameShapeColor);
        this.game.node.parent = this.node;
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
            // JsonData item = items[i];
            // info.id = (string)item["id"];
            // //string picdir = Common.GAME_RES_DIR + "/image/" + info.id;
            // string picdir = Common.GAME_RES_DIR + "/image/" + info.id;
            // if (Common.appKeyName != AppType.SHAPECOLOR) {
            //     picdir = Common.GAME_RES_DIR + "/image/" + strPlace;

            // }
            // info.pic = picdir + "/" + info.id + ".png";
            // info.picInner = picdir + "/" + info.id + "_inner.png";
            // info.picOuter = picdir + "/" + info.id + "_outer.png";
            // if (Common.appKeyName != AppType.SHAPECOLOR) {
            //     info.picInner = info.pic;
            //     info.picOuter = info.pic;
            // }
            // listShape.Add(info);
            // listGuanka.Add(info);
        }

    },
    ParseColor: function (json) {
        if ((this.listColor != null) && (this.listColor.length != 0)) {
            return;
        }


        var idx = GameManager.placeLevel;
        // string json = Encoding.UTF8.GetString(data);
        // // Debug.Log("json::"+json);
        // JsonData root = JsonMapper.ToObject(json);
        // JsonData items = root["list"];
        // for (int i = 0; i < items.Count; i++)
        // {
        //     ShapeColorItemInfo info = new ShapeColorItemInfo();
        //     JsonData item = items[i];
        //     info.id = (string)item["id"];
        //     info.color = Common.RGBString2Color((string)item["color"]);
        //     listColor.Add(info);
        // }

    },

});
