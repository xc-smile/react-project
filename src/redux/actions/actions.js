import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from "../action-type/action-type";
import {
  reqRegister,
  reqLogin,
  reqUpdate,
  reqUser
} from "../../api";

const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
const resetUser = (msg) => ({type:RESET_USER,data:msg})


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
}