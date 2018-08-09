import React,{Component} from "react";
import {Switch,Route,Redirect} from "react-router-dom"
import Cookies from "js-cookie"
import {NavBar} from "antd-mobile"
import {connect} from "react-redux"

import LaobanInfo from "../laobaninfo/laoban_info"
import DashenInfo from "../dasheninfo/dashen_info"
import Laoban from "../laoban/laoban"
import Dashen from "../dashen/dashen"
import Message from "../message/message"
import Personal from "../personal/personal"
import NavFooter from "../../components/nav-footer/nav-footer"
import NotFound from "../../containers/not-found/not-found"
import Chat from "../chat/chat"

import {getUser} from "../../redux/actions/actions";
import {getRedirectPath} from "../../utils"


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

  componentDidMount () {

    const id =this.props.user._id
    const userid = Cookies.get('userid')
    if(!id && userid){
      this.props.getUser();
    }
  }
  render(){
    const {user} = this.props;
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
    if(path==='/') {
      return <Redirect to={getRedirectPath(user.type, user.header)}/>
    }
    const {navList} = this;
    if(user.type === "dashen"){
      navList[0].hide = true;
    }else{
      navList[1].hide = true;
    }

    const unReadCount = this.props.unReadCount
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
          <Route path="/chat/:userid" component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList = {navList} className="stick-top" unReadCount={unReadCount}/> : null}
      </div>
    )
  }
}
export default connect(
  state => ({
    user: state.user,
    unReadCount: state.chat.unReadCount
  }),
{getUser}
)(Main);