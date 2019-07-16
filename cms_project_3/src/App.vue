<template>
    <div>
        <mt-header class="header" title="信息分享系统"></mt-header>
        <router-view :key="$route.fullPath"></router-view>
        <!--fixed-->
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="Home">
                <img @click="changeHash" slot="icon" src="./assets/img/shouye.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="Member">
                <img @click="changeHash" slot="icon" src="./assets/img/huiyuan.png">
                会员
            </mt-tab-item>
            <mt-tab-item id="Shopcart">
                <img @click="changeHash" slot="icon" src="./assets/img/gouwuche.png">
                购物车
            </mt-tab-item>
            <mt-tab-item id="Search">
                <img @click="changeHash" slot="icon" src="./assets/img/sousuo.png">
                搜索
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
export default {
    data () {
        return {
            selected:''
        }
    },
    methods:{
        changeHash(){
            this.$nextTick(()=>{
                setTimeout(()=>{this.$router.push({name:this.selected})},20);
            });
        }
    },
    watch: {
        /*
        selected(newV,oldV){
           this.$router.push({
               name:newV
           })
        }
        */
    }
}
</script>
<style scoped>
</style>
