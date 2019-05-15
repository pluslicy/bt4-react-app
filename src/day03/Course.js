import React from 'react';
import $ from 'jquery';

class Course extends React.Component {

  constructor(){
    super();
    this.state = {
      flag:false,
      teachers:[],
      courses:[],
      form:{
        name:"",
        credit:"",
        description:"",
        teacherId:""
      }
    }
  }

  componentDidMount(){
    // 1. 加载教师信息
    this.loadTeachers();
    // 2. 加载课程信息
    this.loadCourses();
  }
  loadTeachers(){
    $.get("http://localhost:7777/teacher/findAll",({status,message,data})=>{
      if(status === 200){
        this.setState({
          "teachers":data,
          form:{...this.state.form,...{teacherId:data[0].id}}
        })
      } else {alert (message)}
    })
  }
  loadCourses(){
    $.get("http://localhost:7777/course/findAll",({status,message,data})=>{
      if(status === 200){
        // 将查询数据设置到state中
        this.setState({ "courses":data })
      } else {alert (message)}
    })
  }

  changeHandler = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      form:{...this.state.form,...{[name]:value}}
    })
  }
  submitHandler = (event)=>{
    let url = "http://localhost:7777/course/saveOrUpdate"
    $.post(url,this.state.form,({message})=>{
      alert(message);
      //刷新
      this.loadCourses();
    })
    event.preventDefault();
  }

  toUpdate(id){
    // 1. 通过id查找课程信息
    // 2. 将返回结果设置到this.state.form中
    // state->form
    $.get("http://localhost:7777/course/findById?id="+id,({status,message,data})=>{
      if(status === 200){
        // 将查询数据设置到state中
        this.setState({ "form":data })
      } else {alert (message)}
    })
  }
  toAdd=()=>{
    this.setState({
      flag:true,
      form:{
        name:"",
        credit:"",
        description:"",
        teacherId:""
      }
    })
  }


  render(){
    let {teachers,courses,form,flag} = this.state;
    let $form;
    if(flag){
      $form = (
        <form onSubmit={this.submitHandler}>
          课程名称
          <input type="text" name="name" value={form.name} onChange={this.changeHandler}/> <br/>
          课程学分
          <input type="text" name="credit" value={form.credit} onChange={this.changeHandler}/> <br/>
          课程简介
          <textarea name="description" value={form.description} onChange={this.changeHandler}></textarea> <br/>
          任课老师
          <select name="teacherId" value={form.teacherId} onChange={this.changeHandler}>
            {
              teachers.map((item)=>{
                return <option value={item.id} key={item.id} >{item.realname}</option>
              })
            }
          </select> <br/>
          <input type="submit" value="提交"/>
        </form>
      )
    } 

    return (
      <div>
        <h2>课程管理</h2>
        <button onClick={this.toAdd}>添加</button>
        {/* 表单 */}
        {JSON.stringify(form)}
        {$form}
        {/* 表格 */}
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>课程名称</th>
              <th>课程学分</th>
              <th>课程介绍</th>
              <th>任课老师</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((item)=>{
              return (<tr key={item.id}>
                <td><input type='checkbox' value={item.id}/></td>
                <td>{item.name}</td>
                <td>{item.credit}</td>
                <td>{item.description}</td>
                <td>{item.teacherId}</td>
                <td>
                  <span>删除</span>
                  <span onClick={this.toUpdate.bind(this,item.id)}>更新</span>
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

export default Course;