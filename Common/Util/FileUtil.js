var FileUtil = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {

        /*
        substr( ) 和 substring( )的区别

stringvar.substr(start [, length] )：返回一个从指定位置开始的指定长度的子字符串。

strVariable.substring(start，end )：返回位于String对象中指定位置的子字符串。
*/

        //文件名
        GetFileName: function (filepath) {
            var ret = filepath;
            var idx = filepath.lastIndexOf("/");
            if (idx >= 0) {
                var str = filepath.substr(0, idx + 1);
                ret = str;
                idx = str.lastIndexOf(".");
                if (idx >= 0) {
                    ret = str.substr(0, idx);
                }
            }
            else {
                idx = filepath.lastIndexOf(".");
                if (idx >= 0) {
                    ret = filepath.substr(0, idx);
                }
            }
            return ret;
        },

        //文件后缀 不包括.
        GetFileExt: function (filepath) {
            var ret = "";
            var idx = filepath.lastIndexOf(".");
            if (idx >= 0) {
                var start = idx + 1;
                var len = filepath.lenght - start;
                ret = filepath.substr(start, len);
            }
            return ret;
        },

        //除去文件后缀 
        GetFileBeforeExt: function (filepath) {
            var ret = filepath;
            var idx = filepath.lastIndexOf(".");//lastIndexOf indexOf
            if (idx >= 0) {
                ret = filepath.substr(0, idx + 1);
            }
            return ret;
        },
        //除去文件后缀  并去除.
        GetFileBeforeExtWithOutDot: function (filepath) {
            var ret = filepath;
            var idx = filepath.lastIndexOf(".");
            if (idx >= 0) {
                ret = filepath.substr(0, idx);
            }
            return ret;
        },

        //文件目录
        GetFileDir: function (filepath) {
            var ret = filepath;
            var idx = filepath.lastIndexOf("/");
            if (idx >= 0) {
                ret = filepath.substr(0, idx);
            }
            return ret;
        },

        CreateDir: function (dir) {
            // if (!Directory.Exists(dir)) {
            //     Directory.CreateDirectory(dir);
            // }
        },


        SaveFile: function (data, filepath) {
            if (cc.sys.isNative) {
                if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                    cc.Debug.Log(' write file succeed.');

                } else {
                    cc.Debug.Log(' write file failed.');
                }
            }

        },


        isFileExist: function (filepath) {
            var ret = false;
            if (cc.sys.isNative) {
                ret = jsb.fileUtils.isFileExist(filepath);
            }
            return ret;
        },




    },
});

cc.FileUtil = module.export = FileUtil; 
