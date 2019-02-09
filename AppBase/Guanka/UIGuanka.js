var UIView = require("UIView");
var Common = require("Common");
var UIGuankaBase = require("UIGuankaBase");
var GameManager = require("GameManager");

cc.Class({
    extends: UIGuankaBase,
    properties: {
        tableView: cc.TableView,
        
        btnBack: {
            default: null,
            type: cc.Button
        },
    },

    onLoad: function () {
        this.UnifyButtonSprite(this.btnBack);
        this.InitList();
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
        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
        // this.tableView.getComponent(cc.tableView).initTableView(data.length, { array: data, target: this });
    },

    GotoGame: function (idx) {
        GameManager.gameLevel = idx;
        GameManager.main.GotoGame(this.controller);
    },
});

