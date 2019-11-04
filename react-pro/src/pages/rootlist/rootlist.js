import React from 'react'
import {Card,Table,message,Pagination,Spin,Popconfirm,Button} from 'antd'
import RootUpData from '../rootupdata/rootupdata'
// 查看所有管理员列表



class Rootlist extends React.Component{
    columns = [
        {
            title: '账号',
            dataIndex: 'userName',
            key: 'name',
        },
        {
            title: '密码',
            dataIndex: 'passWord',
            key: 'age',
        },
        {
            title: '权限等级',
            dataIndex: 'rootLevel',
            key: 'address',
            render(data){
                let rootObj={'0':'暂无权限','1':'普通管理员','9':'超级管理员'}
                return(
                    <span>{rootObj[data]}</span>
                )
            }

        },
        {
            title: '操作',
            key: 'action',
            render:(data)=>{
                return(
                    <div>
                        <Popconfirm
                            title='确定要删除吗'
                            onConfirm={this.delRoot.bind(this,data._id)}
                        >
                            <Button size='small'>删除</Button>
                        </Popconfirm>
                        <Button size='small' onClick={this.updataRoot.bind(this,data)}>修改</Button>
                    </div>


                )
            }
        }
    ];
    constructor(){
        super()
        this.state={
            dataSource:[],
            total:0,
            pageSize:5,
            page:1,
            spinning:true,
            updateShow:false
        }

    }

    cacelUpdata=(state)=>{
        if(state){
            this.getRootList(this.state.page,this.state.pageSize);
            this.setState({updateShow:false})
        }else{
            this.setState({updateShow:false})
        }
    };
    updataRoot=(data)=>{
        console.log('修改数据',data);
        this.data=data;
        this.setState({updateShow:true})
    }
    delRoot=(uid)=>{
        console.log('删除'+uid)
        this.$axios.post('/hehe/v1/admin/root/del',{uid})
            .then((data)=>{
            if(data.err===0){
                message.success('删除成功')

                this.getRootList(this.state.page,this.state.pageSize)
            }
            })
    }
    componentDidMount(){

        this.getRootList(1,this.state.pageSize)

    }
    getRootList(page,pageSize){
        this.setState({spinning:true})
        this.$axios.post('/hehe/v1/admin/root/list',{page,pageSize})
            .then((data)=>{
            console.log(data);
                if(data.err===0){
                    let tmppage=page;
                    //边界判断
                    if(Math.ceil(data.total/this.state.pageSize)<page){
                        tmppage=Math.ceil(data.total/this.state.pageSize)
                    }

                    this.setState({dataSource:data.list,total:data.total,spinning:false,page:page})
                }
            })
    }
    //分页页面发生改变
    pageChange=(page,pageSize)=>{
        console.log('分页改变',page,pageSize)
        //当页面发生改变重新请求数据
        this.getRootList(page,pageSize)


    }
    render(){
        let {dataSource,total,pageSize,spinning,page,updateShow}=this.state;
        let data=this.data
        return(
            <div>

                <Card title='管理员列表'>
                    <Spin spinning={spinning}>
                        <Table
                            pagination={false}
                            dataSource={dataSource}
                            columns={this.columns}></Table>
                        <Pagination simple current={page} total={total} pageSize={pageSize}
                                    onChange={this.pageChange}

                        />
                    </Spin>
                </Card>
                {!updateShow||<RootUpData cacelUpdata={this.cacelUpdata} data={this.data}></RootUpData>}
            </div>
        )
    }
}
export default Rootlist