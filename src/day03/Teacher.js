import React from 'react'
import {Button,Table,Modal,Calendar} from 'antd'
import $ from 'jquery'

class Teacher extends React.Component {
  constructor(){
    super();
    this.state = {
      teachers:[],
      visible:false
    }
  }
  componentDidMount(){
    this.loadTeacher();
  }
  loadTeacher = ()=>{
    let url = 'http://localhost:7777/teacher/findAll';
    $.get(url, ({status,message,data}) =>{
      if(status === 200){
        //将data中数据更新状态中
        this.setState({
          teachers:data
        });
      } else {
        alert(message);
      }
    });
  }

  handleCancel =()=>{
    this.setState({
      visible:false
    })
  }
  toAdd = ()=>{
    this.setState({visible:true})
  }

  render(){
    let columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key:'id'
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '姓名',
        dataIndex: 'realname',
      },
      {
        title: '性别',
        dataIndex: 'gender',
      }
    ]
    return (
      <div>
        <h2>教师管理</h2>
        <div>
          <Button type="primary" onClick={this.toAdd}>添加</Button>
          <Button type="danger">批量删除</Button>
          <Button type="link">导出</Button>
        </div>
        <Table rowKey={record => record.id} dataSource={this.state.teachers} columns={columns} />; 

        <Calendar />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

export default Teacher;