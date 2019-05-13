import React from 'react';

// 用户信息栏 user
function UserInfo(props){
  let {user} = props;
  if(user) {
    return (
      <div>
        欢迎您 {user.name} 
        头像
      </div>
    )
  } 
  return (
    <div><a href="#">亲，请登录</a></div>
  )
}

export default UserInfo;