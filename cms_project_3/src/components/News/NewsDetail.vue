<template>
    <div class="tmpl">
        <nav-bar title="新闻详情"></nav-bar>
        <div class="news-title">
            <p>{{newsDetail.title}}</p>
            <div class="news_title_box">
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | convertTime('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.detail"></div>
        <my-comment :id="id" type="0"></my-comment>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsDetail:{
                title:"曼联澳洲外训再起内讧？博格巴与林加德疑似冲突",
                click:10,
                add_time:"2019-05-20",
                detail:"中新网7月9日电 当地时间8日，曼联在其官方社交媒体上发布了一则球队在澳洲外训的视频。眼尖的外媒从中看到，博格巴和林加德似乎发生了口角，队友林德罗夫看到后从后面抱住了博格巴。视频显示，林加德走在博格巴的后方，摊开双手，表情严肃的在对博格巴说着什么，而博格巴则双手插兜，面无表情在前面走着，他们的队友林加德看到这一幕后，上前搂住了博格巴。今夏转会窗，博格巴与皇马和尤文都传出“绯闻”，据西班牙媒体报道，曼联已经同意就法国人的转会进行谈判。(完)"
            },
            id:this.$route.query.id
        }
    },
    created(){
        //let id=this.$route.query.id;
        //this.$axios.get("url/"+id).then(res=>{this.newsDetail=res.data.message[0]}).catch(err=>console.log(err));
    }
}
</script>
<style scoped>
.tmpl >>> .news-title{
    width: 100%;
    height: auto;
    border-bottom: 1px solid black;
}
.news-title >>> p{
    width: 100%;
    line-height: 25px;
    text-align: center;
    font-weight: bold;
}
.news-title >>> .news_title_box{
    display: flex;
    justify-content:space-around;
}
.news-title >>> span:first-child{
    display: inline-block;
    font-size: 14px;
    text-align: center;
    color: #0bb0f5;
}
.news-title >>> span:nth-child(2),span:last-child{
    display: inline-block;
    font-size: 14px;
    text-align: center;
    color: #0bb0f5;
}
.tmpl >>> .news-content{
    margin-top: 10px;
    width: 90%;
    margin-left: 5%;
    text-indent: 32px;
}
</style>