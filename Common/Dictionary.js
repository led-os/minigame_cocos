/*字典 Dictionary类*/
cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    properties: {
        // datastore: {
        //     default: [],
        //     type: cc.Object
        // },
        datastore: new Array(),
    },
    Init: function () {
        // this.datastore = new Array();
    },


    Add: function (key, value) {
        this.datastore[key] = value;
        // if (this.Contains(key)) {
        //     cc.log("Contains key=" + key);
        // } else {
        //     cc.log("Contains fail key=" + key);
        // }
    },

    Get: function (key) {
        return this.datastore[key];
    },

    Remove: function (key) {
        delete this.datastore[key];
    },

    ShowAll: function () {
        var str = "";
        for (var key in this.datastore) {
            str += key + " -> " + this.datastore[key] + ";  "
        }
        cc.log(str);
    },

    Count: function () {
        /*var ss = Object.keys(this.datastore).length;
        console.log("ssss   "+ss);
        return Object.keys(this.datastore).length;*/
        /**/
        var n = 0;
        for (var key in Object.keys(this.datastore)) {
            ++n;
        }
        cc.log(n);
        return n;
    },

    Clear: function () {
        for (var key in this.datastore) {
            delete this.datastore[key];
        }
    },

    Contains: function (key) {
        var v = this.Get(key);
        if (v == null) {
            return false;
        }
        return true;
    },


});

