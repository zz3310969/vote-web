import React, {Component} from 'react';
import {Row, Col, Menu, Dropdown, Form, Table, Input, Button, Card, Icon} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import { actlist} from '../../axios';

/*活动管理列表*/
const FormItem = Form.Item;

const columns = [{
    title: '活动名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '活动编号',
    dataIndex: 'code',
    key: 'code',
}, {
    title: '报名开始时间',
    dataIndex: 'apply_start_time',
    key: 'apply_start_time',
}, {
    title: '报名结束时间',
    dataIndex: 'apply_end_time',
    key: 'apply_end_time',
}, {
    title: '投票开始时间',
    dataIndex: 'vote_start_time',
    key: 'vote_start_time',
}, {
    title: '投票结束时间',
    dataIndex: 'vote_end_time',
    key: 'vote_end_time',
}, {
    title: '活动状态',
    dataIndex: 'statusname',
    key: 'statusname',
}, {
    title: '每人每日投票数',
    dataIndex: 'vote_limit',
    key: 'vote_limit',
}, {
    title: '',
    dataIndex: 'operator',
    key: 'operator',
    width: 80,
    render: function (text, record, index) {
        const linkUrl = '/app/activity/update/' + record.id
        return (
            <div style={{textAlign: 'right', paddingRight: 20}}>
                <Link to={linkUrl}><Icon type="edit"/>修改</Link>
            </div>
        )
    }
}];

class ActivityList extends React.Component {
    state = {
        from_query: {
            name: '',
            currentPage: 1,
            limit: 10
        },
        size: 'default',
        loading: false,
        iconLoading: false,
        data: []
    };

    componentDidMount() {
        this.start(this.state.from_query);
    }

    start = (parm) => {
        this.setState({loading: true});
        actlist(parm).then(res => {
            this.setState({
                data: [...res.data.dataList.map(val => {
                    val.key = val.id;
                    return val;
                })],
                loading: false
            });
        });
    };

    handleSubmit = (e) => {
        let submitValues = {};
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Object.assign(submitValues, values)
                const {dispatch} = this.props;
                this.setState({loading: true});
                actlist(submitValues).then(res => {
                    this.setState({
                        data: [...res.data.dataList.map(val => {
                            val.key = val.id;
                            return val;
                        })],
                        loading: false
                    });
                });
            }
        });
    };

    render() {
        const size = this.state.size;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="活动管理" second="活动列表"/>
                <Row gutter={16}>
                    <Form layout='horizontal' onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                        <Col className="gutter-row" md={6}>
                            <FormItem
                                {...formItemLayout}
                                label="活动名称"
                                hasFeedback
                            >
                                {getFieldDecorator('name', {
                                    rules: [],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" md={3}>
                            <Button type='primary' htmlType="submit">搜索</Button>
                        </Col>
                    </Form>
                    <Col className="gutter-row" md={6}>
                    </Col>
                    <Col className="gutter-row" md={3} style={{textAlign: 'right'}}>
                        <Link to={'/app/activity/add'}><Button type="primary">新增</Button></Link>
                    </Col>
                </Row>
                <Card bordered={false}>
                    <Row>
                        <Col span={24}>
                            <Table columns={columns} dataSource={this.state.data}/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

const mapStateToPorps = state => {
    const {auth} = state.httpData;
    return {auth};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(ActivityList));
