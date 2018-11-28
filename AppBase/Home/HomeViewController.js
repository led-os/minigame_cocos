var UIViewController = require("UIViewController");
var HomeViewController = cc.Class({
    extends: UIViewController,

    test: function () {
        cc.log("HomeViewController test");

    },

});

//单例对象 方法一
HomeViewController.main = new HomeViewController(); 
