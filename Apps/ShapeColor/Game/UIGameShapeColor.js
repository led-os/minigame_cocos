var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameShapeColor = require("GameShapeColor");
var AppType = require("AppType");
//var LoadItemInfo = require("LoadItemInfo");

var UIGameShapeColor = cc.Class({
    extends: UIGameBase,
    statics: {
        PLACE_MATH: "Math",
        languageColor: null,
    },

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
        this.LoadLanguageGame();
        this.LoadLanguageColor();
        // this.LoadGamePrefab();
        //var ev = this.node.addComponent(cc.UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent;
    },
    start: function () {

    },
    LoadLanguageColor: function () {
        var filepath = cc.Common.GAME_RES_DIR + "/language/language_color.csv";
        this.languageColor = new cc.Language();
        this.languageColor.Init2(filepath, this.LoadLanguageDidFinish.bind(this));
    },

    LoadLanguageDidFinish: function (p) {
        this.LoadGamePrefab();
    },

    CreateGame: function () {
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameShapeColor);
        this.game.node.parent = this.node;
        this.game.languageColor = this.languageColor;

        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        this.ParseGuankaInternal();
    },

    LanguageKeyOfShape: function (info) {
        var key = info.id;
        // if (cc.Config.main().appKeyName == cc.AppType.SHAPECOLOR) {
        //     key = "SHAPE_TITLE_" + info.id;
        // }
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
        var str = this.languageColor.GetString(info.id);
        return str;
    },



    UpdateGuankaLevel: function (level) {
        cc.Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        this._super();
        this.game.listShape = this.listShape;
        this.game.listColor = this.listColor;
        this.game.textTitle = this.textTitle;
        this.textTitle.node.active = false;
        this.game.LoadGame(cc.GameManager.gameMode);
        //必须在loadgame之后loadbg
        this.LoadBg();
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

    IsInColorFilter: function (colorfilter, info) {
        var isfilter = false;
        for (let infocolor of colorfilter.listColorFilter) {
            if (info.id == infocolor.id) {
                isfilter = true;
                break;
            }
        }
        return isfilter;
    },
    LoadBg: function () {
        var listBgNew = [];
        for (let infobg of this.listBg) {
            var isColorFilter = false;
            for (let infocolor of this.game.listColorShow) {
                isColorFilter = this.IsInColorFilter(infobg, infocolor);
                if (isColorFilter) {
                    break;
                }
            }
            if (!isColorFilter) {
                listBgNew.push(infobg);
            }
        }
        if (listBgNew.length == 0) {
            listBgNew = this.listBg;
        }

        var rdm = cc.Common.RandomRange(0, listBgNew.length);
        cc.Debug.Log("listBgNew.count = " + listBgNew.length + " rdm=" + rdm);

        var info = this.game.GetItemInfoShapeColor(rdm, listBgNew);
        //imagebg
        //var url = "http://i1.bvimg.com/679362/29748b18acf1446a.png"
        //var url = cc.AppRes.URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg0.jpg";
        // var url = cc.AppRes.URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg1.png"; 
        var dirRoot = cc.Common.CLOUD_RES_DIR;
        if (cc.Common.main().isWeiXin) {
            dirRoot = cc.Common.GAME_RES_DIR;
        }
        var url = cc.AppRes.main().URL_HTTP_HEAD + dirRoot + "/image_bg/" + info.pic;
        cc.Debug.Log("listBgNew.count = " + listBgNew.length + " url=" + url);
        cc.TextureCache.main.Load(url, function (err, tex) {
            if (err) {

                cc.Debug.Log(err.message || err);
                return;
            }
            // cc.Debug.Log("TextureCache loadRes ok");

            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            lyscale.LayOut();

            this.ShowUserGuide();
        }.bind(this));

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

    StartParseGuanka: function (callback) {
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
        var filepath = cc.Common.GAME_RES_DIR + "/guanka/bg.json";
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

        //ng
        var url = cc.AppRes.main().URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg.json";
        cc.Debug.Log("StartParseBgList:url=" + url);
        // cc.loader.load(url, function (err, rootJson) {
        //     if (err) {
        //         cc.Debug.Log(err.message || err);
        //         cc.Debug.Log("StartParseBgList:err=" + err.message);
        //     }
        //     if (err == null) {
        //         var infoload = cc.Common.GetLoadItemById(this.listProLoad, info.id);
        //         if (infoload != null) {
        //             infoload.isLoad = true;
        //         }
        //         this.ParseBgList(rootJson.json);
        //     }
        // }.bind(this));


        //https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/GameRes/image_bg/bg.json?sign=da97fbe3f6b62f1369097601dac034ff&t=1552047837
        //存在浏览器跨域访问问题
        // var httpReq = new cc.HttpRequest();
        // httpReq.Get(url, function (err, data) {
        //     if (err) {
        //         cc.Debug.Log(err);
        //         return;
        //     }
        //     var infoload = cc.Common.GetLoadItemById(this.listProLoad, info.id);
        //     if (infoload != null) {
        //         infoload.isLoad = true;
        //     }
        //     var str = String.fromCharCode.apply(null, new Uint8Array(data));
        //     var rootJson = JSON.parse(str);
        //     this.ParseBgList(rootJson);
        // }.bind(this));

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
            var dirRoot = cc.Common.CLOUD_RES_DIR;
            if (cc.Common.main().isWeiXin) {
                dirRoot = cc.Common.GAME_RES_DIR;
            }
            var picdir = dirRoot + "/image/" + strPlace + "/" + info.id;
            info.pic = picdir + "/" + info.id + ".png";
            info.picInner = picdir + "/" + info.id + "_inner.png";
            info.picOuter = picdir + "/" + info.id + "_outer.png";
            info.isMathShape = true;
            if (strPlace != UIGameShapeColor.PLACE_MATH) {
                info.isMathShape = false;
                picdir = dirRoot + "/image/" + strPlace;
                info.pic = picdir + "/" + info.id + ".png";
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
            var dirRoot = cc.Common.CLOUD_RES_DIR;
            if (cc.Common.main().isWeiXin) {
                dirRoot = cc.Common.GAME_RES_DIR;
            }
            var strdir = dirRoot + "/image_bg";
            info.pic = item.pic;
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
