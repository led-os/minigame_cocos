cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        picInner: "",
        picOuter: "",
        color:new cc.Color(0,0,0,0),
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
        nodeTrail: cc.Node,
        node: cc.Node,
    },
}); 