var BlockItemInfo = cc.Class({
    extends: cc.ItemInfo,// cc.ItemInfo,
    properties: {
        row: 0,
        col: 0,
        normalPosY: 0,
        movePosY: 0,
    },
});
cc.BlockItemInfo = module.export = BlockItemInfo; 