import React,{Component} from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'

import Logo from "../../components/logo/logo"

class Register extends Component{
  render(){
    return(
      <div>
        <NavBar>注册</NavBar>
        <Logo />
        <WingBlank>
        <List>
          <WhiteSpace/>
          <InputItem placeholder="请输入用户名">用户名: </InputItem>
          <WhiteSpace/>
          <InputItem type="password" placeholder="请输入密码">密码: </InputItem>
          <WhiteSpace/>
          <InputItem type="password" placeholder="重新输入密码">确认密码: </InputItem>
          <WhiteSpace/>
          <List.Item>
            <span>用户类型: </span>&nbsp;&nbsp;
            <Radio>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio>老板</Radio>
          </List.Item>
          <WhiteSpace/>
          <Button type="primary">注册</Button>
          <Button>已有账号</Button>
        </List>
        </WingBlank>
      </div>
    )
  }
}
export default Register;