var Dictionary = require("Dictionary");
//https://blog.csdn.net/weixin_37243717/article/details/79835643
//https://github.com/mholt/PapaParse

var CSVParser = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    properties: {
        listLine: new Array(),//当前行数组
        listTable: new Array(),//整个内容表
        KEY_WORD_YINHAO: "\"",//英文输入法下的引号
        KEY_WORD_YINHAO2: "”",//中文输入法下的引号
        KEY_WORD_SPLIT: ",",//分割符
        KEY_WORD_CANCEL: "#",//分割符
    },
    ReadData: function (str) {
        this.SplitAllLine(str);

        // for (var row = 0; row < this.listTable.length; row++) {

        //     for (var col = 0; col < this.listTable[row].length; col++) {
        //         var str = this.GetText(row, col);
        //         cc.Debug.Log("row=" + row + " col=" + col + " :" + str);
        //     }
        // }

    },

    //整个str分割行数
    SplitAllLine: function (str) {
        // cc.Debug.Log("SplitAllLine=" + str);
        var list = str.split("\n");
        // list.forEach(function (value, index) {
        //     cc.Debug.Log("line "+index+" =" + value);
        // }.bind(this));

        var index = 0;
        for (let value of list) {
            // cc.Debug.Log("line " + index + " =" + value);
            if (value.length > 0) {
                if (value[0] == this.KEY_WORD_CANCEL) {
                    // 去掉注释
                    continue;
                }
            }
            //删除回车符号\r
            var v_new = value.replace("\r", "");
            this.SplitLine(v_new);
            index++;
        }
    },

    //按,分割一行
    SplitLine: function (str) {

        //var list = str.split(this.KEY_WORD_SPLIT);
        var list = new Array();
        var pos = 0;
        var ishas_split = false;//是否有分割符
        var yinhao_pos_start = -1;
        var yinhao_pos_end = -1;
        var strYinhao = "";
        for (var i = 0; i < str.length; i++) {
            //cc.Debug.Log("SplitLine:"+str[i]);
            var word = str[i];

            if (yinhao_pos_start >= 0) {
                //skip 引号
                if ((i <= yinhao_pos_end) && (i != str.length - 1)) {
                    continue;
                }
            }


            if (word == this.KEY_WORD_SPLIT) {
                ishas_split = true;
                //substring:pos to (i-1)
                var len = (i - 1) - pos + 1;
                var strtmp = str.substr(pos, len);
                //cc.Debug.Log("SplitLine:" + strtmp);
                list.push(strtmp);
                pos = i + 1;
            }

            if ((word == this.KEY_WORD_YINHAO) || (word == this.KEY_WORD_YINHAO2)) {
                strYinhao = word;
                var skip_step = 0;
                //查找下一个引号
                //"亲,好玩,现在就去赞一个？","Pro, fun, and now to praise a?"
                var postmp = str.indexOf(strYinhao, i + 1);
                if (postmp >= 0) {
                    yinhao_pos_start = i;
                    yinhao_pos_end = postmp;
                    //has found
                    skip_step = postmp - i + 1;
                    //cc.Debug.Log("postmp=" + postmp + " skip_step=" + skip_step);
                }
                // i += skip_step;
            }
            if (i == str.length - 1) {
                if (ishas_split == true) {
                    //添加最后一个分割符后的子串

                    var len = i - pos + 1;
                    var strtmp = str.substr(pos, len);
                    //cc.Debug.Log("SplitLine:" + strtmp);
                    list.push(strtmp);

                } else {
                    //整个
                    cc.Debug.Log("SplitLine add all:str=" + str);
                    list.push(str);
                }
            }

        }



        var index = 0;
        for (let value of list) {
            //  cc.Debug.Log("SplitLine list=" + value);
            index++;
        }
        this.listTable.push(list);
    },

    GetText: function (row, col) {
        var str = "";
        var list = this.listTable[row];
        str = list[col];
        // str = this.listTable[row][col];
        return str;
    },

    GetRowCount: function () {
        return this.listTable.length;
    },

});

//CSVParser.main = new CSVParser();


