var LianLianLeItemInfo = cc.Class({
    extends: cc.ItemInfo,// cc.ItemInfo,
    properties: {
        colorid: "",
        count: 0,
        listPic0: {
            default: [],
            type: cc.Object
        },
        listPic1: {
            default: [],
            type: cc.Object
        },
        listColorFilter: {
            default: [],
            type: cc.Object
        },
        isColor: false,
        //posNormalWorld:



    },
});
cc.LianLianLeItemInfo = module.export = LianLianLeItemInfo; 