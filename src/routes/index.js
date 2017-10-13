/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Page from '../components/Page';
import BasicForm from '../components/forms/BasicForm';
import BasicTable from '../components/tables/BasicTables';
import AdvancedTable from '../components/tables/AdvancedTables';
import AsynchronousTable from '../components/tables/AsynchronousTable';
import Login from '../components/pages/Login';
import Echarts from '../components/charts/Echarts';
import Recharts from '../components/charts/Recharts';
import Icons from '../components/ui/Icons';
import Buttons from '../components/ui/Buttons';
import Spins from '../components/ui/Spins';
import Modals from '../components/ui/Modals';
import Notifications from '../components/ui/Notifications';
import Tabs from '../components/ui/Tabs';
import Banners from '../components/ui/banners';
import Drags from '../components/ui/Draggable';
import Dashboard from '../components/dashboard/Dashboard';
import Gallery from '../components/ui/Gallery';
import NotFound from '../components/pages/NotFound';
import BasicAnimations from '../components/animation/BasicAnimations';
import ExampleAnimations from '../components/animation/ExampleAnimations';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';

import ActivityList from '../pages/activity/List';
import ActivityAdd from '../pages/activity/Add';
import RegistList from '../pages/regist/List';
import RegistView from '../pages/regist/View';
import AuditingList from '../pages/auditing/List';
import VoteList from '../pages/vote/List';
import VoteStatisticsList from '../pages/vote/Statistic';
import ActivityUpdate from '../pages/activity/Update';




const Wysiwyg = (location, cb) => {     // 按需加载富文本配置
    require.ensure([], require => {
        cb(null, require('../components/ui/Wysiwyg').default);
    }, 'Wysiwyg');
};

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { store } = this.props;
        const { auth } = store.getState().httpData;
        if (!auth || !auth.data.permissions.includes(permission)) hashHistory.replace('/404');
        return component;
    };
    loginAuth = (nextState, replace, next) => {
        var user = localStorage.getItem('user');
        if(user == null){
            replace('login');
            next();
        }
        next();

    };
    render() {
        return (
            <Router history={hashHistory}>
                <Route onEnter={this.loginAuth} path={'/'} components={Page}>
                    <IndexRedirect to="/app/dashboard/index" />
                    <Route path={'app'} component={App}>
                        <Route path={'form'}>
                            <Route path={'basicForm'} component={BasicForm} />
                        </Route>
                        <Route path={'table'}>
                            <Route path={'basicTable'} component={BasicTable} />
                            <Route path={'advancedTable'} components={AdvancedTable} />
                            <Route path={'asynchronousTable'} components={AsynchronousTable} />
                        </Route>
                        <Route path={'chart'}>
                            <Route path={'echarts'} component={Echarts} />
                            <Route path={'recharts'} component={Recharts} />
                        </Route>
                        <Route path={'ui'}>
                            <Route path={'icons'} component={Icons} />
                            <Route path={'buttons'} component={Buttons} />
                            <Route path={'spins'} component={Spins} />
                            <Route path={'modals'} component={Modals} />
                            <Route path={'notifications'} component={Notifications} />
                            <Route path={'tabs'} component={Tabs} />
                            <Route path={'banners'} component={Banners} />
                            <Route path={'wysiwyg'} getComponent={Wysiwyg} />
                            <Route path={'drags'} component={Drags} />
                            <Route path={'gallery'} component={Gallery} />
                        </Route>
                        <Route path={'animation'}>
                            <Route path={'basicAnimations'} component={BasicAnimations} />
                            <Route path={'exampleAnimations'} component={ExampleAnimations} />
                        </Route>
                        <Route path={'dashboard/index'} component={Dashboard} />
                        <Route path="auth">
                            <Route path="basic" component={AuthBasic} />
                            <Route path="routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />
                        </Route>


                        {/* 投票管理系统*/}
                        <Route path={'activity'}>
                            <Route  path={"list"} components={ActivityList} />
                            <Route  path={"add"} components={ActivityAdd} />
                            <Route  path={"update/:id"} components={ActivityUpdate} />
                        </Route>
                        <Route path={'regist'}>
                            <Route  path={"list"} components={RegistList} />
                            <Route  path={"view"} components={RegistView} />
                        </Route>
                        <Route path={'auditing'}>
                            <Route  path={"list"} components={AuditingList} />
                        </Route>
                        <Route path={'vote'}>
                            <Route  path={"list"} components={VoteList} />
                            <Route  path={"statistic"} components={VoteStatisticsList} />
                        </Route>
                    </Route>
                    <Route path={'404'} component={NotFound} />



                </Route>
                <Route path={'login'} components={Login} />

            </Router>
        )
    }
}