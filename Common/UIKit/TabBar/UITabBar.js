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
        spriteBg: cc.Sprite,


    },
    onLoad: function () {
        cc.log("UITabBar onLoad");
        this.LoadPrefab();
        var strImage = "Common/UI/UIKit/barbg";
        cc.loader.loadRes(strImage, cc.Texture2D, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.log("UITabBar loadRes barbg fail");
                cc.log(err.message || err);
                return;
            }
            cc.log("UITabBar loadRes barbg ok");
            this.spriteBg.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
        }.bind(this));

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

    LayOut: function () {
        var size = this.node.getContentSize();
        var x = size.width / 2;
        var y = size.height / 2;
        cc.log("size = " + size + " x=" + x);

        this.spriteBg.node.setPosition(x, 80);
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
