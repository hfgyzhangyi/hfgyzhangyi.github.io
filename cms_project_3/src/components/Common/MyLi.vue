<template>
    <li>
        <slot></slot>
    </li>
</template>
<script>
export default {
    name:'my-li',
    data() {
        return {

        }
    }
}
</script>
<style scoped>
li{
    float: left;
    width: 33.333333%;
    text-align: center;
    line-height: 100px;
    height: 100px;
}
li >>> span:first-child{
    height: 50px;
    display: block;
    width: 100%;
    background-size: 30px 30px;
    background-position: center bottom;
}
li >>> .cms-news{
    background: url("../../assets/img/xinwenzixun.png") no-repeat;
}
li >>> .cms-photo{
    background: url("../../assets/img/tuwenfenxiang.png") no-repeat;
}
li >>> .cms-show{
    background: url("../../assets/img/chanpinzhanshi.png") no-repeat;
}
li >>> .cms-feedback{
    background: url("../../assets/img/liuyanfankui.png") no-repeat;
}
li >>> .cms-search{
    background: url("../../assets/img/sousuozixun.png") no-repeat;
}
li >>> .cms-contact{
    background: url("../../assets/img/lianxiwomen.png") no-repeat;
}
li >>> span:last-child{
    display: block;
    height: 50px;
    line-height: 40px;
}
</style>
