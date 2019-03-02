var Dictionary = require("Dictionary");
//var Config = require("Config");

//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var Common = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        GAME_DATA_DIR: "GameData",//streamingAssetsPath下的游戏配置等数据
        GAME_DATA_DIR_COMMON: "GameData/common",
        GAME_RES_DIR: "GameRes",//streamingAssetsPath 下的游戏图片等资源

        RES_CONFIG_DATA: "ConfigData",
        RES_CONFIG_DATA_COMMON: "ConfigDataCommon",
        THUMB_SUFFIX: "_thumb",
        TOUCH_MOVE_STEP_MIN: 3.0,//6.0f

        //默认参考设计分辨率
        WIDTH_DESIGN_DEFAULT: 2048,
        HEIGHT_DESIGN_DEFAULT: 1536,

        //cocos2d-js中Math对象的常用方法总结
        //https://blog.csdn.net/lianghui0811/article/details/76525065?utm_source=blogxgwz4
        GetBestFitScale: function (w_content, h_content, w_rect, h_rect) {
            if ((w_rect == 0) || (h_rect == 0)) {
                return 1;
            }
            var scalex = w_rect / w_content;
            var scaley = h_rect / h_content;
            var scale = Math.min(scalex, scaley);
            return scale;
        },

        GetMaxFitScale: function (w_content, h_content, w_rect, h_rect) {
            if ((w_rect == 0) || (h_rect == 0)) {
                return 1;
            }
            var scalex = w_rect / w_content;
            var scaley = h_rect / h_content;
            var scale = Math.max(scalex, scaley);
            return scale;
        },


        GetSizeCanvas: function (sizeDesign) {
            //初始化分辨率相关参数
            var size = cc.size(cc.Common.WIDTH_DESIGN_DEFAULT, cc.Common.HEIGHT_DESIGN_DEFAULT) // this.canvasMain.designResolution; 参考设计分辨率
            if (sizeDesign != null) {
                size = sizeDesign;
            }
            var sizeCanvas = cc.size(0, 0);
            sizeCanvas.height = size.height;
            //cc.log("canvasMain size=" + size);
            let screenSize = cc.view.getVisibleSize();//屏幕分辨率
            //cc.log("screen size width=" + screenSize.width + ",height=" + screenSize.height);

            sizeCanvas.width = screenSize.width * sizeCanvas.height / screenSize.height;
            //cc.log("sizeCanvas size=" + sizeCanvas);
            return sizeCanvas;
        },

        GetSizeOfParnet: function (node) {
            var sizeParent = node.parent.getContentSize();
            var w_parent = sizeParent.width;
            var h_parent = sizeParent.height;
            var sizeCanvas = cc.Common.GetSizeCanvas(null);//屏幕分辨率
            if (w_parent == 0) {
                w_parent = sizeCanvas.width;
            }
            if (h_parent == 0) {
                h_parent = sizeCanvas.height;
            }
            return new cc.size(w_parent, h_parent);

        },

        // 255,100,200 to color return cc.Color 47,47,47

        RGBString2Color: function (strrgb) {
            var r, g, b;
            var strsplit = ",";
            var list = strrgb.split(strsplit);
            var index = 0;
            //cc.log("RGBString2Color:list="+list.length);

            for (let value of list) {
                if (index == 0) {
                    r = parseInt(value);
                }
                if (index == 1) {
                    g = parseInt(value);
                }
                if (index == 2) {
                    b = parseInt(value);
                }
                index++;
            }

            var color = new cc.Color(r, g, b, 255);//Color(r, g, b, 1f);
            return color;
        },

        //return bool
        CheckAllLoad: function (listProLoad) {
            var isLoadAll = true;
            for (let info of listProLoad) {
                if (info.isLoad == false) {
                    isLoadAll = false;
                }
            }
            return isLoadAll;
        },

        GetLoadItemById: function (list, strId) {
            for (var info of list) {
                if (info.id == strId) {
                    return info;
                }
            }
            return null;
        },
        //without max
        RandomRange: function (min, max) {
            var count = max - min;
            //floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数 
            var rdm = min + Math.floor((Math.random() * count));
            if (rdm >= max) {
                rdm = max - 1;
            }
            return rdm;
        },
        //防止超出Rect范围
        LimitNodePos: function (node, rc) {
            var bd = node.getBoundingBox();
            var pt = node.getPosition();
            if ((pt.x + bd.width / 2) > (rc.x + rc.width)) {
                pt.x = rc.x + rc.width - bd.width / 2;
            }
            if ((pt.x - bd.width / 2) < rc.x) {
                pt.x = rc.x + bd.width / 2;
            }

            if ((pt.y + bd.height / 2) > (rc.y + rc.height)) {
                pt.y = rc.y + rc.height - bd.height / 2;
            }
            if ((pt.y - bd.height / 2) < rc.y) {
                pt.y = rc.y + bd.height / 2;
            }
            node.setPosition(pt);
        },

        //物理系统默认是关闭的，手动开启物理系统
        EnablePhysic: function (isEnable, isDebug) {
            cc.director.getPhysicsManager().enabled = isEnable;
            //this.is_debug = true;
            if (isDebug == true) { // 开启调试信息
                var Bits = cc.PhysicsManager.DrawBits; // 这个是我们要显示的类型
                cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
            }
            else { // 关闭调试信息
                cc.director.getPhysicsManager().debugDrawFlags = 0;
            }
        },

        GetItemOfKey: function (key, default_value) {
            var v = cc.sys.localStorage.getItem(key);
            if (v == null) {
                return default_value;
            }
            // var v_int = parseInt(v);
            return v;
        },
        SetItemOfKey: function (key, value) {
            var str = value.toString();
            cc.sys.localStorage.setItem(key, str);
        },
        appSceneMain: null,

        // _appSceneBase: null,
        // appSceneBase: {
        //     get: function () {
        //         return this._appSceneBase;
        //     },
        //     set: function (value) {
        //         this._appSceneBase = value;
        //     },
        // },


    },

    properties: {
        isAndroid: {
            get: function () {
                cc.log("isAndroid");
                return (cc.sys.platform == cc.sys.OS_ANDROID) ? true : false;
            },
            // set: function (value) {
            //     this._width = value;
            // },
        },

        isiOS: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_IOS) ? true : false;
            },
        },


        isWin: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_WINDOWS) ? true : false;
            },

        },

    },

    Init: function () {

    },

    JsonDataContainsKey: function (json, key) {
        return true;
        // return (json.key == null ? false : true);
    },


});

//Common.main2 = new Common();
Common._main = null;
Common.main = function () {
    if (!Common._main) {
        cc.log("_main is null");
        Common._main = new Common();
    } else {
        cc.log("_main is not null");
    }
    return Common._main;
}

cc.Common = module.export = Common;

