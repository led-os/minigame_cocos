var UIView = require("UIView");
var UIPlaceBase = require("UIPlaceBase");
var UILearnProgressCellItem = require("UILearnProgressCellItem");
var GameViewController = require("GameViewController");
var UILearnProgressCellItem = require("UILearnProgressCellItem");
var UISegmentItem = require("UISegmentItem");

var UILearnProgress = cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.UIImage,
        tableView: cc.TableView,
        btnBack: cc.UIButton,
        uiSegment: cc.UISegment,
        indexSegment: 0,
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
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        listStringPlace: {
            default: [],
            type: cc.Object
        },
    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

        this.colorSel = cc.Color.WHITE;
        this.colorUnSel = cc.Color.GRAY;

        this.uiSegment.callBackDidClick = {
            OnUISegmentDidClickItem: function (seg, item) {
                this.indexSegment = item.index;
                UILearnProgressCellItem.indexSegment = this.indexSegment;
                cc.LanguageManager.main().LoadLanguageGame();
                this.UpdateList();
            }.bind(this),
        };
 

        this.StartParserSortList();
    },


    StartParserSortList: function () {
        //
        for (var i = 0; i < cc.LevelManager.main().listPlace.length; i++) {
            var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(i);
            if (this.uiSegment != null) {
                var infoSeg = new cc.ItemInfo();
                infoSeg.id = infoPlace.id;
                //infoSeg.title = this.listStringPlace[i];
                cc.Debug.Log("StartParserSortList title=" + infoSeg.title);
                this.uiSegment.AddItem(infoSeg);
            }
        }
        if (this.uiSegment != null) {
            this.uiSegment.UpdateList();
        }
        this.uiSegment.Select(this.indexSegment);
        // LanguageManager.main.UpdateLanguage(indexSegment);

        this.indexPlace = 0;
        for (var i = 0; i < cc.LevelManager.main().listPlace.length; i++) {
            var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(i);
            cc.LanguageManager.main().GetStringPlace({
                key: cc.LanguageManager.main().LanguageKeyOfPlaceItem(infoPlace),//cc.sys.LANGUAGE_CHINESE
                def: "",
                file: "",
                success: function (str) {
                    this.uiSegment.UpdateItemText(this.indexPlace, str);
                    this.indexPlace++;
                }.bind(this),
                fail: function () {
                }.bind(this),
            });
        }

    },

    UpdateListInternal() {
        this.listItem = cc.GameLevelParse.main().listGuankaItemId;

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

    UpdateList: function () {
        cc.GameLevelParse.main().StartParseGuankaItemId(this.indexSegment, this.UpdateListInternal.bind(this));
        this.LayOut();
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

