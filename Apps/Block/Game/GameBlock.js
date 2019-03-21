var UIViewController = require("UIViewController");
var GameBase = require("GameBase");
var UIBlockItem = require("UIBlockItem");

var GameBlock = cc.Class({
    extends: GameBase,
    statics: {
        GAME_MODE_NORMAL: 0,

        GAME_STATUS_OVER: -1,
        GAME_STATUS_NONE: 0,
        GAME_STATUS_START: 1,
        GAME_STATUS_WIN: 2,
        GAME_SPEED_VALUE: 10,
    },

    properties: {
        imageLine: cc.Sprite,//游戏线，碰到就游戏结束
        textTitle: cc.Label,
        prefabBlock: {
            default: null,
            type: cc.Prefab
        },
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
        heightItemRect: 0,
        isActionRunnig: false,

    },
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());

        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

        this.isStartMove = false;
        var h;
        var rcDisplay = this.GetRectDisplay();
        h = rcDisplay.height / this.rowTotal;
        this.startOffsetY = h * (this.rowTotal - 2);

        this.gameStatus = GameBlock.GAME_STATUS_NONE;
        this.LoadPrefab(null);
    },

    Init: function () {
    },
    LoadPrefab: function (callback) {
        var strPrefab = "App/Prefab/Game/UIBlockItem";
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.prefabBlock = prefab;;
            if (callback != null) {
                callback();
            }
        }.bind(this)
        );
    },
    LayOut: function () {
        var x, y, w, h;
        this.OnUpdateSpeed();
    },
    RunItemMoveAction: function (info, posTo, callbackFinish) {
        var duration = 0.1;
        this.PauseSpeedTime();
        // cc.Debug.Log("RunItemMoveAction start");
        var action = cc.moveTo(duration, posTo.x, posTo.y).easing(cc.easeOut(3.0));
        //delay延时 让node显示和callbackFinish同步
        var time = cc.delayTime(0.01);
        var fun = cc.callFunc(function () {
            this.ResumeSpeedTime();
            if (callbackFinish != null) {
                callbackFinish();
            }
            //cc.Debug.Log("RunItemMoveAction end");
        }.bind(this));
        var seq = cc.sequence([action, time, fun]);
        info.node.runAction(seq);
    },

    //posYTo:动画的目标位置
    UpdateItemPostion: function (info, _isAnimate, posYTo, callbackFinish, isSpeed) {
        if (this.isActionRunnig == true) {
            return;
        }
        var isAnimate = _isAnimate;
        //isAnimate = false;
        var node = info.node;
        if (node != null) {
            if (isAnimate) {
                this.PauseSpeedTime();
            }
        }


        var rc = this.GetRectItem(info.col, info.row, this.rowTotalNorml, this.colTotal);
        this.heightItemRect = rc.height;

        var x = rc.x + rc.width / 2;
        var y = rc.y + rc.height / 2 + this.startOffsetY;

        if (this.isStartMove) {
            if ((!this.isActionRunnig) && (!isAnimate) && (isSpeed)) {
                info.movePosY -= this.speed;
                // cc.Debug.Log("insert item pos isAnimate1="+info.movePosY);
            }
            y = info.movePosY;
            // if(isAnimate)
            // {
            //     cc.Debug.Log("insert item pos isAnimate2="+info.movePosY);
            // }
        } else {
            info.normalPosY = y;
            info.movePosY = y;
        }
        // y = info.normalPosY;

        var pos = new cc.Vec2(x, y);
        if (node != null) {
            if (isAnimate) {
                //pos.y = posYTo;
                this.RunItemMoveAction(info, pos, callbackFinish);
            } else {
                var z = node.getPosition().z - 10;
                node.setPosition(x, y, z);
            }
        }
    },

    //对位置有偏差进行校准
    ReLayOutItems: function () {
        var x, y, z;
        if (this.listItem.length == 0) {
            return;
        }
        var info_bootom = this.listItem[0];
        var row_bottom = info_bootom.row;
        var y_bottom = info_bootom.movePosY;
        for (let info of this.listItem) {
            info.movePosY = y_bottom + (info.row - row_bottom) * this.heightItemRect;
            var node = info.node;
            if (node != null) {
                x = node.getPosition().x;
                y = info.movePosY;
                z = node.getPosition().z - 10;
                node.setPosition(x, y, z);
            }
        }
    },
    OnUpdateSpeed: function () {
        if (this.gameStatus == GameBlock.GAME_STATUS_OVER) {
            return;
        }

        if (this.isActionRunnig == true) {
            // cc.Debug.Log("OnUpdateSpeed this.isActionRunnig="+this.isActionRunnig);
            return;
        }

        var x, y, w, h;;
        var idx = 0;
        for (let info of this.listItem) {
            this.UpdateItemPostion(info, false, 0, null, true);
            var isOver = this.CheckGameOver(info.node);
            if (isOver) {
                this.OnGameOver();
            }
            idx++;

        }
        // this.CheckRowPosError();
    },

    GetItemIndex: function (row, col) {
        if (this.listItem.length == 0) {
            return 0;
        }
        var row_bottom = this.listItem[0].row;
        var index = (row - row_bottom) * this.colTotal + col;
        return index;
    },


    CheckRowPosError: function () {
        if (this.listItem.length == 0) {
            return;
        }
        var row_bottom = this.listItem[0].row;
        for (var i = row_bottom; i < (row_bottom + this.rowTotal); i++) {
            var index = this.GetItemIndex(i, 0);
            if (index < this.listItem.length) {
                var info0 = this.listItem[index];
                //cc.Debug.Log("CheckRowPosError:index=" + index+" this.listItem="+this.listItem.length);
                var y = info0.movePosY;
                for (var j = 1; j < this.colTotal; j++) {
                    index = this.GetItemIndex(i, j);
                    if (index < this.listItem.length) {
                        var info = this.listItem[index];
                        if (info.movePosY != y) {
                            cc.Debug.Log("CheckRowPosError:error row=" + i + " col=" + j + " y=" + y + " info.movePosY=" + info.movePosY);
                            break;
                        }
                    }
                }

            }

        }
    },

    //return isGameOver
    CheckGameOver: function (node) {
        if (node == null) {
            return false;
        }
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
                    //replay
                    // cc.GameManager.main().GotoPlayAgain();
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
        if (this.prefabBlock == null) {
            this.LoadPrefab(this.LoadGameInternal.bind(this));
        } else {
            this.LoadGameInternal();
        }
    },

    LoadGameInternal: function () {
        this.ClearGame();
        this.blockCount = 0;
        this.isStartMove = false;
        this.blockTotal = 0;

        this.rowTotalNorml = 10;//10
        this.rowTotal = this.rowTotalNorml;
        this.colTotal = 4;
        this.speedTime = 0.1;
        this.speed = 0;
        this.isStartMove = false;
        var rcDisplay = this.GetRectDisplay();
        var h = rcDisplay.height / this.rowTotal;
        this.startOffsetY = h * (this.rowTotal - 2);
        this.ResumeSpeedTime();
        for (let i = 0; i < this.rowTotal; i++) {
            var rdm = cc.Common.RandomRange(0, this.colTotal);
            //rdm =0;
            for (let j = 0; j < this.colTotal; j++) {
                var info = new cc.BlockItemInfo();
                if (rdm != j) {
                    var node = this.CreateBlockItem(i, j);
                    info.node = node;
                }
                else {
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
        //return;
        if (this.gameStatus == GameBlock.GAME_STATUS_START) {
            return;
        }
        cc.Debug.Log("StartGame ");
        this.isStartMove = true;
        this.gameStatus = GameBlock.GAME_STATUS_START;
        this.schedule(this.OnUpdateSpeed, this.speedTime);

    },


    PauseSpeedTime: function () {
        // this.speed = 0;//10 
        this.isActionRunnig = true;
        cc.Debug.Log("OnUpdateSpeed PauseSpeedTime");
    },
    ResumeSpeedTime: function () {
        this.speed = GameBlock.GAME_SPEED_VALUE;//10
        this.isActionRunnig = false;
    },
    //创建方块
    CreateBlockItem: function (row, col) {
        var x, y;

        var node = cc.instantiate(this.prefabBlock);
        node.parent = this.node;

        var rc = this.GetRectItem(col, row, this.rowTotalNorml, this.colTotal);
        x = rc.x + rc.width / 2;
        y = this.imageLine.node.getPosition().y;
        node.setPosition(x, y);

        var rc = this.GetRectItem(0, 0, this.rowTotalNorml, this.colTotal);
        node.setContentSize(rc.width, rc.height);
        var rctran = node.getComponent(cc.RectTransform);
        if (rctran != null) {
            rctran.LayOut();
        }
        var ui = node.getComponent(UIBlockItem);
        if (ui != null) {
            ui.LayOut();
        }
        this.LayOut();
        this.blockCount++;
        this.scheduleOnce(this.CheckLoadGameFinish, 0.5);
        return node;
    },

    CheckLoadGameFinish: function () {
        cc.Debug.Log("CreateBlockItem:this.blockCount=" + this.blockCount + " this.blockTotal=" + this.blockTotal);
        if (this.blockCount >= this.blockTotal) {
            //所有block显示完成
            this.StartGame();
        }
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

        var row_bottom = this.listItem[0].row;

        //计算放置目标的row
        this.rowTouch = row_bottom + this.rowTotal - 1;//初始化最底部
        for (var i = row_bottom; i < (row_bottom + this.rowTotal); i++) {
            var index = (i - row_bottom) * this.colTotal + this.colTouch;
            var info = this.listItem[index];
            if (info.node != null) {
                this.rowTouch = i - 1;
                break;
            }
        }


        if (this.rowTouch >= row_bottom) {
            //insert block
            var index = (this.rowTouch - row_bottom) * this.colTotal + this.colTouch;
            var info = this.listItem[index];
            info.row = this.rowTouch;
            var node = this.CreateBlockItem(this.rowTouch, this.colTouch);
            info.node = node;

            //计算目标row的位置
            var posY = 0;
            var isnoitem = true;
            for (var i = 0; i < this.colTotal; i++) {
                var index = this.GetItemIndex(this.rowTouch, i);
                var infotmp = this.listItem[index];
                if (infotmp.node != null) {
                    posY = infotmp.movePosY;
                    info.movePosY = posY;
                    isnoitem = false;
                    cc.Debug.Log("insert item pos =" + posY);
                    break;
                }
            }

            if (isnoitem) {
                cc.Debug.Log("isnoitem pos =" + posY);
            }

            // this.PauseSpeedTime();
            this.UpdateItemPostion(info, true, posY, function () {

                //判断是否需要消除该行
                var isfull = true;
                for (var i = 0; i < this.colTotal; i++) {
                    var index = (this.rowTouch - row_bottom) * this.colTotal + i;
                    var infotmp = this.listItem[index];
                    if (infotmp.node == null) {
                        isfull = false;
                        break;
                    }
                }
                if (isfull) {
                    this.RemoveOneRow(this.rowTouch);
                }

            }.bind(this), false);
            //cc.Debug.Log("RemoveOneRow  insert block index=" + index + " row=" + info.row+" this.rowTouch="+this.rowTouch);


        } else {
            //new line



            this.rowTotal++;


            var bottomPosY = 0;
            for (var i = 0; i < this.colTotal; i++) {
                var info = this.listItem[i];
                if (info.node != null) {
                    //var rcbd = infoBottom.node.getBoundingBox();
                    //infoBottom.height = rcbd.height;
                    //row_bottom = info.row;
                    bottomPosY = info.movePosY;
                    break;
                }
            }
            // this.PauseSpeedTime();
            //生成一行
            for (var i = this.colTotal - 1; i >= 0; i--) {

                var info = new cc.BlockItemInfo();
                //info.node = null;
                if (i == this.colTouch) {
                    var node = this.CreateBlockItem(0, i);
                    info.node = node;
                }
                info.row = row_bottom - 1;
                info.col = i;
                info.movePosY = bottomPosY - this.heightItemRect;
                // var rc = this.GetRectItem(info.col, info.row, this.rowTotalNorml, this.colTotal);
                // var y = rc.y + rc.height / 2 + this.startOffsetY;
                // info.normalPosY = y;
                this.UpdateItemPostion(info, true, info.movePosY, null, false);

                // 插入元素(索引位置, 元素的数量, 元素)
                this.listItem.splice(0, 0, info);

            }
            //  this.LayOut();
        }

    },

    //消除一行
    RemoveOneRow: function (row) {

        if (this.rowTotal == 1) {
            // this.PauseSpeedTime();
            //  return;
        }
        var row_bottom = this.listItem[0].row;
        for (var i = 0; i < this.colTotal; i++) {
            var index = (row - row_bottom) * this.colTotal + i;
            var info = this.listItem[index];
            if (info.node != null) {
                info.node.removeFromParent();
                info.node = null;
            }
        }

        if (row_bottom == row) {
            //row -1
            for (var i = row_bottom + 1; i < row_bottom + this.rowTotal; i++) {
                for (var j = 0; j < this.colTotal; j++) {
                    var index = (i - row_bottom) * this.colTotal + j;
                    var info = this.listItem[index];
                    //cc.Debug.Log("RemoveOneRow type=" + typeof info + " i=" + i + " j=" + j + " index=" + index);
                    info.row -= 1;
                }
            }

        } else {
            cc.Debug.Log("infoBottom=" + row_bottom + " row=" + row);
            //位置上移一行
            for (var i = row_bottom; i < row; i++) {
                for (var j = 0; j < this.colTotal; j++) {
                    var idx = (i - row_bottom) * this.colTotal + j;
                    //cc.Debug.Log("infoBottom colTotal=" + this.colTotal + " i=" + i + " j=" + j + " idx=" + idx + " infoBottom.row=" + infoBottom.row);
                    if (idx < this.listItem.length) {
                        let info = this.listItem[idx];
                        //cc.Debug.Log("infoBottom type=" + typeof info + " i=" + i + " j=" + j + " idx=" + idx);
                        info.row += 1;
                        info.movePosY += this.heightItemRect;
                        // this.UpdateItemPostion(info, false, info.movePosY, null, false);

                    } else {
                        cc.Debug.Log("infoBottom out of range i=" + i + " j=" + j);
                    }

                }
            }
        }

        //清除列表记录

        var index = (row - row_bottom) * this.colTotal;
        // cc.Debug.Log("RemoveOneRow  index=" + index + " row_bottom=" + row_bottom + " row=" + row);
        if (index < 0) {
            cc.Debug.Log("RemoveOneRow listItem.splice index=" + index + " row_bottom=" + row_bottom + " row=" + row);
        }
        this.listItem.splice(index, this.colTotal)
        this.rowTotal--;

        this.ReLayOutItems();
        this.GetBlockTotal();

        // cc.Debug.Log("rowTotal=" + this.rowTotal);
        if (this.rowTotal == 0) {
            this.OnGameWin();
        }

    },

    OnTouchDown: function (pos) {
        if (this.isActionRunnig) {
            return;
        }
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
