var UIViewController = require("UIViewController");
// var Common = require("Common"); 
var UIView = require("UIView");
var GameBlock = cc.Class({
    extends: UIView,
    statics: {
        GAME_MODE_NORMAL: 0,

    },

    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,

        listItem: {
            default: [],
            type: cc.BlockItemInfo
        },
        itemPosZ: -20.0,
        height_topbar_canvas: 160.0,
        height_adbanner_canvas: 160.0,
        rowTotal: 0,
        colTotal: 0,
        speed: 0,
        isStartMove: false,
        blockCount: 0,
        startOffsetY: 0,
    },
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
        this.rowTotal = 10;
        this.colTotal = 4;
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

        var speedTime = 0.1;
        this.speed = 0;
        this.isStartMove = false;
        var h;
        var rcDisplay = this.GetRectDisplay();
        h = rcDisplay.height / this.rowTotal;
        this.startOffsetY = h * (this.rowTotal - 2);
        this.schedule(this.OnUpdateSpeed, speedTime);

    },

    Init: function () {
    },

    LayOut: function () {
        var x, y, w, h;
        this.OnUpdateSpeed();
    },

    OnUpdateSpeed: function () {

        var x, y, w, h;;
        var idx = 0;
        for (let info of this.listItem) {
            var node = info.node;
            var sprite = node.getComponent(cc.Sprite);
            if (sprite == null) {
                continue;
            }
            var rc = this.GetRectItem(info.col, info.row, this.rowTotal, this.colTotal);
            var scale = this.GetItmeScaleInRect(rc, node);
            node.scaleX = scale;
            node.scaleY = scale;
            var x = rc.x + rc.width / 2;
            var y = rc.y + rc.height / 2 + this.startOffsetY;

            if (this.isStartMove) {
                info.movePosY -= this.speed;
                y = info.movePosY;
            } else {
                info.normalPosY = y;
                info.movePosY = y;
            }
            // y = info.normalPosY;

            var z = node.getPosition().z - 10;
            if (idx == 0) {
                //  cc.Debug.Log("OnUpdateSpeed " + " x=" + x + " y=" + (rc.y + rc.height / 2) + " rc=" + rc);
            }

            node.setPosition(x, y, z);
            idx++;

        }

    },
    CheckGameWin: function () {
        var isAllItemLock = true;
        for (let info of this.listItem) {
            if (info.isMain == true) {
                var isLock = this.IsItemLock(info);
                if (!isLock) {
                    isAllItemLock = false;
                }
            }

        }

        if (isAllItemLock) {
            //show game win  
            this.OnGameWin();

        }
    },


    OnGameWin: function () {
        //show game win
        cc.GameManager.main().gameLevelFinish = cc.GameManager.main().gameLevel;
        //gameEndParticle.Play();

        //记录游戏完成
        var level = cc.GameManager.main().gameLevel;
        var idx = Math.floor(level / GameBlock.GUANKA_NUM_PER_ITEM);
        var idx_sub = level % GameBlock.GUANKA_NUM_PER_ITEM;
        cc.Debug.Log("game finish idx_sub=" + idx_sub + " GUANKA_NUM_PER_ITEM=" + GameBlock.GUANKA_NUM_PER_ITEM);
        if ((idx_sub + 1) == GameBlock.GUANKA_NUM_PER_ITEM) {
            var infoitem = null;
            var key = null;
            if (cc.GameManager.gameMode == GameBlock.GAME_MODE_SHAPE) {
                infoitem = this.GetItemInfoShapeColor(idx, this.listShape);
                key = GameBlock.STR_KEY_GAME_STATUS_SHAPE + infoitem.id;
            }
            if (cc.GameManager.gameMode == GameBlock.GAME_MODE_COLOR) {
                infoitem = this.GetItemInfoShapeColor(idx, this.listColor);
                key = GameBlock.STR_KEY_GAME_STATUS_COLOR + infoitem.id;
            }
            cc.Debug.Log("game finish key=" + key + " this.gameMode=" + cc.GameManager.gameMode);
            if (key != null) {
                cc.Common.SetItemOfKey(key, GameBlock.GAME_STATUS_FINISH);
            }
        }

        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = cc.Language.main().GetString("STR_UIVIEWALERT_NO_GAME_FINISH");

        cc.ViewAlertManager.main().ShowFull(title, msg, yes, no, true, "STR_KEYNAME_VIEWALERT_GAME_FINISH",
            function (alert, isYes) {
                if (isYes) {
                    cc.GameManager.main().GotoNextLevelWithoutPlace();
                } else {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                }
            }.bind(this)
        );


    },



    RunDisapperAnimation(info) {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        var duration = 1.0;
        var action = cc.scaleTo(duration, 0, 0);
        //delay延时
        // var time = cc.delayTime(2);
        var fun = cc.callFunc(function () {
            this.CheckGameWin();
        }.bind(this));
        var seq = cc.sequence([action, fun]);
        info.node.runAction(seq);
    },


    ClearGame: function () {
        for (let info of this.listItem) {
            info.node.removeFromParent();
        }
        //清空
        this.listItem.length = 0;


    },

    LoadGame: function (mode) {

        cc.Debug.Log("LoadGame:mode=" + mode);
        this.ClearGame();
        this.blockCount = 0;
        this.isStartMove = false;
        for (let i = 0; i < this.rowTotal; i++) {
            var rdm = cc.Common.RandomRange(0, this.colTotal);
            for (let j = 0; j < this.colTotal; j++) {
                if (rdm == j) {
                    continue;
                }

                var node = this.CreateBlockItem(i, j);
                var info = new cc.BlockItemInfo();
                info.node = node;
                info.row = i;
                info.col = j;
                this.listItem.push(info);
                cc.Debug.Log("CreateBlockItem:i=" + i);
            }
        }


        this.LayOut();


    },

    StartGame: function () {
        this.isStartMove = true;
        this.speed = 10;
    },

    //创建方块
    CreateBlockItem: function (row, col) {
        var x, y, w, h;
        var name = "block_row_" + row + "_col" + col;
        var node = new cc.Node(name);
        node.parent = this.node;
        var sprite = node.addComponent(cc.Sprite)
        var pic = cc.AppRes.IMAGE_Game_Block;

        //加载图片 
        var strImage = cc.AppRes.main().URL_HTTP_HEAD + pic;
        cc.Debug.Log("strImage=" + strImage);
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            if (err) {
                cc.Debug.Log("item_pic err");
                cc.Debug.Log(err.message || err);
                return;
            }
            sprite.spriteFrame = new cc.SpriteFrame(tex);
            this.LayOut();
            this.blockCount++;
            this.scheduleOnce(this.CheckLoadGameFinish, 0.5);

        }.bind(this));

        return node;
    },

    CheckLoadGameFinish: function () {
        cc.Debug.Log("CreateBlockItem:this.blockCount=" + this.blockCount);
        if (this.blockCount >= this.listItem.length) {
            //所有block显示完成
            this.StartGame();
        }
    },

    GetItmeScaleInRect: function (rc, node) {
        var scale = 1.0;
        var sprite = node.getComponent(cc.Sprite);
        var size = node.getContentSize();
        //var size =cc.size(sprite.spriteFrame.getRect().width,sprite.spriteFrame.getRect().height) ;//node.getContentSize();
        var ratio = 0.7;
        if ((size.width != 0) && (size.height != 0)) {
            var scalex = rc.width * ratio / size.width;
            var scaley = rc.height * ratio / size.height;
            scale = Math.min(scalex, scaley);
        }
        //  cc.Debug.Log("node scale = " + scale + " size=" + size + " rc=" + rc);
        return scale;
    },
    GetRectDisplay: function () {
        var x, y, w, h;
        var sizeCanvas = cc.Common.appSceneMain.sizeCanvas;
        var ratio = 0.9;
        w = (sizeCanvas.width) * ratio;
        h = (sizeCanvas.height - this.height_topbar_canvas - this.height_adbanner_canvas);
        var rc = new cc.Rect(-w / 2, -sizeCanvas.height / 2 + this.height_adbanner_canvas, w, h);
        return rc;
    },
    //c.Rect
    GetRectItem: function (i, j, row, col) {
        var x, y, w, h;
        var rcDisplay = this.GetRectDisplay();
        w = rcDisplay.width / col;
        h = rcDisplay.height / row;
        x = rcDisplay.x + w * i;
        y = rcDisplay.y + h * j;
        var rc = new cc.Rect(x, y, w, h);
        return rc;
    },
    OnTouchDown: function (pos) {

    },
    OnTouchMove: function (pos) {


    },
    OnTouchUp: function (pos) {

    },

    OnUITouchEvent: function (ev, status, event) {

        var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点

        switch (status) {
            case cc.UITouchEvent.TOUCH_DOWN:
                this.OnTouchDown(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_MOVE:
                this.OnTouchMove(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_UP:
                this.OnTouchUp(posnodeAR);
                break;
        }
    },
});
