
var UIView = require("UIView");

var GameBase = cc.Class({
    extends: UIView,
    properties: {
        gameStatus: 0,
        callbackGameWin: null,
        callbackGameFail: null,

        /*
    `   { 
            onWin: function (ui) {
            },
            onFail: function (ui) {
            }, 
        }
        */
        objGameFinish: null,
    },
    OnGameFail: function () {
        if (this.objGameFinish != null) {
            if (this.objGameFinish.onFail != null) {
                this.objGameFinish.onFail(this);
            }
        }
    },

    OnGameWin: function () {
        if (this.objGameFinish != null) {
            if (this.objGameFinish.onWin != null) {
                this.objGameFinish.onWin(this);
            }
        }
    },

});
