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
            type: cc.UIButton
        },
        textTitle: cc.UIText,
        oneCellNum: 3,
        listItem: null,
    },

    onLoad: function () {
        this._super(); 
        cc.LevelManager.main().StartParseGuanka(function () {
            cc.Debug.Log("UIGuanka::UpdateItem");
            this.UpdateItem();
        }.bind(this)
        );



        // this.tableView.node.active = false;
        var ev = this.node.addComponent(cc.UITouchEvent);

        // this.UpdateItem();
    },


    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = 256;
        var size = this.node.getContentSize(); 

        var v = size.width / this.tableView.cellHeight;
        this.oneCellNum = Math.ceil(v);//向上取整
        this.heightCell = Math.floor(size.width / this.oneCellNum);

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

