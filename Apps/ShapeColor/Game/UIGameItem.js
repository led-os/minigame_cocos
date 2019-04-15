var UIView = require("UIView");
var UIGameItem = cc.Class({
    extends: UIView,// cc.ItemInfo, 
    properties: {
        imageBoard: cc.Sprite,
        imageItem: cc.Sprite,
        isBomb: false,
    },

    onLoad: function () {


    },


    GetBoundingBox: function () {
        return this.imageItem.node.getBoundingBox();
    },
    GetRigidBody: function () {
        return this.imageItem.node.getComponent(cc.RigidBody);
    },
    

    UpdateItem: function (info, cbFinish) {
        var sprite = this.imageItem;
        sprite.name = info.id;
        var isInner = info.isInner;
        // RectTransform rcTran = obj.AddComponent<RectTransform>();
        // SpriteRenderer objSR = obj.AddComponent<SpriteRenderer>();
        var pic = info.picOuter;
        if (isInner == true) {
            pic = info.picInner;
        }

        //加载图片
        // var strImage = cc.FileUtil.GetFileBeforeExtWithOutDot(cc.AppRes.URL_HTTP_HEAD+pic);
        var strImage = cc.AppRes.main().URL_HTTP_HEAD + pic;
        if (this.isBomb) {
            strImage = cc.AppRes.IMAGE_Game_Bomb;
        }
        cc.Debug.Log("strImage=" + strImage);
        cc.TextureCache.main.Load(strImage, function (err, tex) {
            //cc.url.raw('res/textures/content.png')
            if (err) {
                cc.Debug.Log("item_pic err");
                cc.Debug.Log(err.message || err);
                return;
            }
            sprite.spriteFrame = new cc.SpriteFrame(tex);


            //添加物理特性
            if ((info.isInner == true) || (this.isBomb)) {
                var body = sprite.node.addComponent(cc.RigidBody);
                body.gravityScale = 0;//关闭重力
                // // bd.useGravity = false;
                body.fixedRotation = true;

                //防止刚体穿越
                body.bullet = true;

                // bd.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
                //var collider = node.addComponent(cc.PolygonCollider);
                var collider = sprite.node.addComponent(cc.PhysicsBoxCollider);
                var mj = sprite.node.addComponent(cc.MouseJoint);
            }


            var collider = sprite.node.getComponent(cc.PhysicsBoxCollider);
            if (collider != null) {

                collider.size = cc.size(tex.width, tex.height);
                cc.Debug.Log("collider=" + collider.size);
            }

            // sprite.node.zIndex = 10;

            // this.LayOut();
            //this.scheduleOnce(this.LoadItemImageFinish, 0.5);

            if (cbFinish != null) {
                cbFinish(this);
            }
            // this.LoadItemImageFinish(infoRet);

            // this.loadItemCount++;

            // }.bind(this).bind(sprite));
        }.bind(this));

        var z = this.itemPosZ;
        if (isInner == true) {
            z = this.itemPosZ - 1;
        }
        //obj.transform.position = new Vector3(0, 0, z);
        this.node.setPosition(0, 0, z);
        var color = info.color;
        var is_add_shader = true;
        //color
        if (cc.Config.main().appKeyName != cc.AppType.SHAPECOLOR) {
            if (isInner == true) {
                is_add_shader = false;
                //ShapeHighlighterController hlc = AddHighLight(obj);
                //hlc.UpdateColor(color);
            }
        }
        if (is_add_shader == true) {
            {
                const renderEngine = cc.renderer.renderEngine;
                const renderer = renderEngine.renderer;
                const name = 'ShaderShapeColor';
                let mat = sprite.getMaterial(name);
                if (!mat) {
                    const CustomMaterial = require("CustomMaterial");
                    mat = new CustomMaterial(name, [
                        { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
                        { name: 'colorShow', type: renderer.PARAM_FLOAT3 },
                    ]);
                    sprite.setMaterial(name, mat);
                }
                sprite.activateMaterial(name);
                var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
                mat.setParamValue("iResolution", iResolution);
                var colorShow = new cc.Vec3(color.r / 255, color.g / 255, color.b / 255);
                cc.Debug.Log("colorShow=" + colorShow);
                mat.setParamValue("colorShow", colorShow);
            }
        }




    },

});

