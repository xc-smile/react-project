import React, {Component} from "react";
import {NavBar, List, InputItem, Icon,Grid} from "antd-mobile"
import {connect} from "react-redux";


import {sendMsg} from "../../redux/actions/actions";

const Item = List.Item;

class Chat extends Component {
  state = {
    content: "",
    isShow: false
  }


  submit = () => {
    const content = this.state.content.trim();
    const to = this.props.match.params.userid;
    const from = this.props.user._id;
    this.props.sendMsg({from, to, content});
    this.setStaet({content: ""})
  };

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
    this.props.readMsg(this.props.match.params.userid)
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillMount() {
    const emojisString = '☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄☺🙂🤗🙄'
    const emojis = []
    emojisString.split('').forEach(emoji => {
      emojis.push({
        text: emoji
      })
    })
    this.emojis = emojis
  }

  componentWillUnmount() {
    this.props.readMsg(this.props.match.params.userid)
  }

  // 切换表情列表的显示
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if (isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  render() {
    const {user} = this.props;
    const {chatMsgs, users} = this.props.chat;
    const targetId = this.props.match.params.userid;
    if (!users[targetId]) {
      return null
    }
    const meId = user._id;
    const chatId = [targetId, meId].sort().join("_");
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
    const targetIcon = users[targetId] ?
      require(`../../components/headerSelector/imgs/${users[targetId].header}.png`) : null;
    return (
      <div id='chat-page'>
        <NavBar className="stick-top" icon={<Icon type="left"/>} onLeftClick={() => this.props.history.goBack()}>
          {users[targetId].username}
        </NavBar>
        <List style={{marginBottom: 50, marginTop: 50}}>
          {
            msgs.map(msg => {
              if (msg.from === targetId) {
                return (
                  <Item key={msg._id} thumb={targetIcon}>
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item key={msg._id} className="chat-me" extra="我">
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>
        <div className="am-tab-bar">
          <InputItem
            placehoder="请输入"
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight: 10}}></span>
                <span onClick={this.submit}>发送</span>
              </span>

            }
          />
          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content + item.text})
                }}
              />
            ) : null
          }
        </div>
      </div>
    )

  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat);