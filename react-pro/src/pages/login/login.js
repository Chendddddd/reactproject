import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message,Card } from 'antd';
import webStorage from '../../utils/webstorage'
//antd的form组件
import Style from './index.module.less'
import ActionCreator from  '../../store/actionCreator'
import  {connect} from 'react-redux'

class Login extends React.Component{
    submit=()=>{
        // console.log(this.state)
        // let result=this.props.form.getFieldsValue()
        this.props.form.validateFields((err,userinfo)=>{
            if(err){
                message.error('信息输入有误请重试')
            }else{
                this.$axios.post('/hehe/v1/admin/user/login',userinfo)
                    .then((data)=>{
                        console.log(data.uid)

                        if(data.err===0){
                            webStorage.setItem('rootList',data.rootList)
                            webStorage.setItem('token',data.token)
                            webStorage.setItem('uid',data.uid)
                            this.props.history.push('./admin/home')
                        }
                        let uid=data.uid;
                        this.props.pushUid(uid)
                    })
                // message.success('登录成功，1s后跳转首页')
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        //const { getFieldDecorator } = this.props.form;
        return(
            <div className={Style.login}>
            <Card title='用户登录' className={Style.loginCard}>
                <div className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" onClick={this.submit} className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </div>
            </Card>
            </div>
        )
    }
}
let mapDispathToProps=(dispath)=>{
    return{
        pushUid:function(uid){
            console.log(uid)
            setState:{}
            let action=ActionCreator.getUid(uid)
            dispath(action)
        }
    }
}
export default connect(state=>state,mapDispathToProps)(Form.create()(Login));