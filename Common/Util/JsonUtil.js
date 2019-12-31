var JsonUtil = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {

        //JsonData data, string key,   _defaultf 
        GetItem: function (data, key, _default) {
            var ret = _default;
            if (this.ContainsKey(data, key)) {
                ret = data[key];
            }
            // var type = typeof key;
            // ret = data[key];
            // cc.Debug.Log("GetItem type=" + type+" ret="+ret);
            return ret;
        },
        //bool   //JsonData data, string key
        ContainsKey: function (data, key) {
            if (cc.Common.isBlankString(key)) {
                return false;
            }
            if (data == null) {
                return false;
            }
            if (data[key] == null) {
                return false;
            }
            return true;
        }


    },
});

cc.JsonUtil = module.export = JsonUtil; 
