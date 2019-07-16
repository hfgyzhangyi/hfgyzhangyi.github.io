<template>
    <div class="tmpl">
        <nav-bar title="图文详情"/>
        <div class="photo-title">
            <p>{{photoDetail.title}}</p>
            <div class="photo_title_box">
                <span>发起日期：{{photoDetail.date | convertTime('YYYY-MM-DD')}}</span>
                <span>{{photoDetail.time}}次浏览</span>
                <span>分类：{{photoDetail.category}}</span>
            </div>
        </div>
        <vue-preview :slides="photoDetail.photo_src"></vue-preview>
        <!--
        <div class="photo_img_area" v-for="(img,i) of photoDetail.photo_src" :key="i">
            <img :src="img.img_url" class="photo_img"/>
        </div>
        -->
        <p class="photo_content">{{photoDetail.content}}</p>
        <my-comment type="0" :id="id"></my-comment>
    </div>
</template>
<script>
export default {
    data(){
        return{
            /*
            photo_src:[
                    {img_url:require("../../assets/img/photoDetail_1.jpg")},
                    {img_url:require("../../assets/img/photoDetail_2.jpg")},
                    {img_url:require("../../assets/img/photoDetail_3.jpg")},
                    {img_url:require("../../assets/img/photoDetail_4.jpg")},
                    {img_url:require("../../assets/img/photoDetail_5.jpg")}
                ]
            */
            photoDetail:{
                title:'现代简洁明亮的外表卧室卧室背景墙、吊顶黄色',
                date:'2018-06-18',
                time:0,
                category:'民生经济',
                photo_src:[
                    {src:require("../../assets/img/photoDetail_1.jpg"),msrc:require("../../assets/img/photoDetail_1.jpg"),w:600,h:600},
                    {src:require("../../assets/img/photoDetail_2.jpg"),msrc:require("../../assets/img/photoDetail_2.jpg"),w:600,h:600},
                    {src:require("../../assets/img/photoDetail_3.jpg"),msrc:require("../../assets/img/photoDetail_3.jpg"),w:600,h:600},
                    {src:require("../../assets/img/photoDetail_4.jpg"),msrc:require("../../assets/img/photoDetail_4.jpg"),w:600,h:600},
                    {src:require("../../assets/img/photoDetail_5.jpg"),msrc:require("../../assets/img/photoDetail_5.jpg"),w:600,h:600}
                ],
                content:`装修就是要自己来做主装修出自己的个性，否则看着那千篇一律的三居室装修，就像样板间一样，怎么都没有属于自己家的味道。不过想要装修出好看又fashion的感觉，不如让万丰丰泽园的三居室来给咱们打个样儿吧。
从门厅至客餐厅，以过道为轴，轻巧的将空间分割，不同功能区界限明确、动线流畅，却也融合畅通。材料的肌理与质感，渗透在每件家具和饰品中；引入利落的线条元素，让空间层次更丰盈。
客厅的色调其实是很重要的，有些房主觉得客厅是招待客人的地方，要使用暖色调，很多的房主都喜欢客厅内的沙发足够的多，喜欢在客厅里面摆放很多的东西，这就使得客厅内的空间显得更加狭小，家具一定要精简。
主空间以低明度的灰色为主，利用材质特有的纹理勾勒空间内部的秩序感；舒适的家具饰品以及柔软的织物，营造出家的温馨。
香槟金线条将灰色石材电视背景墙分割为对称格局，纵向纹路也与餐厅一侧的硬包背景有了联动。
卧室装修由于居住主体的不同,配色也有所不同。主卧室装修宜采用木地板,温馨惬意最合适。次卧一般是老人居住,所以同样要温馨,同时还要考虑老人的行动方便和喜好等。卧室的照明要求不多,但要注意卧室不宜采用向下射的灯具,宜用照顶的灯光。
凝练之笔尽显清明静雅之美，空间中人文韵致悄然生发。
柔和而优雅地与其他颜色调和在一起却让人产生某种“内部生发”的暖意。
随着时代的变化，人们对卫生间设计有着极高的需求，卫生间设计规范也成为了一大重点。现在的卫生间设计讲究精益求精，空间改造更加完善、视觉上更加美观。下面这款卫生间设计案例，希望会对你们有所帮助！
卫生间与淋浴间的设计，将艺术性、空间性与实用性三者有机统一于凝练，成为私密空间不可或缺的一部分
在当代家庭装修中，很多餐厅与客厅通常是一体的，开放式的设计，可以让公共更大。所以，餐厅设计从色调和材质上，要充分考虑其与整个房子其它空间的延展性，特别是与处于同一个公共空间的客厅区域。如果可能的话，可以把餐厅做成客厅的延展。
一蔬一饭，一餐一饮，餐厅记录着一家人平凡的美好
结束忙碌的一天回到家中，一桌热腾腾的饭菜，瞬间慰藉疲惫的身心。
随着住房面积的增大，很多儿童目前都有了自己独立的空间，因此儿童房装修很受大家的关注。儿童的机体抵抗能力相对较低，所以装修时给家中的孩子布置一个环保、安全、舒适的室内环境，对孩子的健康发育、成长至关重要。
儿童房是一个实用的多功能空间，榻榻米床与衣柜一体，保证空间的储物功能。
以下就是本套万丰丰泽园小区110平米三居室房子的户型图。
在细节打造上，以一个逸静的艺术空间唤起人们心底的美好追寻
关于家中现代风格的110平米的三居室房屋装修设计，小编就为大家详细的介绍到这里了，如果您也正在为家里的装修问题困扰，希望小编分享的这套案例能为您带去帮助。`
            },
            id:this.$route.params.id
        }
    }
}
</script>
<style scoped>
.tmpl .photo-title{
    width: 100%;
    height: auto;
    border-bottom: 1px solid black;
}
.photo-title p{
    width: 100%;
    font-size: 26px;
    color: #4DDEFF;
}
.photo_title_box{
    display: flex;
    justify-content: space-around;
}
/*
.photo_img_area{
    width: 100%;
}
.photo_img_area .photo_img{
    float: left;
    width: 32%;
    height: 32%;
    margin-right: 1%;
    margin-top: 1%;
}
*/
.tmpl .photo_content{
    float: left;
    width: 98%;
    margin-left: 1%;
    white-space: pre-wrap;
}
.tmpl .photo_content::after{
    content: '';
    display: block;
    height: 60px;
}
</style>
