var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var AppType = require("AppType");

var GameLevelParse = cc.Class({
    extends: cc.LevelParseBase,
    statics: {
        autoMakeGuanka: null,
        GUANKA_ITEM_NUM_ONE_GROUP: 5,
    },

    properties: {
        strWord3500: "",
        strWordEnglish: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        keyGameGuide: "0",
        //string[] arrayPunctuation = { "。", "？", "！", "，", "、", "；", "：" };

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
            info.pic = picdir + "/" + info.title + ".png";

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
        this.StartParseWord3500();

    },

    StartParseWord3500() {
        var filepath = cc.CloudRes.main().rootPath + "/words_3500.json";
        // var filepath = cc.Common.GAME_RES_DIR + "/words_3500.json"; 

        if (cc.Common.main().isWeiXin) {
            //  filepath = "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/words_3500.json";
            // 加载json文件
            cc.loader.load({ url: filepath, type: "json" }, function (err, rootJson) {
                this.ParseWord3500(err, rootJson);
            }.bind(this));

            //var obj = str.parseJSON(); //由JSON字符串转换为JSON对象
            // cc.loader.load({ url: filepath }, function (err, data) {
            //     var json = data.parseJSON();
            //     this.ParseWord3500(err, json);
            // }.bind(this));

        } else {
            //cc.JsonAsset   cc.loader.load
            //去除后缀
            filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
            cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
                if (err) {
                    cc.Debug.Log("GameLevelParse StartParseWord3500:err=" + err);
                }
                if (err == null) {
                    this.ParseWord3500(rootJson.json);
                }
            }.bind(this));
        }


    },
    ParseWord3500(json) {
        if (json != null) {
            this.strWord3500 = json.words;
        }
        cc.Debug.Log("GameLevelParse:this.listGuanka=" + this.listGuanka.length + "json.strWord3500=" + this.strWord3500);
        this.ParseGuankaDidFinish();
    },



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
