<template>
    <div class="tmpl">
        <nav-bar title="新闻列表"/>
        <div class="demo">
            <ul>
                <li v-for="(news,i) of newList" :key="i">
                    <router-link :to="{name:'news.detail',query:{id:news.id}}">
                        <img :src="news.img_url"/>
                        <div>
                            <span>{{news.title}}</span>
                            <div class="news-desc">
                                <p>点击数:{{news.click}}</p>
                                <p>发表时间:{{news.add_time}}</p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newList:[]
        }
    },
    created(){
        this.newList=[
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",click:10,add_time:"2019-02-05 13:14:20"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题标题标题标题标题标题标题标题标题标题标题标题",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题3",click:12,add_time:"2019-02-05 13:14:22"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"},
            {id:1,img_url:require("../../assets/img/newsList_pic.jpg"),title:"标题2",click:11,add_time:"2019-02-05 13:14:21"}
        ];
    }
}
</script>
<style scoped>
.demo li{
    float: left;
    width: 100%;
    border-bottom: 1px solid #c8c7cc;
}
.demo li:last-child{
    margin-bottom: 70px;
}
.demo li a{
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    color: #000;
    padding: 10px 0px;
}

.demo img{
    float: left;
    width: 42px;
    height: 42px;
    margin-top: 1px;
    margin-left: 15px;
}
.demo a div{
    float: left;
    width: 80%;
    height: 100%;
}
.demo span{
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 21px;
    margin-left: 15px;
}
.demo a p{
    float: left;
    color: #0bb0f5;
    font-size: 14px;
    line-height: 21px;
    margin-left: 15px;
    margin-top: 5px;
}
.demo p:nth-child(2){
    position: absolute;
    right: 30px;
}
</style>