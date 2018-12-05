var UIView = require("UIView");
var UITabBarItem = require("UITabBarItem");
var TabBarItemInfo = require("UITabBarItem");
cc.Class({
    extends: UIView,
    properties: {
        index: 0,
        uiTabBarItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        uiTabBarItem: {
            default: null,
            type: UITabBarItem,
        },
        listItem: {
            default: [],
            type: TabBarItemInfo
        },
    },
    onLoad: function () {
        cc.log("UITabBar onLoad");
        this.LoadPrefab();
    },

    LoadPrefab: function () {
        //   name = "UIHome" + Common.appType;
        var strPrefab = "Common/Prefab/TabBar/UITabBarItem";
        cc.loader.loadRes(strPrefab, function (err, prefab) {
            this.uiTabBarItemPrefab = prefab;
            this.CreateTabItem();
        }.bind(this)
        );
    },
    CreateTabItem: function () {
        this.listItem.forEach(function (value, index) {
            var node = cc.instantiate(this.uiTabBarItemPrefab);
            this.uiTabBarItem = node.getComponent(UITabBarItem);
            this.uiTabBarItem.node.parent = this.node;
            this.uiTabBarItem.index = index;
            this.uiTabBarItem.UpdateItem(value);
        }.bind(this));
    },


    //TabBarItemInfo
    AddItem: function (info, idx) {
        this.listItem.push(info);
        // CreateTabItem();
        // uiTabBarItem.index = idx;
        // uiTabBarItem.UpdateItem(info);
    },

}); 
