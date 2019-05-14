import React from 'react';

class List extends React.Component {
  // 构造函数，初始化
  constructor(props){
    super(props);
    // 局部状态（仅在当前组件中有效），动态改变ui；获取ui上数据状态变化
    this.state = {
      arr : [1,2,3]
    }

    // 每隔1s改变arr
    setInterval(() => {
      this.setState({
        arr:[...this.state.arr,Math.random()]
      })
    }, 1000);
  }
  
  // 渲染
  render(){
    // 将state中的局部状态结构到不能变量上
    let {arr} = this.state;
    return (
      <div>
        <ul>
          {
            arr.map((item,index) => <li key={index}>{item}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default List;