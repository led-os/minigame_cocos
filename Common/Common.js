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
        CLOUD_RES_DIR_NAME: "CloudRes",//放在云端的资源
        CLOUD_RES_DIR: "GameRes/CloudRes",//放在云端的资源
        RES_CONFIG_DATA: "ConfigData",
        RES_CONFIG_DATA_COMMON: "ConfigDataCommon",
        THUMB_SUFFIX: "_thumb",
        TOUCH_MOVE_STEP_MIN: 3.0,//6.0f

        //默认参考设计分辨率
        WIDTH_DESIGN_DEFAULT: 2048,
        HEIGHT_DESIGN_DEFAULT: 1536,

        gold: 0,

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


        GetSizeCanvas: function (canvas) {

            var isFitHeight = true;
            var isFitWidth = false;
            //初始化分辨率相关参数
            var size = cc.size(cc.Common.WIDTH_DESIGN_DEFAULT, cc.Common.HEIGHT_DESIGN_DEFAULT) // this.canvasMain.designResolution; 参考设计分辨率
            if (canvas != null) {
                size = canvas.designResolution;
                isFitHeight = canvas.fitHeight;
                isFitWidth = canvas.fitWidth;
            }
            var sizeCanvas = cc.size(0, 0);
            let screenSize = cc.view.getVisibleSize();//屏幕分辨率
            if (isFitHeight) {
                sizeCanvas.height = size.height;
                sizeCanvas.width = screenSize.width * sizeCanvas.height / screenSize.height;
            }

            if (isFitWidth) {
                sizeCanvas.width = size.width;
                sizeCanvas.height = screenSize.height * sizeCanvas.width / screenSize.width;
            }

            //cc.Debug.Log("canvasMain size=" + size);
            //cc.Debug.Log("screen size width=" + screenSize.width + ",height=" + screenSize.height);
           // cc.Debug.Log("sizeCanvas size=" + sizeCanvas);
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
            //cc.Debug.Log("RGBString2Color:list="+list.length);

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

        String2Int(str) {
            return parseInt(str);
        },

        //without max
        RandomRange: function (min, max) {
            var count = max - min;
            //floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数 
            var rdm = min + Math.floor((Math.random() * count));
            if (rdm >= max) {
                rdm = max - 1;
            }
            if (rdm < min) {
                rdm = min;
            }
            return rdm;
        },

        //从数组里随机抽取newsize个元素
        RandomIndex: function (size, newsize) {
            var listIndex = [];
            var total = size;
            for (var i = 0; i < total; i++) {
                listIndex.push(i);
            }

            var idxTmp = [];//new int[newsize];
            for (var i = 0; i < newsize; i++) {
                total = listIndex.length;
                var rdm = Math.floor((Math.random() * total));
                var idx = listIndex[rdm];
                idxTmp.push(idx);
                //listIndex.RemoveAt(rdm);
                listIndex.splice(rdm, 1);
            }

            return idxTmp;
        },

        //随机打乱string
        RandomString(str) {
            var ret = "";
            var indexSel = this.RandomIndex(str.length, str.length);
            for (var i = 0; i < indexSel.length; i++) {
                var idx = indexSel[i];
                var strtmp = str.substr(idx, 1);
                ret += strtmp;
            }
            return ret;
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
            return pt;
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
            var v = "";
            if (cc.Common.main().isWeiXin) {
                v = wx.getStorageSync(key);
                if (!Common.isKeyExistWeiXin(v)) {
                    //cc.Debug.Log("key is null:" + key);
                    return default_value;
                }
                cc.Debug.Log("GetItemOfKey wx key=" + key + " value=" + v);
            } else {
                v = cc.sys.localStorage.getItem(key);
                if (Common.isBlankString(v)) {
                    //cc.Debug.Log("key is null:" + key);
                    return default_value;
                }
            }

            return v;
        },
        SetItemOfKey: function (key, value) {
            if (cc.Common.main().isWeiXin) {
                wx.setStorageSync(key, value);
                cc.Debug.Log("SetItemOfKey wx key=" + key + " value=" + value);
                var v = wx.getStorageSync(key);
                cc.Debug.Log("SetItemOfKey wx key now =" + key + " v=" + v);
            } else {
                cc.sys.localStorage.setItem(key, value);
            }
        },

        SetBoolOfKey: function (key, value) {
            if (cc.Common.main().isWeiXin) {
                wx.setStorageSync(key, value);
                cc.Debug.Log("SetBoolOfKey wx key=" + key + " value=" + value);
            } else {
                cc.sys.localStorage.setItem(key, value.toString());
            }
        },

        GetBoolOfKey: function (key, default_value) {
            if (cc.Common.main().isWeiXin) {
                var v = wx.getStorageSync(key);
                cc.Debug.Log("GetBoolOfKey wx key=" + key + " value=" + v + " type=" + typeof v);
                if (!Common.isKeyExistWeiXin(v)) {
                    cc.Debug.Log("GetBoolOfKey key is null:" + key);
                    return default_value;
                }
                return v;
            }
            else {
                var v = cc.sys.localStorage.getItem(key);
                //微信小程序key不存在的时候返回""而非null
                if (Common.isBlankString(v)) {
                    cc.Debug.Log("GetBoolOfKey key is null:" + key);
                    return default_value;
                }
                cc.Debug.Log("GetBoolOfKey key is :" + key + " v=" + v + " typeof=" + typeof v);
                // if (cc.Common.main().isWeiXin) {
                //     return v;
                // }
                //cc.sys.localStorage.setItem 保存 bool变量的时候有一些平台实际保存的是"true"和“false"字符串
                var type = typeof v;
                if ("boolean" == type) {
                    //微信小程序
                    return v;
                }

                if ("string" == type) {
                    if (v == "true") {
                        return true;
                    } else {
                        return false;
                    }
                }

                return v;
            }

        },

        GetIntOfKey: function (key, default_value) {
            var v = cc.sys.localStorage.getItem(key);
            //微信小程序key不存在的时候返回""而非null
            if (Common.isBlankString(v)) {
                cc.Debug.Log("key is null:" + key);
                return default_value;
            }

            var v_int = parseInt(v);
            //cc.Debug.Log("GetIntOfKey key=:" + key + " v=" + v + " v_int=" + v_int);
            return v_int;
        },
        isBlankString: function (str) {
            if (typeof str == "undefined" || str == null || str == "") {
                return true;
            } else {
                return false;
            }
        },

        //判断微信getStorage key是否存在
        isKeyExistWeiXin: function (value) {
            var type = typeof value;
            if (type == "string") {
                return !Common.isBlankString(value);
            }
            if ("boolean" == type) {
                //微信小程序
                return true;
            }

            return true;
        },

        GetButtonText: function (btn) {
            return "btn";
          //  return btn.node.getChildByName("Label").getComponent(cc.Label);
        },

        //字符串显示大小
        GetTextSize: function (text, fontsize) {
            var node = new cc.Node("GetTextSize");
            var labelTmp = node.addComponent(cc.Label);
            labelTmp.fontSize = fontsize;
            labelTmp.string = text;
            //labelTmp.overflow = cc.Label.Overflow.NONE; 
            cc.director.getScene().addChild(node);
            node.active = false;

            var size = labelTmp.node.getContentSize();


            cc.Debug.Log("labelTmp size= " + size + " bd=" + labelTmp.node.getBoundingBox());



            //labelTmp.string = "A我";
            // labelTmp.overflow = cc.Label.Overflow.RESIZE_HEIGHT;

            //active 从false变成true 会重新刷新
            node.active = true;

            size = labelTmp.node.getContentSize();
            //cc.Debug.Log("labelTmp2 size= " + size + " bd=" + labelTmp.node.getBoundingBox());

            node.removeFromParent(true);
            //Common.GetTextHeight(text, fontsize);
            return size;
        },

        GetTextWidth: function (text, fontsize) {
            var node = new cc.Node("GetTextWidth");
            var labelTmp = node.addComponent(cc.Label);
            labelTmp.fontSize = fontsize;
            labelTmp.string = text;
            //labelTmp.overflow = cc.Label.Overflow.NONE; 
            cc.director.getScene().addChild(node);
            node.active = false;

            var size = labelTmp.node.getContentSize();


            //active 从false变成true 会重新刷新
            node.active = true;

            size = labelTmp.node.getContentSize();


            //cc.Debug.Log("labelTmp size= " + size + " bd=" + labelTmp.node.getBoundingBox());


            node.removeFromParent(true);
            return size.width;
        },
        GetTextHeight: function (text, fontsize) {
            var node = new cc.Node("GetTextHeight");
            var labelTmp = node.addComponent(cc.Label);

            labelTmp.fontSize = fontsize;
            labelTmp.string = text;
            //labelTmp.string = "A我";

            labelTmp.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            cc.director.getScene().addChild(node);
            // node.active = false; 

            var size = labelTmp.node.getContentSize();
            var h = size.height;
            // h = node.width;
            cc.Debug.Log("labelTmp GetTextHeight h= " + h + " size=" + size + " fontsize=" + fontsize);


            node.removeFromParent(true);
            return h;
        },

        OpenApp: function (appid) {
            if (cc.Common.main().isWeiXin) {
                wx.navigateToMiniProgram({
                    appId: appid,
                    success(res) {
                        // 打开其他小程序成功同步触发
                        // wx.showToast({
                        //     title: '跳转成功'
                        // })
                    }
                })
            }
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
        //get 和 set 函数不能放在statics里
        isAndroid: {
            get: function () {
                //cc.Debug.Log("isAndroid");
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

        isWeiXin: {
            get: function () {
                return (cc.sys.platform == cc.sys.WECHAT_GAME) ? true : false;
            },

        },

        isFacebook: {
            get: function () {
                return false;
                return (cc.sys.platform == cc.sys.WECHAT_GAME) ? true : false;
            },

        },

        noad:
        {
            get: function () {
                var key = "APP_NO_AD";
                var ret = Common.GetBoolOfKey(key, false);
                return ret;
            },
            set: function (value) {
                var key = "APP_NO_AD";
                Common.SetItemOfKey(key, value);
                // if (value) {
                //     ret = 1;
                //     AdConfig.main.SetNoAd();
                // }
                // else {
                //     ret = 0;
                // }
                // PlayerPrefs.SetInt(key, ret);
            },
        },
    },

    Init: function () {

    },

    JsonDataContainsKey: function (json, key) {
        return true;
        // return (json.key == null ? false : true);
    },

    GetAppVersion: function () {
        return "ver 1.0.0";
    },


});

//Common.main2 = new Common();
Common._main = null;
Common.main = function () {
    if (!Common._main) {
        // cc.Debug.Log("_main is null");
        Common._main = new Common();
    } else {
        // cc.Debug.Log("_main is not null");
    }
    return Common._main;
}

cc.Common = module.export = Common;

