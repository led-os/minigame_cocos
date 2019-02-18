var ItemInfo = require("ItemInfo");
cc.Class({
    extends: ItemInfo,
    properties: {
        picInner: "",
        picOuter: "",
        // public Color color;
        isMain: false,//主要项
        isInner: false,
        colorid: "",
        i: 0,
        j: 0,
        textureHasLoad: false,//web 纹理是否下载完成
        // public List<object> listColorFilter："",
        // public GameObject objTrail："",
    },
}); 