import React from 'react';
import './App.css';
// import List from './day01/List'
// import UserInfo from './day01/UserInfo'
// import List from './day02/List'
// import Clock from './day02/Clock'
import Student from './day02/Student'
import Course from './day03/Course'
import Teacher from './day03/Teacher'
import StudentCourse from './day03/StudentCourse'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav">
          <div className="title">学生选课系统</div>
          <ul>
            <li><Link to="/student">学生管理</Link></li>
            <li><Link to="/course">课程管理</Link></li>
            <li><Link to="/teacher">教师管理</Link></li>
            <li><Link to="/sc">选课管理</Link></li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/student" component={Student}/>
            <Route path="/course" component={Course}/>
            <Route path="/teacher" component={Teacher}/>
            <Route path="/sc" component={StudentCourse}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );

  /*
  // day01
  let msg = "hello react"
  let dd = [1,2,3,4,5,6,7,8];
  let user = {name:'terry',photo:'xxx'}
  return (
    <div className="App">
      <UserInfo user={user}/>
      {msg}
      <List a='aaa' b={3} c={true} data={['terry','larry','tom']} d={{name:'terry'}}/>
      <List data={dd}/>
    </div>
  );
  */
}

export default App;
