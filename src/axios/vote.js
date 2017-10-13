/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get } from './tools';
import * as config from './config';
import { message } from 'antd';

axios.defaults.headers.common['Authorization'] = "";
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var token = sessionStorage.getItem('token');
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export const getTableList = (url,params) => axios.get(url, {params:params}).then(function (response) {
    return response.data;
}).catch(function (error) {
    
    console.log(error);
});