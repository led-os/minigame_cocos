var AppSceneBase = require("AppSceneBase");
var MainViewController = require("MainViewController");

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

        this.SetRootViewController(MainViewController.main);
    },

    // onLoad: function () {
    //     cc.log("AppScene onLoad");
    //   
    // },



});
