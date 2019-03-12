var BlockItemInfo =cc.Class({
    extends: cc.ItemInfo,// cc.ItemInfo,
    properties: {
        color:new cc.Color(0,0,0,0), 
        colorid: "",
        i: 0,
        j: 0,
        //node: cc.Node,
    },
}); 
cc.BlockItemInfo = module.export = BlockItemInfo; 