//https://blog.csdn.net/themagickeyjianan/article/details/86018191
var http = {

    /**
     * 功能：get请求
     * @param url
     * @param path
     * @param params
     * @param cb
     */
    get: function (url, cb) {
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

    /**
     * 功能：post请求
     *     1）与get区别就是post能带数据body，其余均一样
     * @param url
     * @param path
     * @param params
     * @param body
     * @param cb
     */
    post: function (url, path, params, body, cb) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        // true代表异步
        xhr.open("POST", requestURL, true);

        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }

        if (body) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = xhr.responseText;
                    if (cb) {
                        cb(null, ret);
                    }
                } catch (e) {
                    console.log("err:" + e);
                    cb(e, null);
                }
            }
        }

        //
        if (body) {
            xhr.send(body);
        }

        return xhr;
    },

    /**
     * 功能：下载
     * @param url
     * @param path
     * @param params
     * @param cb
     */
    download: function (url, path, params, cb) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.responseType = "arraybuffer";
        xhr.open("GET", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var buffer = xhr.response;

                //
                var data = new Uint8Array(buffer);

                cb(null, data);
            }
        }

        xhr.send();
        return xhr;
    }

}

module.exports = http;