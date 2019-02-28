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
        LANGUAGE_GAME: "language_game",
        GAME: "game",
    },
}); 

cc.LoadItemInfo = module.export = LoadItemInfo; 