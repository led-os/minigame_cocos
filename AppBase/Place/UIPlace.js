var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
cc.Class({
    extends: UIPlaceBase,
    properties: {
        imageBg: cc.Sprite,
        tableView: cc.tableView,
        btnBack: {
            default: null,
            type: cc.Button
        },

    },

    onLoad: function () {
        this._super();
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

    OnClickBtnBack: function (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },
});

