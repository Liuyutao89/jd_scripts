//本脚本需手动进入活动界面，且打开任务列表才可起效
//针对<东东玩家>活动进行调整 20210918
//author：嘉佳
auto.waitFor();//无障碍服务检测
app.launch("com.jingdong.app.mall");//打开京东APP //如果在分身应用中无法跳转，可屏蔽此行
setScreenMetrics(1440, 3120);//声明是基于分辨率1440，3120的点击
while (text("21f6d36e11451cdd").findOnce() == null) {
    toast("请手动进入活动页面");
    sleep(5000);
}
console.show();//开启悬浮窗
if(text("21f6d36e11451cdd").exists()){//可能需要切换场景，建议手动打开任务列表
    console.info("成功进入活动界面");
    click(712,2670)
    sleep(2000);
}
if(text("去完成").exists()){
    console.info("发现任务列表");
    //关键字作为任务类型
    var hasTask = true;
    while (hasTask) {
        if (textMatches(/.*[0-9]S.*/).exists() && textMatches(/.*[0-9]S.*/).findOnce().parent().child(8).text() == "去完成") {
            console.info("开始浏览任务");
            textMatches(/.*[0-9]S.*/).findOnce().parent().child(8).click();
            sleep(12000);
            console.log("任务完成");
        } else if (textContains("加购").exists() && textContains("加购").findOnce().parent().child(8).text() == "去完成") {
            console.info("开始加购任务");
            textContains("加购").findOnce().parent().child(8).click();
            sleep(3000);
            for (var i = 0; i < 5; i++) {
                className("android.view.View").scrollable(true).depth(15).findOne().child(i).child(0).child(4).click();
                console.log("加购第" + (i+1) + "个商品");
                sleep(3000);
                back();
                sleep(3000);
            }
            console.log("浏览加购完成，返回");
        } else if (textContains("浏览").exists() && textContains("浏览").findOnce().parent().child(8).text() == "去完成") {
            console.info("开始浏览任务");
            textContains("浏览").findOnce().parent().child(8).click();
            sleep(3000);
            console.log("浏览完成，返回");
        } else if (textStartsWith("成功关注").exists() && textStartsWith("成功关注").findOnce().parent().child(8).text() == "去完成") {
            console.info("开始关注任务");
            textStartsWith("成功关注").findOnce().parent().child(8).click();
            sleep(3000);
            console.log("任务完成，返回");
        } else if (textContains("开通品牌会员").exists() && textContains("开通品牌会员").findOnce().parent().child(8).text() == "去完成") {
            textContains("开通品牌会员").findOnce().parent().child(8).click();
            sleep(1000);//如果已经入会，只要点了去完成就行，缩短运行时间
            if(textContains("加入店铺会员").exists()){
                console.log("脚本结束（涉及个人隐私,请手动加入店铺会员或者忽略加入会员任务)");
                break;
            }
            console.log("浏览入会界面，获取金币");
        }
        else {
            //所有任务已完成，退出循环
            break;
        }
        sleep(1000);//给提示一个显示的时间
        back();
        sleep(3000);
        for(var i=0;!text("21f6d36e11451cdd").exists()&&i<5;i++){
            toast("返回");
            sleep(1000);
            back();
            sleep(3000);
            if(i==5){
                console.log("无法返回任务界面,请重新执行脚本");
                exit();
            }
        }//避免弹窗,返回任务界面
    }
}
console.log("所有任务已完成，若有剩余可再启动一次脚本或手动完成");
console.log("结束任务");
home();
sleep(1000);
console.log("已退出脚本");
engines.myEngine().forceStop()