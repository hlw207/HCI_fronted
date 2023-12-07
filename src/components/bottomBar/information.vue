<template>
    <div class="footer-links">
        <div class="footer-column">
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
        <div class="footer-column">
            <h3>交易流程</h3>
            <router-link to="/buy">买车流程</router-link>
            <router-link to="/sell">卖车流程</router-link>
            <router-link to="/long-distance-purchase">异地购车</router-link>
        </div>
        <div class="footer-column">
            <h3>二手车精选</h3>
            <router-link to="/car-models">车型库</router-link>
            <router-link to="/car-news">二手车资讯</router-link>
            <router-link to="/q-and-a">二手车问答</router-link>
            <router-link to="/car-valuation">二手车估价</router-link>
            <router-link to="/transfer-standard">二手车迁入标准</router-link>
        </div>
        <div class="footer-column">
            <h3>下载APP</h3>
            <img src="../../../public/pictures/download.png" alt="WeChat" />
        </div>
        <div class="footer-column">
            <h3>关注微信</h3>
            <img src="../../../public/pictures/wechat.jpg" alt="WeChat" />
        </div>
    </div>
</template>


<script setup="ts">

</script>

<style scoped>
.footer-links {
    margin-right: 2px;
    display: flex;
    justify-content: space-around;
    padding: 20px 120px 20px 100px;
    background-color: #333;
    color: #fff;
    font-size: 12px;
}

.footer-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h3 {
    font-size: 15px;
    margin-bottom: 10px;
}

.footer-column a {
    color: lightgrey;
    text-decoration: none;
    margin-bottom: 5px;
    cursor: pointer;
    transition: color 0.2s; /* 添加过渡效果 */
}

.footer-column a:hover,
.footer-column a.active-link {
    color: orange;
}

img {
    width: 150px;
    height: auto;
    margin-bottom: 5px;
}
</style>