var UIView = require("UIView");
var UITabBarItem = require("UITabBarItem");
var TabBarItemInfo = require("UITabBarItem");
var AppSceneBase = require("AppSceneBase"); 

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
        cc.Debug.Log("UITabBar onLoad");
        this._super();
        this.LoadPrefab();
        var strImage = "Common/UI/UIKit/barbg";
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                //cc.Debug.Log("UITabBar loadRes barbg fail");
                cc.Debug.Log(err.message || err);
                return;
            }
            //cc.Debug.Log("UITabBar loadRes barbg ok");
            this.spriteBg.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();



        }.bind(this));

        // cc.TextureCache.main.Load(strImage, null);

    },
    LoadPrefab: function () {
        //   name = "UIHome" + Common.appType;
        var strPrefab = "Common/Prefab/TabBar/UITabBarItem";
       cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            this.uiTabBarItemPrefab = prefab;
            this.CreateTabItem();
        }.bind(this)
        );
    },

    LayOut: function () {
        var size = this.node.getContentSize();
        var x = size.width / 2;
        var y = size.height / 2;
        x = 0;
        y = -AppSceneBase.main.sizeCanvas.height / 2 + y;
        cc.Debug.Log("size = " + size + " x=" + x);

        this.spriteBg.node.setPosition(x, y);
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
