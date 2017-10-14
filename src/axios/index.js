/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get } from './tools';
import * as config from './config';
import md5Util from '../utils/md5';
import { message } from 'antd';
import querystring from 'querystring';
/*axios.defaults.baseURL = 'http://localhost:8080/selin-web/';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/

/** 活动 */
export const actlist = (params) => axios.get('/api/vote/activityAction/list.action',{params:params}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const actbase = () => axios.get('/api/vote/activityAction/base.action').then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const actload = (params) => axios.get('/api/vote/activityAction/load.action',{params:params}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const actsave = (params) => axios.post('/api/vote/activityAction/create.action',params).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const actupdate = (params) => axios.post('/api/vote/activityAction/update.action',params).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});
/** 投票 */
export const votelist = (params) => axios.get('/api/vote/voteAction/list.action',{params:params}).then(function (response) {
    console.log(response.data)
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const votereport = (params) => axios.get('/api/vote/voteAction/reportByoneAct.action',{params:params}).then(function (response) {
    console.log(response.data)
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "javascript",
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {...{client_id: '792cdcd244e98dcd2dee',
    client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'}, code: code}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});




export const login = (params) =>
    axios.get('/api/tokenAction/accessToken.action',{
        params:{
            username:params.username,
            password:md5Util.to_hex_md5(params.password).toUpperCase()
        }
    }).then(res => res.data).catch(function (error) {
            debugger;
            console.log(error);
        });

