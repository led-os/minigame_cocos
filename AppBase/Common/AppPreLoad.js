var AppPreLoad = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量  
    },

    properties: {
        listProLoad: {
            default: [],
            type: cc.LoadItemInfo
        },
        objCallBack: null,
    },

    /*
{ 
success: function (color) {
},
fail: function () {
}, 
}*/

    Load: function (obj) {
        this.objCallBack = obj;
        var w, h;
        //config
        {
            var info = new cc.LoadItemInfo();
            info.id = cc.LoadItemInfo.CONFIG;
            info.isLoad = false;
            this.listProLoad.push(info);

            var cf = cc.Config.main();
            cf.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), info);
            //cf.ParseJson(false);
        }

        // color
        {
            var info = new cc.LoadItemInfo();
            info.id = "color";
            info.isLoad = false;
            this.listProLoad.push(info);
            cc.ColorConfig.main().GetColor({
                key: "apppreload",
                def: cc.Color.BLACK,
                success: function (color) {
                    for (let infotmp of this.listProLoad) {
                        if (infotmp.id == "color") {
                            infotmp.isLoad = true;
                        }
                    }
                    cc.Debug.Log("AppPreLoadDidFinish color");
                    this.AppPreLoadDidFinish(info);
                }.bind(this),
            });

        }

        //本地 imageres.json
        //if (!cc.Common.main().isWeiXin) 
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = "image";
        //     info.isLoad = false;
        //     this.listProLoad.push(info);
        //     cc.ImageRes.main().GetImage({
        //         key: "apppreload",
        //         success: function (image) {
        //             for (let infotmp of this.listProLoad) {
        //                 if (infotmp.id == "image") {
        //                     infotmp.isLoad = true;
        //                 }
        //             }
        //             cc.Debug.Log("AppPreLoadDidFinish image");
        //             this.AppPreLoadDidFinish(info);
        //         }.bind(this),
        //     });
        // }

        //language
        {
            var info = new cc.LoadItemInfo();
            info.id = cc.LoadItemInfo.LANGUAGE;
            info.isLoad = false;
            this.listProLoad.push(info);

            var lan = cc.Language.main();
            lan.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), info);
        }


    },
    AppPreLoadDidFinish: function (p) {
        cc.Debug.Log("AppPreLoadDidFinish info.id=" + p.id);
        this.CheckAllLoad();
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of this.listProLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        cc.Debug.Log("AppPreLoad isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            if (this.objCallBack) {
                this.objCallBack.success();
            }
        }
    },

});


AppPreLoad._main = null;
AppPreLoad.main = function () {
    // 
    if (!AppPreLoad._main) {
        AppPreLoad._main = new AppPreLoad();
    } else {
    }

    return AppPreLoad._main;
}

cc.AppPreLoad = module.export = AppPreLoad;



