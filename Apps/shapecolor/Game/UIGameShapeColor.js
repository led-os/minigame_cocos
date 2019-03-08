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
        textTitle: cc.Label,

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
        isShowGame: false,
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



    CreateGame: function () {
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameShapeColor);
        this.game.node.parent = this.node;

        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        this.ParseGuankaInternal();
    },

    LanguageKeyOfShape: function (info) {
        var key = info.id;
        if (cc.Config.main().appKeyName == cc.AppType.SHAPECOLOR) {
            key = "SHAPE_TITLE_" + info.id;
        }
        return key;
    },

    StringOfGameStatus: function (status) {
        var str = "unknown" + status;
        switch (status) {
            case GameShapeColor.GAME_STATUS_UN_START:
                str = cc.Language.main().GetString("STR_GAME_STATUS_UN_START");
                break;
            case GameShapeColor.GAME_STATUS_PLAY:
                str = cc.Language.main().GetString("STR_GAME_STATUS_PLAY");
                break;
            case GameShapeColor.GAME_STATUS_FINISH:
                str = cc.Language.main().GetString("STR_GAME_STATUS_FINISH");
                break;
        }

        return str;
    },
    GameStatusOfShape: function (info) {
        var key = GameShapeColor.STR_KEY_GAME_STATUS_SHAPE + info.id;
        var status = cc.Common.GetIntOfKey(key, GameShapeColor.GAME_STATUS_UN_START);
        cc.Debug.Log("status=" + status);
        var str = this.StringOfGameStatus(status);
        return str;
    },
    GameStatusOfColor: function (info) {
        var key = GameShapeColor.STR_KEY_GAME_STATUS_COLOR + info.id;
        var status = cc.Common.GetIntOfKey(key, GameShapeColor.GAME_STATUS_UN_START);
        var str = this.StringOfGameStatus(status);
        return str;
    },
    ShapeTitleOfItem: function (info) {
        var key = this.LanguageKeyOfShape(info);
        var str = cc.Language.game().GetString(key);
        return str;
    },
    ColorTitleOfItem: function (info) {
        var str = cc.Language.game().GetString("COLOR_TITLE_" + info.id);
        return str;
    },



    UpdateGuankaLevel: function (level) {
        cc.Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        this.game.listShape = this.listShape;
        this.game.listColor = this.listColor;
        this.game.textTitle = this.textTitle;
        this.textTitle.node.active = false;
        this.game.LoadGame(cc.GameManager.gameMode);

        //imagebg
        // var url = "http://i1.bvimg.com/679362/29748b18acf1446a.png"
        //var url = cc.AppRes.URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg0.jpg";
        var url = cc.AppRes.URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg1.png";
        cc.TextureCache.main.Load(url, function (err, tex) {
            if (err) {

                cc.Debug.Log(err.message || err);
                return ret;
            }
            // cc.Debug.Log("TextureCache loadRes ok");

            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            lyscale.LayOut();

        }.bind(this));

    },

    CheckAllLoad: function () {
        cc.Debug.Log("UIGameShapeColor::CheckAllLoad this.isShowGame=" + this.isShowGame + " this.listGuanka=" + this.listGuanka.length);
        if (cc.Common.CheckAllLoad(this.listProLoad) == true) {
            if (this.callbackGuankaFinish != null) {
                cc.Debug.Log("UIGameShapeColor::CheckAllLoad callbackGuankaFinish this.listGuanka=" + this.listGuanka.length);
                this.callbackGuankaFinish();
            }

            if (this.isShowGame) {
                this.UpdateGuankaLevel(cc.GameManager.main().gameLevel);
            }
        }


    },
    CleanGuankaList: function () {
        if (this.listGuanka != null) {
            this.listGuanka.splice(0, this.listGuanka.length);
        }
        if (this.listColor != null) {
            this.listColor.splice(0, this.listColor.length);
        }
        if (this.listShape != null) {
            this.listShape.splice(0, this.listShape.length);
        }
        if (this.listBg != null) {
            this.listBg.splice(0, this.listBg.length);
        }

    },
    GetGuankaTotal: function () {
        // var count = this.ParseGuanka();
        var count = 0;
        if (this.listShape != null) {
            count = GameShapeColor.GUANKA_NUM_PER_ITEM * this.listShape.length;
        }
        return count;
    },

    ParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
        this.isShowGame = false;
        this.ParseGuankaInternal();
    },

    ParseGuankaInternal: function () {
        cc.Debug.Log("ParseGuanka UIGameShapeColor");
        //清空
        this.listProLoad.length = 0;
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
        return 0;
    },

    StartParseShape: function () {


        var info = new cc.LoadItemInfo();
        info.id = this.shapeId = "shape";
        info.isLoad = false;
        this.listProLoad.push(info);
        var idx = cc.GameManager.placeLevel;
        if (cc.Config.main().appKeyName == cc.AppType.SHAPECOLOR) {
            idx = 0;
        }
        var filepath = cc.Common.GAME_RES_DIR + "/guanka/shape_list_place" + idx + ".json";
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.Debug.Log("config:err=" + err);
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
                cc.Debug.Log("config:err=" + err);
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
                cc.Debug.Log("config:err=" + err);
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
            this.CheckAllLoad();
            return;
        }
        //var idx = cc.GameManager.placeLevel;
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
        cc.Debug.Log("config:this.listGuanka=" + this.listGuanka.length);
        this.CheckAllLoad();
    },
    ParseColor: function (json) {
        if ((this.listColor != null) && (this.listColor.length != 0)) {
            this.CheckAllLoad();
            return;
        }
        //var idx = cc.GameManager.placeLevel;
        var items = json.list;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ShapeColorItemInfo();
            var item = items[i];
            info.id = item.id;
            info.color = cc.Common.RGBString2Color(item.color);
            cc.Debug.Log("i=" + i + " info.color=" + info.color + " item.color=" + item.color);
            this.listColor.push(info);
        }
        this.CheckAllLoad();
    },
    ParseBgList: function (json) {
        if ((this.listBg != null) && (this.listBg.length != 0)) {
            this.CheckAllLoad();
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
