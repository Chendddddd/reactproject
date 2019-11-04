import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
//antd的form组件
class Login extends React.Component{
    submit=()=>{
        // console.log(this.state)
        // let result=this.props.form.getFieldsValue()
        this.props.form.validateFields((err,userinfo)=>{
            if(err){
                message.error('信息输入有误请重试')
            }else{
                message.success('登录成功，1s后跳转首页')
            }
        })
    }
    render(){
        console.log(this,'login')
        const { getFieldDecorator } = this.props.form;
        //const { getFieldDecorator } = this.props.form;
        return(
            <div className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName',{
                        rules:[{ required: true, message: 'Please input your username!'},
                            {min:3,message:'用户名最小长度3位'},
                            {max:9,message:'用户名最大长度9位'}]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="userName"
                        />
                    )}

                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('passWord',{})(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="passWord"
                        />
                    )}


                </Form.Item>
                <button onClick={this.submit}>提交</button>
            </div>
        )
    }
}
export default Form.create()(Login)