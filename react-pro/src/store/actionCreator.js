export default {
    changeTokenModal(bool){
        return{
            type:"CHANGE_TOKENMODAL",
            params:bool
        }
    },
    getUid(uid){
        return{
            type:'GET_UID',
            params:uid
        }

    }
}