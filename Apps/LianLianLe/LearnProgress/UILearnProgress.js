var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var UILearnProgressCellItem = require("UILearnProgressCellItem");
var GameViewController = require("GameViewController");
//var GameManager = require("GameManager");

var UILearnProgress = cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.UIImage,
        tableView: cc.TableView,
        btnBack: cc.UIButton, 

        textTitle: cc.UIText,
        oneCellNum: 4,
        totalItem: 0,
        oneCellNum: 0,
        heightCell: 0,
        numRows: 0,
        numInstancesCreated: 0,
        itemType: 0,
        colorUnSel: cc.Color,
        colorUnSel: cc.Color,
        listItem: {
            default: [],
            type: cc.Object
        },

    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

        this.colorSel = cc.Color.WHITE;
        this.colorUnSel = cc.Color.GRAY;

        this.UpdateList();

    },

    start: function () {

    },

    UpdateList: function () { 
        this.listItem = cc.GameLevelParse.main().listColor; 

        // totalItem = listItem.Count;
        // numRows = totalItem / oneCellNum;
        // if (totalItem % oneCellNum != 0) {
        //     numRows++;
        // }

        // tableView.ReloadData();
        this.oneCellNum = 2;
        if (!cc.Device.main.isLandscape) {
            this.oneCellNum = this.oneCellNum / 2;
        }
 

        this.tableView.oneCellNum = this.oneCellNum;
        this.tableView.cellHeight = 256;
        this.tableView.uiViewParent = this;
        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });

    },

    OnClickBtnBack: function () {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },
 


});

