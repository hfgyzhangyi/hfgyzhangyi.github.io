// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/global.css'
import {Header,Tabbar,TabItem,Button} from 'mint-ui'
// 引入自定义组件
import MyUl from '@/components/Common/MyUl'
import MyLi from '@/components/Common/MyLi'
import MyComment from '@/components/Common/MyComment'
import NavBar from '@/components/Common/NavBar'

Vue.prototype.$axios = Axios
Vue.use(MintUI)
// 配置公共URL
// Axios.defaults.baseURL = 'https://www.sinya.online/api/'
Vue.config.productionTip = false
// 配置Vue组件
Vue.component(Header.name,Header)
Vue.component(Tabbar.name,Tabbar)
Vue.component(TabItem.name,TabItem)
Vue.component(Button.name,Button)
Vue.component(MyUl.name,MyUl)
Vue.component(MyLi.name,MyLi)
Vue.component(NavBar.name,NavBar)
Vue.component(MyComment.name,MyComment)
// 配置过滤器
// 定义moment全局日期过滤器
import Moment from 'moment'
Vue.filter("convertTime",function(val,formatStr){
  return Moment(val).format(formatStr);
})
//配置图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//配置请求拦截器,显示loading图标
Axios.interceptors.request.use(function(config){
  MintUI.Indicator.open({
    text:"加载中..."
  });
  return config;
})
//配置响应拦截器,关闭loading图标
Axios.interceptors.response.use(function(){
  MintUI.Indicator.close();
  return response;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
