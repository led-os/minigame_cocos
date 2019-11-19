 
var LanguageManager = cc.Class({
    extends: cc.Object,
    statics: {


    },
    properties: {


    },
    Init: function () {
        //this.ParseGuanka();
    },

});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
LanguageManager._main = null;
LanguageManager.main = function () {
    // 
    if (!LanguageManager._main) {
        cc.Debug.Log("_main is null");
        LanguageManager._main = new LanguageManager();
        LanguageManager._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return LanguageManager._main;
}

cc.LanguageManager = module.export = LanguageManager; 