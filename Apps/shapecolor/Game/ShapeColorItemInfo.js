var ItemInfo = require("ItemInfo");
cc.Class({
    extends: ItemInfo,
    properties: {
        picInner: "",
        picOuter: "",
        color:cc.Color,
        isMain: false,//主要项
        isInner: false,
        colorid: "",
        i: 0,
        j: 0,
        textureHasLoad: false,//web 纹理是否下载完成
        listColorFilter: {
            default: [],
            type: cc.Object
        }, 
        objTrail:cc.Node, 
    },
}); 