var UIViewController = require("UIViewController");
var TabBarViewController = cc.Class({
    extends: UIViewController,
     
    test: function () {
        cc.log("run test");
    
    },

});

//单例对象 方法一
TabBarViewController.main = new TabBarViewController();

//单例对象 方法二
// TabBarViewController._main = null;
// TabBarViewController.getMain = function () {
//     if (!TabBarViewController._main) {
//         cc.log("_main is null");
//         TabBarViewController._main = new TabBarViewController();
//     } else {
//         cc.log("_main is not null");
//     }
//     return TabBarViewController._main;
// }
