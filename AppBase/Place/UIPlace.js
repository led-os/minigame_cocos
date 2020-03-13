var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var GameViewController = require("GameViewController");

cc.Class({
    extends: UIPlaceBase,
    properties: {
        tableView: cc.TableView,
        btnBack: {
            default: null,
            type: cc.UIButton
        },
        textTitle: cc.UIText,
        oneCellNum: 4,
        listItem: null,
    },

    onLoad: function () {
        this._super();
 
        cc.LevelManager.main().StartParsePlace(function () {
            this.UpdateItem();
        }.bind(this)
        );


    },

    //判断两个数的是否为整数倍,返回true或者false
    // isPositiveIntegerTimes: function (arg1, arg2) {
    //     if (arg1 < arg2) {
    //         var flag = arg1;
    //         arg1 = arg2;
    //         arg2 = arg1;
    //     }
    //     var t1 = 0, t2 = 0, r1, r2;
    //     try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    //     try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    //     with (Math) {
    //         r1 = Number(arg1.toString().replace(".", ""));
    //         r2 = Number(arg2.toString().replace(".", ""));
    //         var times = (r1 / r2) * pow(10, t2 - t1);

    //         if (!(/(^[1-9]\d*$)/.test(times.toString()))) {
    //             return false;
    //         }
    //         else {
    //             return true;
    //         }
    //     }
    // },


    InitList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = 512;
        var size = this.node.getContentSize();

        var v = size.width / this.tableView.cellHeight; 
        this.oneCellNum = Math.ceil(v);//向上取整
        this.heightCell = Math.floor(size.width / this.oneCellNum);

        cc.Debug.Log("UIPlace this.oneCellNum=" + this.oneCellNum + " size.width=" + size.width);
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

