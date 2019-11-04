import React from 'react'
import {Card,message} from 'antd'
import Style from './index.module.less'
class RootAdd extends React.Component{
    constructor(props){
        super()
        this.state=props.data
    }
    componentWillReceiveProps(props){
        console.log(props)
    }
    submit=()=>{
        // let {userName,passWord}=this.state
        let uid=this.state._id
        this.$axios.post('/hehe/v1/admin/root/update',{uid,rootLevel:9})
            .then((data)=>{
                if(data.err===0){
                    message.success('修改成功')
                    this.props.cacelUpdata(1)
                }
            })
    }

    render(){
        console.log(this,'更新组件')
        let{userName,passWord}=this.state
        return(
            <div className={Style.unDate}>
                <Card title='管理员添加'>
                    <label>管理员账号：</label>
                    <input type="text" value={userName}
                        onChange={(e)=>{
                            this.setState({userName:e.target.value})
                        }}
                    />
                    <br/>
                    <label>管理员密码：</label>
                    <input type="text"  value={passWord}
                           onChange={(e)=>{
                               this.setState({passWord:e.target.value})
                           }}

                    />
                    <br/>
                    <button onClick={this.submit}>修改</button>
                    <button onClick={()=>{
                        this.props.cacelUpdata(0)
                    }}>关闭</button>
                </Card>
            </div>
        )
    }
}
export default RootAdd