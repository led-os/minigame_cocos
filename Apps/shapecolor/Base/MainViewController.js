var UIViewController = require("UIViewController");
var MainViewController = cc.Class({
    extends: UIViewController,

    test: function () {
        cc.log("MainViewController test");

    },

});

//单例对象 方法一
MainViewController.main = new MainViewController(); 
