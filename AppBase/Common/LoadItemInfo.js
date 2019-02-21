//var ItemInfo = require("ItemInfo");
var LoadItemInfo =cc.Class({
    extends: cc.Object,
    properties: {
        id: '',
        isLoad: false,
    },
    statics: {
        // 声明静态变量
        CONFIG: "config",
        LANGUAGE: "language",
        GAME: "game",
    },
}); 

cc.LoadItemInfo = module.export = LoadItemInfo; 