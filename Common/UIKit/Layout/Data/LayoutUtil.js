// var Common = require("Common");


//对齐
var LayoutUtil = cc.Class({
    extends: cc.Object,

    statics: {
        //enum 

    },

    properties: {

    },

    //两个node之间的中心位置x
    GetBetweenCenterX: function (node1, node2) {
        var nodeleft, noderight;
        if (node1.getPosition().x < node2.getPosition().x) {
            nodeleft = node1;
            noderight = node2;
        } else {
            nodeleft = node2;
            noderight = node1;
        }
        var rctran = nodeleft.getComponent(cc.RectTransform);
        var v1 = nodeleft.getPosition().x + rctran.width / 2;
        rctran = noderight.getComponent(cc.RectTransform);
        var v2 = noderight.getPosition().x - rctran.width / 2;
        return (v1 + v2) / 2;
    },
    //两个node之间的中心位置y
    GetBetweenCenterY: function (node1, node2) {
        var nodeDown, nodeUp;
        if (node1.getPosition().y < node2.getPosition().y) {
            nodeDown = node1;
            nodeUp = node2;
        } else {
            nodeDown = node2;
            nodeUp = node1;
        }
        var rctran = nodeDown.getComponent(cc.RectTransform);
        var v1 = nodeDown.getPosition().y + rctran.height / 2;
        rctran = nodeUp.getComponent(cc.RectTransform);
        var v2 = nodeUp.getPosition().y - rctran.height / 2;
        return (v1 + v2) / 2;
    },

    //node和屏幕边界之间的中心位置x或者y
    GetBetweenScreenCenter: function (node, align) {
        var v1 = 0, v2 = 0;
        var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
        var rctran = node.getComponent(cc.RectTransform);
        switch (align) {
            case cc.Align.LEFT:
                {
                    //左边界
                    v1 = -sizeCanvas.width / 2;
                    v2 = node.getPosition().x - rctran.width / 2;
                }
                break;
            case cc.Align.RIGHT:
                {
                    //右边界
                    v1 = sizeCanvas.width / 2;
                    v2 = node.getPosition().x + rctran.width / 2;
                }
                break;
            case cc.Align.UP:
                {
                    //上边界
                    v1 = sizeCanvas.height / 2;
                    v2 = node.getPosition().y + rctran.height / 2;
                }
                break;
            case cc.Align.DOWN:
                {
                    //下边界
                    v1 = -sizeCanvas.height / 2;
                    v2 = node.getPosition().y - rctran.height / 2;
                }
                break;
        }

        return (v1 + v2) / 2;
    },

    GetChildCount: function (node, includeHide = true) {
        var count = 0;
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }
            //     GameObject objtmp = child.gameObject;
            //     if (this.gameObject == objtmp) {
            //         continue;
            //     }

            if (!includeHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }

            var le = child.getComponent(cc.LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }

            //     if (objtmp.transform.parent != this.gameObject.transform) {
            //         //只找第一层子物体
            //         continue;
            //     }
            count++;
        }

        return count;
    },

});



LayoutUtil._main = null;
LayoutUtil.main = function () {
    if (!LayoutUtil._main) {
        LayoutUtil._main = new LayoutUtil();
    } else {
    }
    return LayoutUtil._main;
}

cc.LayoutUtil = module.export = LayoutUtil; 
