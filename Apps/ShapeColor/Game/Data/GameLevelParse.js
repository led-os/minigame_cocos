var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var AppType = require("AppType");

var GameLevelParse = cc.Class({
    extends: cc.LevelParseBase,
    statics: {
        autoMakeGuanka: null,
        GUANKA_ITEM_NUM_ONE_GROUP: 5,
    },

    statics: {
        PLACE_MATH: "Math",
    },

    properties: {
        listGuankaItemId: {
            default: [],
            type: cc.Object
        },
        listProLoad: {
            default: [],
            type: cc.LoadItemInfo
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

    GetGuankaTotal: function () {
        // var count = this.ParseGuanka();
        var count = 0;
        if (this.listShape != null) {
            count = GameShapeColor.GUANKA_NUM_PER_ITEM * this.listShape.length;
        }
        return count;
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

    ParseGuanka: function (json) {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        cc.Debug.Log("GameLevelParse ParseGuanka 0");
        if ((this.listGuanka != null) && (this.listGuanka.length != 0)) {
            return;
        }
        var strPlace = infoPlace.id;

        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.CaiCaiLeItemInfo();
            var item = items[i];
            info.id = item.id;
            info.title = item.title;
            info.pronunciation = item.pronunciation;
            info.translation = item.translation;
            info.album = item.album;

            var dirRoot = cc.CloudRes.main().rootPath;
            var picdir = dirRoot + "/image/" + strPlace;
            info.pic = picdir + "/" + info.id + ".png";

            //歇后语
            var key = "xiehouyu";
            if (item.key != null) {
                var xiehouyu = item.key;
                for (var j = 0; j < xiehouyu.length; j++) {
                    var item_xhy = xiehouyu[j];
                    if (j == 0) {
                        info.head = item_xhy.content;
                    }
                    if (j == 1) {
                        info.end = item_xhy.content;
                    }
                }
            }

            //谜语
            key = "head";
            if (item.key != null) {
                //Riddle
                info.head = item.head;
                info.end = item.end;
                info.tips = item.tips;
                info.type = item.type;
            }

            info.gameType = infoPlace.gameType;
            cc.Debug.Log("UpdateWord ParseGuanka gameType=" + info.gameType);
            this.listGuanka.push(info);
        }

        cc.Debug.Log("UIGameCaiCaiLe  ParseGuanka gameType=" + info.gameType);
        //  this.CheckAllLoad();   


        this.ParseGuankaDidFinish();


    },


    CheckAllLoad: function () {
        cc.Debug.Log("UIGameShapeColor::CheckAllLoad this.isShowGame=" + this.isShowGame + " this.listGuanka=" + this.listGuanka.length);
        if (cc.Common.CheckAllLoad(this.listProLoad) == true) {
            if (this.callbackGuankaFinish != null) {
                cc.Debug.Log("UIGameShapeColor::CheckAllLoad callbackGuankaFinish this.listGuanka=" + this.listGuanka.length);
                this.callbackGuankaFinish();
            }

            this.ParseGuankaDidFinish();
        }


    },


    StartParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
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
    },
    StartParseShape: function () {
        var info = new cc.LoadItemInfo();
        info.id = this.shapeId = "shape";
        info.isLoad = false;
        this.listProLoad.push(info);
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        if (infoPlace == null) {
            cc.Debug.Log("StartParseShape:infoPlace=null idx=" + idx);
        }
        var filepath = cc.Common.GAME_RES_DIR + "/guanka/item_" + infoPlace.id + ".json";//
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
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ShapeColorItemInfo();
            var item = items[i];
            info.id = item.id;
            var dirRoot = cc.Common.CLOUD_RES_DIR;
            if (cc.Common.main().isWeiXin) {
                // dirRoot = cc.Common.GAME_RES_DIR;
                dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
            }
            var picdir = dirRoot + "/image/" + strPlace + "/" + info.id;
            info.pic = picdir + "/" + info.id + ".png";
            info.picInner = picdir + "/" + info.id + "_inner.png";
            info.picOuter = picdir + "/" + info.id + "_outer.png";
            info.isMathShape = true;
            if (strPlace != GameLevelParse.PLACE_MATH) {
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

GameLevelParse._main = null;
GameLevelParse.main = function () {
    // 
    if (!GameLevelParse._main) {
        GameLevelParse._main = new GameLevelParse();
    }
    return GameLevelParse._main;
}

cc.GameLevelParse = module.export = GameLevelParse; 
