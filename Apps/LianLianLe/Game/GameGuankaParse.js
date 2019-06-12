var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var AppType = require("AppType");

var GameGuankaParse = cc.Class({
    extends: cc.GuankaParseBase,
    statics: {
    },

    properties: {

    },

    ParseGuanka: function (json) {
        if ((this.listGuanka != null) && (this.listGuanka.length != 0)) {
            return;
        }
       
        var idx = cc.GameManager.main().placeLevel;
        var infoPlace = cc.GameManager.main().GetPlaceItemInfo(idx);
        var strPlace = infoPlace.id;
     
        var items = json.items;  
        for (var i = 0; i < items.length; i++) {
            var info = new cc.LianLianLeItemInfo();
            var item = items[i];
            info.id = item.id;
            var dirRoot = cc.CloudRes.main().rootPath; 
            var picdir = dirRoot + "/image/" + strPlace;
            var jsonPic0 = item.pics0;
            for (var j = 0; j < jsonPic0.length; j++) {
                var infopic = new cc.LianLianLeItemInfo();
                var itempic = jsonPic0[j];
                infopic.pic = picdir + "/" + itempic.name;
                infopic.category = itempic.type;
                //随机打乱
                var rdm = cc.Common.RandomRange(0, info.listPic0.length + 1);
                //插入元素
                info.listPic0.splice(rdm, 0, infopic);
                if (cc.Common.isBlankString(info.pic)) {
                    info.pic = infopic.pic;
                }

            }

            var jsonPic1 = item.pics1;
            for (var j = 0; j < jsonPic1.length; j++) {
                var infopic = new cc.LianLianLeItemInfo();
                var itempic = jsonPic1[j];
                infopic.pic = picdir + "/" + itempic.name;
                infopic.category = itempic.type;
                //随机打乱 
                var rdm = cc.Common.RandomRange(0, info.listPic1.length + 1);
                //插入元素
                info.listPic1.splice(rdm, 0, infopic);
            }


            this.listGuanka.push(info);
        }
        if(this.callbackGuankaFinish!=null)
        {
            this.callbackGuankaFinish();
        }

        cc.Debug.Log("config:this.listGuanka=" + this.listGuanka.length);
        //  this.CheckAllLoad();
    },

});

GameGuankaParse._main = null;
GameGuankaParse.main = function () {
    // 
    if (!GameGuankaParse._main) {
        GameGuankaParse._main = new GameGuankaParse();
    }
    return GameGuankaParse._main;
}

cc.GameGuankaParse = module.export = GameGuankaParse; 
