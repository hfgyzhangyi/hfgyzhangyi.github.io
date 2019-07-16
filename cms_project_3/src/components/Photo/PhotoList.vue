<template>
    <div class="tmpl">
        <nav-bar title="图文列表"></nav-bar>
        <ul class="title">
            <li><router-link :to="{name:'photo.list',params:{categoryId:0}}">全部</router-link></li>
            <li><router-link :to="{name:'photo.list',params:{categoryId:1}}">标题1</router-link></li>
            <li><router-link :to="{name:'photo.list',params:{categoryId:2}}">标题2</router-link></li>
            <li><router-link :to="{name:'photo.list',params:{categoryId:3}}">标题3</router-link></li>
        </ul>
        <ul class="list">
            <li v-for="(img,i) of imgs" :key="i">
                <router-link :to="{name:'photo.detail',params:{id:img.id}}">
                    <img v-lazy="img.src" class="img"/>
                    <p>{{img.text}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgs:[]
        }
    },
    created(){
        let categoryId=this.$route.params.categoryId;
        if(categoryId==1){
            this.imgs=[{id:1,src:require("../../assets/img/home_background1.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"}];
        }else if(categoryId==2){
            this.imgs=[{id:1,src:require("../../assets/img/home_background2.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"}];
        }else if(categoryId==3){
            this.imgs=[{id:1,src:require("../../assets/img/home_background3.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"}];
        }else{
            this.imgs=[
                {id:1,src:require("../../assets/img/home_background1.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"},
                {id:1,src:require("../../assets/img/home_background2.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"},
                {id:1,src:require("../../assets/img/home_background3.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"},
                {id:1,src:require("../../assets/img/home_background1.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"},
                {id:1,src:require("../../assets/img/home_background2.png"),text:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。"}
            ];
        }
    },
    mounted(){
        let width=document.body.clientWidth;
        let images=document.getElementsByClassName("img");
        for(let i of images){
            i.style.width=width+"px";
            i.style.height=180+"px";
        }
        window.addEventListener("scroll",this.handleScroll);
    },
    beforeDestroy(){
        window.removeEventListener("scroll",this.handleScroll);
    },
    methods:{
        handleScroll(){
            let title=document.getElementsByClassName("title")[0];
            if(document.documentElement.scrollTop>=115){
                title.style.position="fixed";
                title.style.top=0+"px";
                title.style.left=0+"px";
                title.style.zIndex="9999";
            }else{
                title.style.position="initial";
            }
        }
    },
    beforeRouteUpdate(to,from,next){
        console.log(to);
        next();
    }
}
</script>
<style scoped>
.tmpl >>> .title{
    float: left;
    width: 100%;
    background: white;
}
.tmpl >>> .title li{
    float: left;
    margin-left: 20px;
    line-height: 29px;
}
.tmpl >>> .list{
    float: left;
}
.tmpl >>> .list li{
    position: relative;
    width: 100%;
    height: 180px;
}
.tmpl >>> .list p{
    position: absolute;
    width: 90%;
    margin-left: 5%;
    bottom: 0px;
}
.tmpl >>> ul.list::after{
    content: '';
    height: 60px;
    display: block;
}
</style>