import React,{Component} from "react";
import {Switch,Route} from "react-router-dom"
import Cookies from "js-cookie"
import {NavBar} from "antd-mobile"

import LaobanInfo from "../laobaninfo/laoban_info"
import DashenInfo from "../dasheninfo/dashen_info"
import Laoban from "../laoban/laoban"
import Dashen from "../dashen/dashen"
import Message from "../message/message"
import Personal from "../personal/personal"
import NavFooter from "../../components/nav-footer/nav-footer"

class Main extends Component{
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  render(){
    const path = this.props.location.pathname;
    // 从navList中找出对应的nav    find(): 返回一个回调函数返回true的元素
    const currentNav = this.navList.find(function (nav,index) {
      return path === nav.path
    })
    const userid = Cookies.get("userid");
    if(!userid){
      this.props.history.replace('/login');
      return null
    }
    return(
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path="/laobaninfo" component={LaobanInfo}/>
          <Route path="/dasheninfo" component={DashenInfo}/>
          <Route path="/dashen" component={Dashen}/>
          <Route path="/laoban" component={Laoban}/>
          <Route path="/message" component={Message}/>
          <Route path="/personal" component={Personal}/>
        </Switch>
        {currentNav ? <NavFooter /> : null}
      </div>
    )
  }
}
export default Main;