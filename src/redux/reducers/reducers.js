import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from "../action-type/action-type";
import {getRedirectPath} from "../../utils"

const initUser = {
  username:"",
  type:"",
  msg:"",
  redirectTo : ""
}

function user(state = initUser,action) {
  switch (action.type) {
    case AUTH_SUCCESS :
      const redirectTo = getRedirectPath(action.data.type,action.data.header);
      return {...action.data,redirectTo};
    case ERROR_MSG :
      return {...state,msg : action.data};
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {...initUser,msg:action.data}
    default :
      return state;
  }
}

const initUserList = []
function userList(state = initUserList,action) {
  switch (action.type){
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  chatMsgs: [],  // 消息数组 [{from: id1, to: id2}{}]
  users: {},  // 所有用户的集合对象{id1: user1, id2: user2}
  unReadCount: 0 // 未读消息的数量
}
function chat( state = initChat , action) {
  switch (action.type) {
    case RECEIVE_MSG:
      var {chatMsg,userid} = action.data
      return {
        chatMsg: [...state.chatMsgs,chatMsg],
        users: state.users,
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userid ? 1 :0)
      }
    case RECEIVE_MSG_LIST:
      var {chatMsgs,users,userid} = action.data;
      return {
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preTotal, msg) => {
          return preTotal+ (!msg.read && msg.to === userid ? 1 : 0)
        },0)
      }
    case MSG_READ:
      const {count, from ,to } = action.data
      return {
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from === from&&msg.to === to && !msg.read){
            return {...msg, read: true}
          }else{
            return msg
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}
export default combineReducers({user,userList,chat})