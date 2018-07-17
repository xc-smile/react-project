import {combineReducers} from 'redux'
function xxx(preState=0,action) {
  switch (action.type) {
    default:
      return preState;
  }
}
function yyy(preState={},action) {
  switch(action.type){
    default:
      return preState;
  }
}

export default combineReducers({
  xxx,
  yyy
})