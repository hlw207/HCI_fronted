<template>
    <div class="footerLinks">
        <div class="footerColumnText" style="margin-left: 80px; margin-bottom: 50px">
            <div class="title">关于我们</div>
            <router-link to="/company-intro" class="a">公司介绍</router-link>
            <router-link to="/contact-us" class="a">联系我们</router-link>
            <router-link to="/join-us" class="a">加入我们</router-link>
            <router-link to="/partners" class="a">加盟合伙人</router-link>
        </div>
        <div class="footerColumnText" style="margin-top: 27px">
            <router-link to="/user-agreement" class="a">用户服务协议</router-link>
            <router-link to="/privacy-policy" class="a">隐私政策</router-link>
            <router-link to="/legal-disclaimer" class="a">法律声明</router-link>
            <router-link to="/agreement" class="a">协议及声明</router-link>
        </div>
        <div class="footerColumnText" style="margin-left: 70px;">
            <div class="title">交易流程</div>
            <router-link to="/buy" class="a">买车流程</router-link>
            <router-link to="/sell" class="a">卖车流程</router-link>
            <router-link to="/long-distance-purchase" class="a">异地购车</router-link>
        </div>
        <div class="footerColumnText" style="margin-left: 70px;">
            <div class="title">二手车精选</div>
            <router-link to="/car-models" class="a">车型库</router-link>
            <router-link to="/car-news" class="a">二手车资讯</router-link>
            <router-link to="/q-and-a" class="a">二手车问答</router-link>
        </div>
            <div class="footerColumnText" style="margin-top: 27px">
            <router-link to="/car-valuation" class="a">二手车估价</router-link>
            <router-link to="/transfer-standard" class="a">二手车迁入标准</router-link>
        </div>
        <div class="footerColumnPicture">
            <div class="picture" style="margin-top: 45px">
                <img :src="PICTURE_ADDR + '/download.png'" alt="WeChat"/>
                <div class="title1" style="text-align: center;">下载APP</div>
            </div>
            <div class="picture" style="margin-top: 45px">
                <img :src="PICTURE_ADDR  + '/wechat.jpg'" alt="WeChat"/>
                <div class="title1" style="text-align: center;">关注微信</div>
            </div>
        </div>
    </div>
</template>

<script setup="ts">
import {PICTURE_ADDR} from "~/config";
</script>

<style scoped>
.footerLinks {
    display: flex;
    padding: 30px 50px 60px 50px;
    background-color: #333;
    color: #fff;
    font-size: 12px;
}

.title{
    font-size: 16px;
    color: #FFF;
    padding: 0 0 7px 0;
    font-weight: bold;
}

.title1{
    font-size: 16px;
    color: rgb(255, 255, 255);
    padding: 0 0 7px 0;

}

.a{
    line-height: 24px;
    display: block;
    text-align: left;
    text-decoration: none;
    font-size: 14px;
    color: rgba(244, 243, 243, 0.13);
}

.footerColumnText {
    float: left;
    width: 129px;
    list-style-type: none;
}

.footerColumnPicture{
    margin-left: 50px;
    display: flex;
}

.picture{
    margin-left: 80px;
}

h3 {
    font-size: 15px;
    margin-bottom: 10px;
}

.footerColumnText a {
    color: lightgrey;
    text-decoration: none;
    margin-bottom: 5px;
    cursor: pointer;
    transition: color 0.2s;
}

.footerColumnText a:hover,
.footerColumnText a.active-link {
    color: orange;
}

img {
    width: 100px;
    height: auto;
    margin-bottom: 5px;
}
</style>
