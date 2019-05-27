var FrendBoardWeiXin = cc.Class({
    extends: cc.FrendBoardPlatformWrapper,// cc.ItemInfo,
    properties: {

    },
    statics: {




    },


    //https://www.jianshu.com/p/abf753ded43b
    //https://segmentfault.com/a/1190000015034592?utm_source=tag-newest
    SaveData: function (score) {
        //let score = '' + 50;
        wx.setUserCloudStorage({
            KVDataList: [{ key: 'score', value: score }],
            success: res => {
                console.log(res);
                // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                let openDataContext = wx.getOpenDataContext();
                openDataContext.postMessage({
                    type: 'updateMaxScore',
                });
            },
            fail: res => {
                console.log(res);
            }
        });
    },

});

cc.FrendBoardWeiXin = module.export = FrendBoardWeiXin; 
