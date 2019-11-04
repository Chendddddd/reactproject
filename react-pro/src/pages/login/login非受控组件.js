import React from 'react'
//非受控组件
class Login extends React.Component{
    submit=()=>{
        let us=this.refs.us.value
        let ps=this.refs.ps.value
        console.log(us,ps)
    }
    render(){
        return(
            <div>
                <input type="text" placeholder='userName' ref='us'/>
                <br/>
                <input type="text" placeholder='password' ref='ps'/>
                <button onClick={this.submit}>登录</button>
</div>
)
}
}
export default Login