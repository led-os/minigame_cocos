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
    RunApp: function () {
        cc.Debug.Log("AppScene RunApp");
        this._super();
        // InitAd();
        // var controller = TabBarViewController.main();
        // {
        //     var info = new TabBarItemInfo();
        //     info.controller = MainViewController.main();
        //     info.title = "main";
        //     info.pic = "AppCommon/UI/Home/BtnHome";
        //     controller.AddItem(info);
        // }

        //   {
        //     var info = new TabBarItemInfo();
        //     info.controller = HomeViewController.main();
        //     info.title = "home";
        //     info.pic = "App/UI/Home/BtnHome";
        //     controller.AddItem(info);
        // }

       this.SetRootViewController(MainViewController.main());//MainViewController HomeViewController controller
    },

    // onLoad: function () {
    //     cc.Debug.Log("AppScene onLoad");
    //   
    // },



});
