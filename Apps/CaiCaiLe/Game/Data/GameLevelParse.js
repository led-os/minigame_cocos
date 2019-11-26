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
        listGuankaItemId: {
            default: [],
            type: cc.Object
        },
        keyGameGuide: "0",
    },

    AddItemImage(list, infoId, enable_color) {
        return;
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        var infopic = new cc.LianLianLeItemInfo();
        infopic.id = infoId.id;
        infopic.pic = infoId.pic;
        infopic.category = infoPlace.id;
        infopic.isColor = false;

        //随机打乱 
        var rdm = cc.Common.RandomRange(0, list.length + 1);
        if (enable_color) {
            var rdm_tmp = cc.Common.RandomRange(0, 2);
            var is_up = (rdm_tmp == 0) ? true : false;
            if (rdm > list.length / 2) {
                infopic.isColor = is_up;
            }
            else {
                infopic.isColor = !is_up;
            }
        }
        // list.Insert(rdm, infopic);
        list.splice(rdm, 0, infopic);
    },

    ParseGuanka: function (json) {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        cc.Debug.Log("GameLevelParse ParseGuanka 0");


        this.keyGameGuide = "STR_PLACE_" + infoPlace.id + "_GUANKA" + cc.LevelManager.main().gameLevel;

        if ((this.listGuanka != null) && (this.listGuanka.length != 0)) {
            return;
        }


        var strPlace = infoPlace.id;

        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.CaiCaiLeItemInfo();
            var item = items[i];
            info.id = item.id;
            var dirRoot = cc.CloudRes.main().rootPath;
            var picdir = dirRoot + "/image/" + strPlace;
            //   infopic.pic = picdir + "/" + itempic.name;

            this.listGuanka.push(info);
        }

        this.ParseGuankaDidFinish();
        cc.Debug.Log("GameLevelParse:this.listGuanka=" + this.listGuanka.length);
        //  this.CheckAllLoad();
    },

    StartParseAutoGuanka() {
        // cc.Debug.Log("StartParseAutoGuanka:this.listGuanka=" + this.listGuanka.length);
        this.LoadGuankaItemId(this.ParseAutoGuankaDidFinish.bind(this));
    },

    ParseAutoGuankaDidFinish() {
        //cc.Debug.Log("ParseAutoGuankaDidFinish:this.listGuanka=" + this.listGuanka.length);
        this.LoadAutoGuanka();
    },
    LoadAutoGuanka() {
        // cc.Debug.Log("LoadAutoGuanka:this.listGuanka=" + this.listGuanka.length);
        if (GameLevelParse.autoMakeGuanka == null) {
            // autoMakeGuanka = this.gameObject.AddComponent<AutoMakeGuanka>();
            GameLevelParse.autoMakeGuanka = cc.AutoMakeGuanka.main();
            GameLevelParse.autoMakeGuanka.autoGuankaOneGroupCount = GameLevelParse.GUANKA_ITEM_NUM_ONE_GROUP;
            GameLevelParse.autoMakeGuanka.LoadAutoGuankaJson(this.LoadAutoGuankaFinish.bind(this));
        } else {
            this.LoadAutoGuankaFinish();
        }
    },

    LoadAutoGuankaFinish() {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        // keyGameGuide = "STR_GAME_GUIDE_" + infoPlace.id;
        // ParseGuankaItemId(GUANKA_ITEM_NUM_ONE_GROUP);
        var group = this.listGuankaItemId.length / GameLevelParse.GUANKA_ITEM_NUM_ONE_GROUP;
        this.CleanGuankaList();
        cc.Debug.Log("LoadAutoGuankaFinish start:this.listGuanka=" + this.listGuanka.length);
        var count = cc.AutoMakeGuanka.main().listAutoGuankaJson.length;
        for (var g = 0; g < group; g++) {
            for (var i = 0; i < count; i++) {
                var info = new cc.LianLianLeItemInfo();
                var infoAutoGuanka = cc.AutoMakeGuanka.main().listAutoGuankaJson[i];
                var strcontent = infoAutoGuanka.id;
                var strArray = strcontent.split(',');

                var strDirPic = cc.Common.GAME_RES_DIR + "/image/" + infoPlace.id;
                //pics0 
                var pos_index = 0;
                idx = 0;
                for (let stritem of strArray) {
                    idx = cc.Common.String2Int(stritem) + g * GameLevelParse.GUANKA_ITEM_NUM_ONE_GROUP;
                    var infoId = this.listGuankaItemId[idx];
                    var rdm = cc.Common.RandomRange(0, 2);
                    var enable_color = (rdm == 0) ? true : false;
                    this.AddItemImage(info.listPic0, infoId, enable_color);
                    this.AddItemImage(info.listPic1, infoId, !enable_color);
                    pos_index++;
                }

                this.listGuanka.push(info);
            }

        }

        cc.Debug.Log("LoadAutoGuankaFinish:this.listGuanka=" + this.listGuanka.length);
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
