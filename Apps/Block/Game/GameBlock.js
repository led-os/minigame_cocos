var UIViewController = require("UIViewController");
var GameBase = require("GameBase");
var UIView = require("UIView");
var GameBlock = cc.Class({
    extends: GameBase,
    statics: {
        GAME_MODE_NORMAL: 0,

        GAME_STATUS_OVER: -1,
        GAME_STATUS_NONE: 0,
        GAME_STATUS_START: 1,
        GAME_STATUS_WIN: 2,
    },

    properties: {
        imageLine: cc.Sprite,//游戏线，碰到就游戏结束
        textTitle: cc.Label,

        listItem: {
            default: [],
            type: cc.BlockItemInfo
        },
        itemPosZ: -20.0,
        height_topbar_canvas: 160.0,
        height_adbanner_canvas: 160.0,
        rowTotalNorml: 0,
        rowTotal: 0,
        colTotal: 0,
        speed: 0,
        isStartMove: false,
        blockCount: 0,
        blockTotal: 0,
        startOffsetY: 0,
        rowTouch: 0,
        colTouch: 0,
    },
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
        this.rowTotalNorml = 10;
        this.rowTotal= this.rowTotalNorml;
        this.colTotal = 4;
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

        this.speedTime = 0.1;
        this.speed = 0;
        this.isStartMove = false;
        var h;
        var rcDisplay = this.GetRectDisplay();
        h = rcDisplay.height / this.rowTotal;
        this.startOffsetY = h * (this.rowTotal - 2);

        this.gameStatus = GameBlock.GAME_STATUS_NONE;
    },

    Init: function () {
    },

    LayOut: function () {
        var x, y, w, h;
        this.OnUpdateSpeed();
    },

    OnUpdateSpeed: function () {
        if (this.gameStatus == GameBlock.GAME_STATUS_OVER) {
            return;
        }
        var x, y, w, h;;
        var idx = 0;
        for (let info of this.listItem) {
            var node = info.node;
            if (node == null) {
                continue;
            }
            var sprite = node.getComponent(cc.Sprite);
            if (sprite == null) {
                continue;
            }
            var rc = this.GetRectItem(info.col, info.row, this.rowTotalNorml, this.colTotal);
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

            var isOver = this.CheckGameOver(node);
            if (isOver) {
                this.OnGameOver();
            }
            idx++;

        }

    },

    //return isGameOver
    CheckGameOver: function (node) {
        var y = node.getPosition().y - node.getBoundingBox().height / 2;
        var y_bottom = this.imageLine.node.getPosition().y + this.imageLine.node.getBoundingBox().height / 2;
        if (y <= y_bottom) {
            //game over
            return true;
        }
        return false;
    },


    OnGameOver: function () {
        if (this.gameStatus == GameBlock.GAME_STATUS_OVER) {
            return;
        }
        // this.isStartMove = false;
        this.unschedule(this.OnUpdateSpeed);

        this.gameStatus = GameBlock.GAME_STATUS_OVER;

        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = cc.Language.main().GetString("STR_UIVIEWALERT_NO_GAME_FINISH");

        cc.ViewAlertManager.main().ShowFull(title, msg, yes, no, true, "STR_KEYNAME_VIEWALERT_GAME_FINISH",
            function (alert, isYes) {
                if (isYes) {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                } else {

                }
            }.bind(this)
        );


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



    ClearGame: function () {
        for (let info of this.listItem) {
            if (info.node != null) {
                info.node.removeFromParent();
            }
        }
        //清空
        this.listItem.length = 0;
        this.gameStatus = GameBlock.GAME_STATUS_NONE;
    },

    LoadGame: function (mode) {

        cc.Debug.Log("LoadGame:mode=" + mode);
        this.ClearGame();
        this.blockCount = 0;
        this.isStartMove = false;
        this.blockTotal = 0;
        for (let i = 0; i < this.rowTotal; i++) {
            var rdm = cc.Common.RandomRange(0, this.colTotal);
            for (let j = 0; j < this.colTotal; j++) {
                var info = new cc.BlockItemInfo();
                if (rdm != j) {
                    var node = this.CreateBlockItem(i, j);
                    info.node = node;
                } else {
                    info.node = null;
                }

                info.row = i;
                info.col = j;
                this.listItem.push(info);
                cc.Debug.Log("CreateBlockItem:i=" + i);
            }
        }

        this.GetBlockTotal();

        this.LayOut();


    },

    GetBlockTotal: function () {
        this.blockTotal = 0;
        for (let infotmp of this.listItem) {
            if (infotmp.node != null) {
                this.blockTotal++;
            }
        }
    },

    StartGame: function () {
        return;
        cc.Debug.Log("StartGame ");
        this.isStartMove = true;
        this.speed = 10;
        this.gameStatus = GameBlock.GAME_STATUS_START;
        this.schedule(this.OnUpdateSpeed, this.speedTime);
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
        cc.Debug.Log("CreateBlockItem:this.blockCount=" + this.blockCount + " this.blockTotal=" + this.blockTotal);
        if (this.blockCount >= this.blockTotal) {
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
        cc.Debug.Log("node scale = " + scale + " size=" + size + " rc=" + rc);
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

    //计算touch后放置新生成的block item 的row index
    GetNewBlockRow: function () {
        this.rowTouch = 0;
        for (var i = 0; i < this.rowTotal; i++) {
            var index = i * this.colTotal + this.colTouch;
            var info = this.listItem[index];
            if (info.node != null) {
                this.rowTouch = i - 1;
                break;
            }
        }
        if (this.rowTouch >= 0) {
            //insert block
            // var index = this.rowTouch * this.colTotal + this.colTouch;
            // var info = this.listItem[index];
            // var node = this.CreateBlockItem(this.rowTouch, this.colTouch);
            // info.node = node;
            //判断是否需要消除该行

        } else {
            //new line


            //先row+1
            this.rowTotal++;
            for (let infotmp of this.listItem) {
                infotmp.row += 1;
            }

            for (var i = this.colTotal - 1; i >= 0; i--) {

                var info = new cc.BlockItemInfo();
                if (i == this.colTouch) {
                    var node = this.CreateBlockItem(0, i);
                    info.node = node;
                }
                info.row = 0;
                info.col = i;
                // 拼接函数(索引位置, 元素的数量, 元素)
                this.listItem.splice(0, 0, info);

            }
            this.LayOut();
        }
        this.GetBlockTotal();
    },

    OnTouchDown: function (pos) {
        var size = this.node.getContentSize();
        var w_item = size.width / this.colTotal;
        var idx = Math.floor((pos.x - (-size.width / 2)) / w_item);
        cc.Debug.Log("OnTouchDown idx=" + idx);
        this.colTouch = idx;
        this.GetNewBlockRow();
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
