
var LoveDB = cc.Class({
    extends: cc.Object,

    AddItem(info) {
    },
    DeleteItem(info) {
    },
    IsItemExist(info) {
    },
});

LoveDB._main = null;
LoveDB.main = function () {
    if (!LoveDB._main) {
        LoveDB._main = new LoveDB();
    } else {
    }
    return LoveDB._main;
}

cc.LoveDB = module.export = LoveDB;
