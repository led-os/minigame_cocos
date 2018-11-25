var UIViewController = require("UIViewController");
var NaviViewController = cc.Class({
    extends: UIViewController,
     
    test: function () {
        cc.log("run test");
    
    },

});

//单例对象 方法一
NaviViewController.main = new NaviViewController();

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
