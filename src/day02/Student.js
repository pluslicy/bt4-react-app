import React from 'react';
import $ from 'jquery';

class Student extends React.Component {
  constructor(){
    super();
    this.state = {
      students:[],
      form:{
        username:'',
        password:'',
        realname:''
      }
    }
  }

  componentDidMount(){
    // 组件绑定后初始化学生数据
    this.loadStudent();
  }

  loadStudent = ()=>{
    let url = 'http://localhost:7777/student/findAll';
    $.get(url, ({status,message,data}) =>{
      if(status === 200){
        //将data中数据更新状态中
        this.setState({
          students:data
        });
      } else {
        alert(message);
      }
    });
  }

  delStudent(id){
    let url = 'http://localhost:7777/student/deleteById?id='+id;
    $.get(url,({status,message})=>{
      if(status === 200){
        this.loadStudent();
      }
      alert(message);
    })
  }

  changeHandler= (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    // username/password/realname映射到state
    this.setState({
      form:{...this.state.form,...{[name]:value}}
    })
  }

  render(){
    let {students,form} = this.state;
    return (
      <div className='student'>
        {/* 按钮 */}
        <div>
          <button onClick={this.loadStudent.bind(this)}>加载数据</button>
          <button onClick={this.loadStudent}>加载数据</button>
        </div>
        {/* 表单 */}
        {JSON.stringify(form)}
        <form>
          用户名 <input type='text' name='username' value={form.username} onChange={this.changeHandler}/>
          密码 <input type='password' name='password' value={form.password} onChange={this.changeHandler}/>
          姓名 <input type='text' name='realname' value={form.realname} onChange={this.changeHandler}/>
          <input type='submit'/>
        </form>
        {/* 表格 */}
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>用户名</th>
              <th>姓名</th>
              <th>性别</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((item)=>{
              return (<tr key={item.id}>
                <td><input type='checkbox' value={item.id}/></td>
                <td>{item.username}</td>
                <td>{item.realname}</td>
                <td>{item.gender}</td>
                <td>
                  <span onClick={this.delStudent.bind(this,item.id)}>删除</span>
                  <span>更新</span>
                </td>
              </tr>);
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Student;