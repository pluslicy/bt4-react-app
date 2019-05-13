import React from 'react';
import './App.css';
import List from './day01/List'
import UserInfo from './day01/UserInfo'

function App() {
  let msg = "hello react"
  let dd = [1,2,3,4,5,6,7,8];
  let user = {name:'terry',photo:'xxx'}
  return (
    <div className="App">
      <UserInfo user={user}/>
      {msg}
      {/* 调用List组件，为List传递参数 */}
      <List a='aaa' b={3} c={true} data={['terry','larry','tom']}/>
      <List data={dd}/>
    </div>
  );
}

export default App;
