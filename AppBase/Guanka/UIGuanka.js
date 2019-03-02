var UIView = require("UIView");
// var Common = require("Common");
var UIGuankaBase = require("UIGuankaBase");
var GameViewController = require("GameViewController");
//var Language = require("Language");

cc.Class({
    extends: UIGuankaBase,
    properties: {
        imageBg: cc.Sprite,
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


        this.UnifyButtonSprite(this.btnBack);

        this.textTitle.string = cc.Language.main().GetString("STR_GUANKA");
        //cc.GameManager.main().ParseGuanka();


        //this.tableView.node.active = false;
        var ev = this.node.addComponent(cc.UITouchEvent);

        this.UpdateItem();
    },


    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 512;
        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    UpdateItem: function () {
        var game = GameViewController.main().gameBase;
        this.listItem = game.listGuanka;
        this.InitList();
    },

    GotoGame: function (idx) {
        cc.GameManager.gameLevel = idx;
        cc.GameManager.main().GotoGame(this.controller);
    },
});

