import ajax from "./ajax/ajax";

export const reqRegister = ({username,password,type}) => ajax("/register",{username,password,type},"post")
export const reqLogin = ({username,password}) => ajax("/login",{username,password},"post")
export const reqUpdate = (user) => ajax("/update",user,"post")
export const reqUser = () => ajax("/user");
export const reqUserList = (type) => ajax("/list",{type});
export const reqChatMsgList = () => ajax("/msglist")
export const reqReadChatMsg = (from) => ajax("/readmsg",{from},"post")