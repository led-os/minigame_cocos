var UIView = require("UIView");
var Common = require("Common");
var UIGuankaBase = require("UIGuankaBase");
var GameManager = require("GameManager");
var Language = require("Language");

cc.Class({
    extends: UIGuankaBase,
    properties: {
        imageBg: cc.Sprite,
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        textTitle:cc.Label,
        oneCellNum: 3,
    },

    onLoad: function () {
        this.UnifyButtonSprite(this.btnBack);
        this.InitList();
        this.textTitle.string = Language.main().GetString("STR_GUANKA");
        GameManager.main().ParseGuanka();
    },

    _getdata: function (num) {
        var array = [];
        for (var i = 0; i < num; ++i) {
            var obj = {};
            obj.name = 'a' + i;
            array.push(obj);
        }
        return array;
    },
    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 512;
        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
    },

    GotoGame: function (idx) {
        GameManager.gameLevel = idx;
        GameManager.main().GotoGame(this.controller);
    },
});

