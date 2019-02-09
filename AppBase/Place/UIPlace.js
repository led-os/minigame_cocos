var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var Common = require("Common");
var RectTransform = require("RectTransform");

cc.Class({
    extends: UIPlaceBase,
    properties: {
        imageBg: cc.Sprite,
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.Button
        },
        oneCellNum:4,

    },

    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
        //  this.InitList();
        var rctran = this.tableView.node.getComponent(RectTransform);
        var sizeParent = Common.GetSizeOfParnet(this.node);// cc.size(rctran.width,rctran.height); 
        // this.tableView.content.node.setContentSize(sizeParent);
        //     this.tableView.UpdateSize(sizeParent);
       // this.tableView.node.active = false;
        this.scheduleOnce(this.OnInitTableView, 0.001);
    },

    start: function () {
        // this.InitList();
    },
    OnInitTableView: function () {
        //this.tableView.node.active = true;
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
        //     var rctran = this.tableView.node.getComponent(RectTransform);
        //     var sizeParent = cc.size(rctran.width,rctran.height);
        //     this.tableView.node.setContentSize(sizeParent);
        //    // this.tableView.content.node.setContentSize(sizeParent);


        //    this.tableView.UpdateSize(sizeParent);

        var data = this._getdata(100);
        this.tableView.initTableView(data.length, { array: data, target: this });
        // this.tableView.getComponent(cc.tableView).initTableView(data.length, { array: data, target: this });


    },

    OnClickBtnBack: function (event, customEventData) {
        this.InitList();
        return;

        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },
});

