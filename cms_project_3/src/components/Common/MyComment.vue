<template>
    <div class="tmpl">
        <div class="comment_title">
            <span>提交评论</span>
            <span>返回</span>
        </div>
        <textarea class="input_area" v-model="new_comment" cols="40"/>
        <div class="button_area">
            <mt-button type="primary" size="large" @click="add_comment">发表评论</mt-button>
        </div>
        <div class="comment_title">
            <span>评论列表</span>
            <span>44条评论</span>
        </div>
        <ul class="comment_area">
            <li v-for="(comment,i) of comments" :key="i">
                <span>{{comment.user}}：</span><span>{{comment.content}} {{comment.time&lt;60?comment.time+"分钟前":comment.time&lt;60*24?parseInt(comment.time/60)+"小时"+comment.time%60+"分钟前":parseInt(comment.time/(60*24))+"天"+parseInt((comment.time-parseInt(comment.time/(60*24))*60*24)/60)+"小时"+comment.time%60+"分钟前"}}</span>
            </li>
            <!--
            <li><span>匿名用户：</span><span>我好不如大家好 4分钟前</span></li>
            <li><span>匿名用户：</span><span>我好不如大家好<br>我好不如大家好 4分钟前</span></li>
            <li><span>匿名用户：</span><span>undefined 6分钟前</span></li>
            -->
        </ul>
        <div class="button_area">
            <mt-button plain size="large" type="danger" @click="more_comment">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"my-comment",
    props:["id","type"],
    data(){
        return{
            new_comment:"",
            comments:[
                {user:"匿名用户",content:"我好不如大家好",time:4},
                {user:"匿名用户",content:"我好不如大家好我好不如大家好我好不如大家好我好不如大家好",time:400},
                {user:"匿名用户",content:"我好不如大家好",time:4000}
            ]
        }
    },
    methods:{
        add_comment(){
            if(this.new_comment!=""){
                this.comments.unshift({user:"匿名用户",content:this.new_comment,time:1});
                this.new_comment="";
            }
        },
        more_comment(){
            //通过pageNow+1,ajax获取新一页评论
            //this.$axios.get("url/"+(pageNow+1))
            let more=[
                {user:"匿名用户",content:"我好不如大家好1",time:4010},
                {user:"匿名用户",content:"我好不如大家好2",time:4020},
                {user:"匿名用户",content:"我好不如大家好3",time:4030}
            ];
            for(var m of more)
                this.comments.push(m);
        }
    },
    mounted(){
        //判断type值,显示不同的评论
        //根据id取得不同主题的评论
    }
}
</script>
<style scoped>
.tmpl >>> .comment_title{
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid silver;
}
.tmpl >>> .input_area{
    float: left;
    width: 96%;
    height: 80px;
    margin: 10px 2%;
    resize: none;
    overflow-y: scroll;
}
.tmpl >>> .button_area{
    width: 96%;
    margin: 0px 2%;
}
.tmpl >>> .comment_area{
    width: 100%;
}
.tmpl >>> .comment_area li{
    width: 100%;
    border-bottom: 1px solid silver;
}
.tmpl >>> .comment_area li span{
    display: inline-block;
}
.tmpl >>> .comment_area li span:first-child{
    float: left;
    height: 100%;
}
.tmpl >>> .comment_area li span:last-child{
    word-break: break-all;
    white-space: pre-wrap;
    width: 70%;
}
.tmpl >>> .button_area:last-child{
    margin-top: 10px;
}
.tmpl::after{
    content: '';
    display: block;
    height: 60px;
}
</style>