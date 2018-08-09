import React,{Component} from "react";
import PropTypes from "prop-types";
import {Card,WingBlank,WhiteSpace} from "antd-mobile"

const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render(){
    return (
      <WingBlank style={{marginTop:20,marginBottom:50}}>
        {
          this.props.userList.map(user => (
            <div key={user._id}>
              <WhiteSpace/>
              <Card>
                <Header
                  thumb={user.header ? require(`../../components/headerSelector/imgs/${user.header}.png`) : null}
                  extra={user.username}
                />
                <Body>
                <div>职位: {user.post}</div>
                {user.company ? <div>公司: {user.company}</div> : null}
                {user.salary ? <div>月薪: {user.salary}</div> : null}
                <div>描述: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))
        }
      </WingBlank>
    )
  }
}
export default UserList;