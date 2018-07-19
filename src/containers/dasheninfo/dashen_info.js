import React, {Component} from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  List,
} from "antd-mobile"

import HeaderSelector from "../../components/headerSelector/headerSelector"
import {update} from "../../redux/actions/actions";

class DashenInfo extends Component {
  state ={
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
  }
  handlerChang = (name,value)=>{
    this.setState({[name]:value})
  };
  setHeader = (header) => {
    this.setState({header})
  }
  render() {
    const {user} = this.props;
    if(user.header){
      return <Redirect to="/dashen"/>
    }
    return <div>
      <NavBar>信息完善</NavBar>
      <HeaderSelector setHeader={this.setHeader}/>
      <List>
        <InputItem onChange={(value) => this.handlerChang("post",value)}>求职岗位: </InputItem>
        <TextareaItem rows={3} title="个人简介: "  onChange={(value) => this.handlerChang("info",value)}/>
        <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
      </List>

    </div>
  }
}
export default connect(
  state => ({user: state.user}),
  {update}
)(DashenInfo)