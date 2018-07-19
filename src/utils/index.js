/*
 工具函数
*/
export  function getRedirectPath(type,header) {
  let path = "";
  path += type === "dashen" ? "dashen" : "laoban"
  if(!header){
    path += "info"
  }
  return path;
}