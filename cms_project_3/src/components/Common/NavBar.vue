<template>
    <div class="cms-s-header">
        <h3 @click="goback">&nbsp;&lt;</h3>
        <h1 class="page-title">{{title}}</h1>
    </div>
</template>
<script>
export default {
    name:'nav-bar',
    props:['title'],
    methods:{
        goback(){
            let name=this.$router.history.current.name;
            if(name=="photo.list")
                this.$router.push("/Home");
            else
                this.$router.go(-1);
        }
    },
    mounted(){
        let width=window.screen.width;
        let h_title=document.getElementsByClassName("page-title")[0];
        if(width==1680){
            if(h_title.innerHTML.length==4)
                h_title.style.left=(width-h_title.clientWidth-95)/2+"px";
        }else{
            if(h_title.innerHTML.length==4)
                h_title.style.left=(width-h_title.clientWidth-45)/2+"px";
        }
    }
}
</script>
<style scoped>
.cms-s-header h1,h3{
    display: inline-block;
}
.cms-s-header h1{
    position: relative;
}
</style>
