var UIView = require("UIView");
// var Common = require("Common");
var UIGuankaBase = require("UIGuankaBase");
var GameViewController = require("GameViewController");
//var Language = require("Language");

cc.Class({
    extends: UIGuankaBase,
    properties: {
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        textTitle: cc.Label,
        oneCellNum: 3,
        listItem: null,
    },

    onLoad: function () {
        this._super(); 

        this.textTitle.string = cc.Language.main().GetString("STR_GUANKA");
        cc.LevelManager.main().StartParseGuanka(function () {
            cc.Debug.Log("UIGuanka::UpdateItem");
            this.UpdateItem();
        }.bind(this)
        );

        cc.TextureUtil.UpdateTypeButtonImage({
            btn: this.btnBack,
            bg: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_BG,
            icon: cc.CloudRes.main().rootPath + "/" + cc.AppRes.IMAGE_BTN_ICON_BACK,
            success: function () {
            }.bind(this),
        });

        // this.tableView.node.active = false;
        var ev = this.node.addComponent(cc.UITouchEvent);
        var strbg = cc.CloudRes.main().rootPath + "/" + cc.AppRes.GUANKA_BG;
        cc.TextureCache.main.Load(strbg, function (err, tex) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            if (lyscale) {
                lyscale.LayOut();
            }
        }.bind(this));
        // this.UpdateItem();
    },


    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = 256;
        var size = this.node.getContentSize();
        this.oneCellNum = Math.floor(size.width / this.tableView.cellHeight);
        this.tableView.oneCellNum = this.oneCellNum;

        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    UpdateItem: function () {
       // var game = GameViewController.main().gameBase;
        this.listItem = cc.GameLevelParse.main().listGuanka;
        cc.Debug.Log("UIGuanka::this.listItem=" + this.listItem.length);
        this.InitList();
    },

    GotoGame: function (idx) {
        cc.LevelManager.main().gameLevel = idx;
        cc.GameManager.main().GotoGame(this.controller);
    },
});

