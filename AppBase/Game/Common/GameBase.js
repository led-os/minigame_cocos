
var UIView = require("UIView");

var GameBase = cc.Class({
    extends: UIView,
    properties: {
        gameStatus: 0,
        callbackGameWin: null,
        callbackGameFail: null,
    },


});
