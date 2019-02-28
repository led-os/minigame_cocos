//https://blog.csdn.net/themagickeyjianan/article/details/86018191

//写文件
//https://blog.csdn.net/lck8989/article/details/81021416

var HttpRequest = cc.Class({
    extends: cc.Object,
    properties: {


    },

    Get: function (url, cb) {
        //var xhr = cc.loader.getXMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        // var requestURL = url + path;
        // if (params) {
        //     requestURL = requestURL + "?" + params;
        // }
        var requestURL = url;
        xhr.open("GET", requestURL, true);

        //必须设置为arraybuffer 不然会闪退
        xhr.responseType = 'arraybuffer';

        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    //var ret = xhr.responseText;
                    var ret = xhr.response;
                    if (cb) {
                        cb(null, ret);
                    }
                } catch (e) {
                    console.log("err:" + e);
                    cb(e, null);
                }
            }
        }

        xhr.send();
        return xhr;
    },
});


cc.HttpRequest = module.exports = HttpRequest;