import io from "socket.io-client"

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from "../action-type/action-type";
import {
  reqRegister,
  reqLogin,
  reqUpdate,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadChatMsg
} from "../../api";

const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
const receiveUserList = (users) => ({type:RECEIVE_USER_LIST,data:users})
const receiveMsgList = ({users,chatMsgs,userid}) => ({type:RECEIVE_MSG_LIST, data:{users,chatMsgs,userid}})
const receiveMsg = (chatMsg,isToMe) => ({type:RECEIVE_MSG, data: {chatMsg,isToMe}});
const msgRead = ({from ,to, count}) => ({type:MSG_READ, data: {from,to,count}})


//异步action

//注册
export function register({username,password,password2,type}) {
//表单验证
  console.log(username, password, password2, type);
  if(!username || !password){
    return errorMsg("用户名和密码必须输入")
  }
  if(password !== password2){
    return errorMsg("两次密码必须一致")
  }

  return async dispatch => {
    const res = await reqRegister({username,password,type});
    const result = res.data;
    if(!result.code){
      dispatch(authSuccess(result.data))
    }else{
      dispatch(errorMsg(result.msg))
    }
  }
}

//登陆

export const login = ({username,password}) => {
  console.log(username, password)
  if(!username || !password){
    return errorMsg("用户名和密码必须输入")
  }
  return async dispatch =>{
    const res = await reqLogin({username,password});
    const result = res.data;
    if(!result.code){
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}


export const update = (user) => {
  return async dispatch => {
    const res = await reqUpdate(user);
    const result = res.data;
    if(!result.code){
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
  }
}


export const getUser = () => {
  return async dispatch => {
    const res = await reqUser();
    const result = res.data;
    if(!result.code){
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
  }
};
export const getUserList = (type) => {
  return async dispatch => {
    const res = await reqUserList(type)
    const result = res.data;
    if(result.code===0){
      dispatch(receiveUserList(result.data))
    }
  }
};

/*
初始化客户端socketio
1. 连接服务器
2. 绑定用于接收服务器返回chatMsg的监听
 */
function initIO(dispatch, userid) {
  if(!io.socket) {
    io.socket = io("ws://localhost:4000")
    io.socket.on("receiveMsg",(chatMsg) => {
      if(chatMsg.from === userid || chatMsg.to === userid){
        dispatch(receiveMsg(chatMsg,chatMsg.to === userid))
      }
    })
  }
}

/*
获取当前用户相关的所有聊天消息列表
(在注册/登陆/获取用户信息成功后调用)
 */
async function getMsgList(dispatch, userid) {
  initIO((dispatch, userid))
  const res = await  reqChatMsgList()
  const result = res.data;
  if(result.code === 0){
    const {chatMsgs, users} =result.data;
    dispatch(receiveUserList({chatMsgs, users, userid}))
  }
}

//发送消息的异步action
export const sendMsg = ({from, to, content}) => {
  return async dispatch => {
    io.socket.emit("sendMsg",{from,to,content})
  }
}

//更新读取消息的异步action

export const readMsg = (userid) => {
  return async (dispatch, getState) => {
    const res = await reqReadChatMsg(userid)
    const result = res.data;
    if (result.code === 0) {
      const content = result.data;
      const from = userid;
      const to = getState().user._id;
      dispatch(msgRead({from, to, content}))
    }
  }
}