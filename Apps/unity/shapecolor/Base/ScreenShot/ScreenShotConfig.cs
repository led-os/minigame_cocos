using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScreenShotConfig
{
    public ShotDeviceInfo deviceInfo;
    public int GetTotalPage()
    {
        return 5;
    }
    public ShotItemInfo GetPage(ShotDeviceInfo dev, int idx)
    {
        ShotItemInfo info = new ShotItemInfo();
        UIViewController controller = null;
        info.isRealGameUI = true;
        if (dev.name == UIScreenShotController.DEVICE_NAME_ICON)
        {
            controller = IconViewController.main;
            IconViewController.main.deviceInfo = dev;
        }
        else if (dev.name == UIScreenShotController.DEVICE_NAME_AD)
        {
            controller = AdHomeViewController.main;
        }
        else if ((dev.name == UIScreenShotController.DEVICE_NAME_COPY_RIGHT_HUAWEI) || (dev.name == UIScreenShotController.DEVICE_NAME_COPY_RIGHT_HD_HUAWEI))
        {
            controller = CopyRightViewController.main;
            CopyRightViewController.main.deviceInfo = dev;
        }
        else
        {
            switch (idx)
            {
                case 0:
                    GameManager.gameLevel = 0;
                    controller = GameViewController.main;
                    break;
                case 1:
                    GameManager.gameLevel = 1;
                    controller = GameViewController.main;
                    break;
                case 2:
                    GameManager.gameLevel = 2;
                    controller = GameViewController.main;
                    break;
                case 3:
                    controller = GuankaViewController.main;
                    break;
                case 4:
                    controller = HomeViewController.main;
                    break;

                default:
                    controller = HomeViewController.main;
                    break;


            }
        }
        info.controller = controller;

        return info;
    }

}
