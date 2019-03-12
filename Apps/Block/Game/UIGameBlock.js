var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameBlock = require("GameBlock");
var AppType = require("AppType");
//var LoadItemInfo = require("LoadItemInfo");

var UIGameBlock = cc.Class({
    extends: UIGameBase,
    properties: {

        btnBack: {
            default: null,
            type: cc.Button
        },
        textTitle: cc.Label,

        game: {
            default: null,
            type: GameBlock
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
        this.game = node.getComponent(GameBlock);
        this.game.node.parent = this.node;

        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        this.ParseGuankaInternal();
    },




    UpdateGuankaLevel: function (level) {
        cc.Debug.Log("UIGameBlock::UpdateGuankaLevel");
        this.game.textTitle = this.textTitle;
        this.textTitle.node.active = false;
        this.game.LoadGame(cc.GameManager.gameMode);
        this.LoadBg();
    },

    CheckAllLoad: function () {
        cc.Debug.Log("UIGameBlock::CheckAllLoad this.isShowGame=" + this.isShowGame + " this.listGuanka=" + this.listGuanka.length);
        if (cc.Common.CheckAllLoad(this.listProLoad) == true) {
            if (this.callbackGuankaFinish != null) {
                cc.Debug.Log("UIGameBlock::CheckAllLoad callbackGuankaFinish this.listGuanka=" + this.listGuanka.length);
                this.callbackGuankaFinish();
            }

            if (this.isShowGame) {
                this.UpdateGuankaLevel(cc.GameManager.main().gameLevel);
            }
        }


    },
    LoadBg: function () {

        var dirRoot = cc.Common.CLOUD_RES_DIR;
        if (cc.Common.main().isWeiXin) {
            dirRoot = cc.Common.GAME_RES_DIR;
        }
        var url = cc.AppRes.main().URL_HTTP_HEAD + dirRoot + "/image_bg/" + "bg0.jpg"; 
        cc.TextureCache.main.Load(url, function (err, tex) {
            if (err) {

                cc.Debug.Log(err.message || err);
                return;
            }
            // cc.Debug.Log("TextureCache loadRes ok");

            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            lyscale.LayOut();

        }.bind(this));

    },

    CleanGuankaList: function () {
        if (this.listGuanka != null) {
            this.listGuanka.splice(0, this.listGuanka.length);
        }


    },
    GetGuankaTotal: function () {
        // var count = this.ParseGuanka();
        var count = 0;
        if (this.listGuanka != null) {
            count = this.listGuanka.length;
        }
        return count;
    },

    ParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
        this.isShowGame = false;
        this.ParseGuankaInternal();
    },

    ParseGuankaInternal: function () {
        cc.Debug.Log("ParseGuanka UIGameBlock");
        //清空
        this.listProLoad.length = 0;

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
                this.DoParseGuanka(rootJson.json);
            }
        }.bind(this));

        return 0;
    },

    DoParseGuanka: function (json) {
        if ((this.listGuanka != null) && (this.listGuanka.length != 0)) {
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
            var info = new cc.BlockItemInfo();
            var item = items[i];
            info.id = item.id;
            var dirRoot = cc.Common.CLOUD_RES_DIR;
            if (cc.Common.main().isWeiXin) {
                dirRoot = cc.Common.GAME_RES_DIR;
            }
            var picdir = dirRoot + "/image/" + info.id; 
            info.pic = picdir + "/" + info.id + ".png"; 
            this.listGuanka.push(info);
        }
        cc.Debug.Log("config:this.listGuanka=" + this.listGuanka.length);
        this.CheckAllLoad();
    },

});
