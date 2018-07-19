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
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Logo from "../../components/logo/logo"
import {register} from "../../redux/actions/actions";


class Register extends Component{
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen'
  }
  register = () => {
    this.props.register(this.state)
  }
  handlerChange = (name,value) => {
    this.setState({[name]:value})
  }
  toLogin = () => {
    this.props.history.replace("/login")
  }
  render(){
    const {redirectTo,msg} = this.props
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return(
      <div>
        <NavBar>注册</NavBar>
        <Logo />
        <WingBlank>
          <p>{msg}</p>
        <List>
          <WhiteSpace/>
          <InputItem placeholder="请输入用户名" onChange={(value) => {this.handlerChange("username",value)}}>用户名: </InputItem>
          <WhiteSpace/>
          <InputItem type="password" placeholder="请输入密码" onChange={(value) => {this.handlerChange("password",value)}}>密码: </InputItem>
          <WhiteSpace/>
          <InputItem type="password" placeholder="重新输入密码" onChange={(value) => {this.handlerChange("password2",value)}}>确认密码: </InputItem>
          <WhiteSpace/>
          <List.Item>
            <span>用户类型: </span>&nbsp;&nbsp;
            <Radio onClick={() => {this.handlerChange("type","dashen")}}
                   checked={this.state.type === "dashen"}
            >
              大神
            </Radio>&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio onClick={() => {this.handlerChange("type","laoban")}}
                   checked={this.state.type === "laoban"}
            >
              老板
            </Radio>
          </List.Item>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
          <Button onClick={this.toLogin}>已有账号</Button>
        </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state => state.user,
  {register}
)(Register);