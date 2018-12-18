var NaviViewController = require("NaviViewController");
var HomeViewController = require("HomeViewController");
var Language = require("Language");

var MainViewController = cc.Class({
    extends: NaviViewController,

    ViewDidLoad: function () {
        this._super();
        this.Push(HomeViewController.main());

        var str = Language.main().GetString("APP_NAME");
        cc.log("Language GetString=" + str);
    },

});

//单例对象 方法一
// MainViewController.main = new MainViewController(); 

//单例对象 方法二
MainViewController._main = null;
MainViewController.main = function () {
    if (!MainViewController._main) {
        cc.log("_main is null");
        MainViewController._main = new MainViewController();
    } else {
        cc.log("_main is not null");
    }
    return MainViewController._main;
}
