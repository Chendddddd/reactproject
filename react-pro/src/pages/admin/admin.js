import React from 'react'
import Style from './index.module.less'
import  Modal from  '../../components/model/modal'
import { Layout, Menu, Icon,Dropdown ,Button,message} from 'antd';
import {withRouter} from 'react-router-dom'
import CustomSlider from '../../components/customSlider/customSlider'
import {connect}from 'react-redux'
const { Header, Content, Footer, Sider } = Layout;

class Admin extends React.Component{
    renderMenu=()=>{
        return(
            <Menu>
                <Menu.Item onClick={this.logout}>
                    <span>用户注销</span>
                </Menu.Item>

            </Menu>
        );

    }
    logout=()=>{
        console.log(this.props.uid);
        let uid=this.props.uid;
        this.$axios.post('/hehe/v1/admin/user/logout',{uid})
            .then((data)=>{
            if(data.err===0){
                message.success('退出成功')
                this.props.history.replace('/login')
            }
        });



    }
    render(){
        return(
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                <CustomSlider></CustomSlider>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} >

                        <Dropdown overlay={this.renderMenu} placement="bottomLeft">
                            <Button>呵呵哒</Button>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                <Modal></Modal>
            </Layout>
        )
    }
}
let mapStateToProps=(state)=>{
    console.log(state)
    return state
}
export default connect((state)=>state)(withRouter(Admin))