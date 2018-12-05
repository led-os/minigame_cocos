var AppSceneBase = require("AppSceneBase");
var MainViewController = require("MainViewController");
var HomeViewController = require("HomeViewController");
var TabBarViewController = require("TabBarViewController");
var TabBarItemInfo = require("UITabBarItem");
cc.Class({
    extends: AppSceneBase,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        title: "sss",

    },
    test: function () {
        //   cc.log("MainViewController test");

    },
    RunApp: function () {
        cc.log("AppScene RunApp");
        // base.RunApp();

        // InitAd();
        var info = new TabBarItemInfo();
        var controller = TabBarViewController.main();
        info.controller = HomeViewController.main();
        controller.AddItem(info);
        this.SetRootViewController(controller);//MainViewController HomeViewController
    },

    // onLoad: function () {
    //     cc.log("AppScene onLoad");
    //   
    // },



});
