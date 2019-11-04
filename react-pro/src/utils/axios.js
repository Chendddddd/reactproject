import axios from 'axios'
import store from '../store/store'
import actionCreator from '../store/actionCreator'
import webStorage from './webstorage'
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('请求拦截器',config)
    if(!config.data){
        config.data={}
    }
    config.data.token=webStorage.getItem('token')
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('相应拦截器',response.data)
    let {err}=response.data
    let arr=[-997,-998]
    if(arr.indexOf(err)>=0){
        let action=actionCreator.changeTokenModal(false)
        store.dispatch(action)
    }
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default axios