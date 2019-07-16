<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,i) of imgs" :key="i">
                <img :src="img.src"/>
            </mt-swipe-item>
        </mt-swipe>
        <div class="grid">
            <my-ul>
                <my-li v-for="(grid,i) in grids" :key="i">
                    <router-link :to="grid.router">
                        <span :class="grid.className"></span>
                        <span>{{grid.title}}</span>
                    </router-link>
                </my-li>
            </my-ul>
            <!--
            <ul>
                <li>
                    <a href="javascript:;" class="">
                        <span class="cms-news"></span>
                        <span>新闻资讯</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" class="">
                        <span class="cms-photo"></span>
                        <span>图文分享</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" class="">
                        <span class="cms-show"></span>
                        <span>商品展示</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" class="">
                        <span class="cms-feedback"></span>
                        <span>留言反馈</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" class="">
                        <span class="cms-search"></span>
                        <span>搜索资讯</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" class="">
                        <span class="cms-contact"></span>
                        <span>联系我们</span>
                    </a>
                </li>
            </ul>
            -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgs:[],
            grids:[
                {className:'cms-news',title:'新闻资讯',router:{name:'news.list'}},
                {className:'cms-photo',title:'图文分享',router:{name:'photo.list',params:{categoryId:0}}},
                {className:'cms-show',title:'商品展示',router:{name:'news.list'}},
                {className:'cms-feedback',title:'留言反馈',router:{name:'news.list'}},
                {className:'cms-search',title:'搜索资讯',router:{name:'news.list'}},
                {className:'cms-contact',title:'联系我们',router:{name:'news.list'}}
            ]
        }
    },
    created(){
        //this.$axios.get("url").then(res=>{this.imgs=res.data.图片地址}).catch(err=>console.log('异常',err))
        this.imgs=[
            {src:require("../../assets/img/home_background1.png")},
            {src:require("../../assets/img/home_background2.png")},
            {src:require("../../assets/img/home_background3.png")}
        ];
    }
}
</script>
<style scoped>
div >>> .mint-swipe{ height: 180px;}
div >>> img{ width: 100%;}
/*
.grid >>> ul li{
    float: left;
    width: 33.333333%;
    text-align: center;
    line-height: 100px;
    height: 100px;
}
.grid >>> li span:first-child{
    height: 50px;
    display: block;
    width: 100%;
    background-size: 30px 30px;
    background-position: center bottom;
}
.grid >>> .cms-news{
    background: url("../../assets/img/xinwenzixun.png") no-repeat;
}
.grid >>> .cms-photo{
    background: url("../../assets/img/tuwenfenxiang.png") no-repeat;
}
.grid >>> .cms-show{
    background: url("../../assets/img/chanpinzhanshi.png") no-repeat;
}
.grid >>> .cms-feedback{
    background: url("../../assets/img/liuyanfankui.png") no-repeat;
}
.grid >>> .cms-search{
    background: url("../../assets/img/sousuozixun.png") no-repeat;
}
.grid >>> .cms-contact{
    background: url("../../assets/img/lianxiwomen.png") no-repeat;
}
.grid >>> li span:last-child{
    display: block;
    height: 50px;
    line-height: 40px;
}
*/
</style>