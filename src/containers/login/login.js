import React, {Component} from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Logo from "../../components/logo/logo"
import {login} from "../../redux/actions/actions"

class Login extends Component {
  state = {
    username : "",
    password : ""
  }
  login = () => {
    this.props.login(this.state)
  }
  handlerChange = (name,value) => {
    this.setState({[name]:value})
  }
  toRegister = () => {
    this.props.history.replace("/register")
  }

  render() {
    const {redirectTo,msg} = this.props;
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>登陆</NavBar>
        <Logo/>
        <WingBlank>
          <p>{msg}</p>
          <List>
            <WhiteSpace/>
            <InputItem placeholder="请输入用户名" onChange={(value) => {this.handlerChange("username",value)}}>用户名: </InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入密码" onChange={(value) => {this.handlerChange("password",value)}}>密码: </InputItem>
            <WhiteSpace/>

            <WhiteSpace/>
            <Button type="primary" onClick={this.login}>登陆</Button>
            <Button onClick={this.toRegister}>没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => state.user,
  {login}
)(Login);