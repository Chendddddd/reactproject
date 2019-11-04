const State={
    tokenModal:true,
    uid:''

}
export default (preState=State,action)=>{
    let newData=JSON.parse(JSON.stringify(preState))
    let {type,params}=action
    switch (type){
        case 'CHANGE_TOKENMODAL':
            newData.tokenModal=params
            break;
        case 'GET_UID':
            newData.uid=params;
        default:
            break;
    }
    return newData

}