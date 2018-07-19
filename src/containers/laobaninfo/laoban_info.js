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

 class LaobanInfo extends Component {
  state ={
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '' // 工资
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
      return <Redirect to="/laoban"/>
    }
    return <div>
      <NavBar>信息完善</NavBar>
      <HeaderSelector setHeader={this.setHeader}/>
      <List>
        <InputItem onChange={(value) => this.handlerChang("post",value)}>招聘职位: </InputItem>
        <InputItem onChange={(value) => this.handlerChang("company",value)}>公司名称: </InputItem>
        <InputItem onChange={(value) => this.handlerChang("salary",value)}>薪酬: </InputItem>
        <TextareaItem rows={3} title="要求: "  onChange={(value) => this.handlerChang("info",value)}/>
        <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
      </List>

    </div>
  }
}
export default connect(
  state => ({user: state.user}),
{update}
)(LaobanInfo)