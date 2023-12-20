<template>
    <div class="footerLinks">
        <div class="footerColumnText">
            <h3>关于我们</h3>
            <router-link to="/company-intro">公司介绍</router-link>
            <router-link to="/contact-us">联系我们</router-link>
            <router-link to="/join-us">加入我们</router-link>
            <router-link to="/partners">加盟合伙人</router-link>
            <router-link to="/user-agreement">用户服务协议</router-link>
            <router-link to="/privacy-policy">隐私政策</router-link>
            <router-link to="/legal-disclaimer">法律声明</router-link>
            <router-link to="/agreement">协议及声明</router-link>
        </div>
        <div class="footerColumnText">
            <h3>交易流程</h3>
            <router-link to="/buy">买车流程</router-link>
            <router-link to="/sell">卖车流程</router-link>
            <router-link to="/long-distance-purchase">异地购车</router-link>
        </div>
        <div class="footerColumnText">
            <h3>二手车精选</h3>
            <router-link to="/car-models">车型库</router-link>
            <router-link to="/car-news">二手车资讯</router-link>
            <router-link to="/q-and-a">二手车问答</router-link>
            <router-link to="/car-valuation">二手车估价</router-link>
            <router-link to="/transfer-standard">二手车迁入标准</router-link>
        </div>
        <div class="footerColumnPicture">
            <div class="picture">
                <h3>下载APP</h3>
                <img :src="PICTURE_ADDR + '/download.png'" alt="WeChat"/>
            </div>
            <div class="picture">
                <h3>关注微信</h3>
                <img :src="PICTURE_ADDR  + '/wechat.jpg'" alt="WeChat"/>
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

.footerColumnText {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 100px;
}

.footerColumnPicture{
    margin-left: 200px;
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
    width: 150px;
    height: auto;
    margin-bottom: 5px;
}
</style>
