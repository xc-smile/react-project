import React,{Component} from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import Logo from "../../components/logo/logo"

class Login extends Component{
  toRegister = () => {
    this.props.history.replace("/register")
  }
  render(){
    return(
      <div>
        <NavBar>登陆</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem placeholder="请输入用户名">用户名: </InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入密码">密码: </InputItem>
            <WhiteSpace/>

            <WhiteSpace/>
            <Button type="primary">登陆</Button>
            <Button onClick={this.toRegister}>没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default Login;