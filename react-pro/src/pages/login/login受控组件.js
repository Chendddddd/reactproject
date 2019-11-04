import React from 'react'
class Login extends React.Component{
    constructor(){
        super()
        this.state={
            us:'',
            ps:''
        }
    }
    submit=()=>{
        console.log(this.state)
    }
    render(){
        return(
            <div>
                <input type="text" placeholder='userName' value={this.state.us}
                    onChange={(e)=>{
                        this.setState({us:e.target.value})
                    }}

                />
                <input type="text" placeholder='password' value={this.state.ps}
                    onChange={(e)=>{
                        this.setState({us:e.target.value})
                    }}/>
                <button onClick={this.submit}>登录</button>
            </div>
        )
    }
}