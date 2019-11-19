var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var GameViewController = require("GameViewController");

cc.Class({
    extends: UIView,
    properties: {
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        textTitle: cc.Label,
        oneCellNum: 4,
        listItem: null,
    },

    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        this.textTitle.string = cc.Language.main().GetString("STR_PLACE");
        cc.LevelManager.main().StartParsePlace(function () {
            this.UpdateItem();
        }.bind(this)
        );
        var strbg = cc.CloudRes.main().rootPath + "/" + cc.AppRes.PLACE_BG; 
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

    },

    start: function () {

    },

    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = 512;
        var size = this.node.getContentSize();
        this.oneCellNum = Math.floor(size.width / this.tableView.cellHeight);
        this.tableView.oneCellNum = this.oneCellNum;

        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    UpdateItem: function () {
        var game = GameViewController.main().gameBase;
        this.listItem = cc.LevelManager.main().listPlace;
        cc.Debug.Log("UIPlace UpdateItem this.listItem=" + this.listItem.length);
        this.InitList();
    },
});

