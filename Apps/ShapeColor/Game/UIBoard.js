var UIView = require("UIView");
var UIBoard = cc.Class({
    extends: UIView,// cc.ItemInfo,

    statics: {
        LINE_WIDTH: 10,

    },

    properties: {
        drawLeft: cc.Graphics,
        drawRight: cc.Graphics,
        drawTop: cc.Graphics,
        drawBottom: cc.Graphics,
        lineWidth: 0,

        offsetBottomWithAdBanner: 0,

    },

    onLoad: function () {
        this.lineWidth = UIBoard.LINE_WIDTH;
        this.node.setContentSize(this.node.parent.getContentSize());
       
        this.LayOut();
    },
    LayOut: function () {
        this._super();
        this.Draw();
    },

    Draw: function () {
        this.offsetBottomWithAdBanner = cc.AdKitCommon.main.heightAdCanvas;
        cc.Debug.Log("offsetBottomWithAdBanner ="+this.offsetBottomWithAdBanner);
        this.InitDraw(this.drawLeft);
        this.InitDraw(this.drawRight);
        this.InitDraw(this.drawTop);
        this.InitDraw(this.drawBottom);
    },

    InitDraw: function (draw) {
        draw.clear(true);
        draw.lineWidth = this.lineWidth;
        draw.strokeColor = cc.Color.WHITE;
        var x, y, w, h, posstart, posend, w_node, h_node;

        w_node = this.node.getContentSize().width;
        h_node = this.node.getContentSize().height;
        var oft_line = this.lineWidth / 2;
        if (draw == this.drawLeft) {
            posstart = new cc.Vec2(-w_node / 2 + oft_line, -h_node / 2);
            posend = new cc.Vec2(-w_node / 2 + oft_line, h_node / 2);
            posstart.y += this.offsetBottomWithAdBanner;

            w = this.lineWidth;
            h = posend.y-posstart.y;
            x = -w_node / 2 + oft_line;
            y = 0;
        }
        if (draw == this.drawRight) {
            posstart = new cc.Vec2(w_node / 2 - oft_line, -h_node / 2);
            posend = new cc.Vec2(w_node / 2 - oft_line, h_node / 2);
            posstart.y += this.offsetBottomWithAdBanner;
            w = this.lineWidth;
            h = h_node;
            x = w_node / 2 - oft_line;
            y = 0;
        }

        if (draw == this.drawTop) {
            posstart = new cc.Vec2(-w_node / 2, h_node / 2 - oft_line);
            posend = new cc.Vec2(w_node / 2, h_node / 2 - oft_line);

            h = this.lineWidth;
            w = w_node;
            y = h_node / 2 - oft_line;
            x = 0;
        }

        if (draw == this.drawBottom) {
            posstart = new cc.Vec2(-w_node / 2, -h_node / 2 + oft_line);
            posend = new cc.Vec2(w_node / 2, -h_node / 2 + oft_line);
            posstart.y += this.offsetBottomWithAdBanner;
            posend.y += this.offsetBottomWithAdBanner;

            h = this.lineWidth;
            w = w_node;
            y = posstart.y;
            x = 0;
        }


        draw.moveTo(posstart.x, posstart.y);
        draw.lineTo(posend.x, posend.y);
        draw.stroke();

        var collider = draw.node.getComponent(cc.PhysicsBoxCollider);
        if (collider != null) {

            collider.size = cc.size(w, h);
            collider.offset = cc.v2(x, y);
            cc.Debug.Log("collider.size=  " + collider.size);

        }
    },

});

