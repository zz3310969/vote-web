import React from 'react';
import {Row, Col,Table,Input,Button,Icon,DatePicker,Form,Card,} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
import { votereport} from '../../axios';

const { MonthPicker, RangePicker } = DatePicker;


/*投票统计列表*/

const FormItem = Form.Item;



class VoteStatisticsList extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
        data: []
    };
    componentDidMount() {
        this.start({acode:this.props.params.code});
    }

    start = (parm) => {
        this.setState({loading: true});
        votereport(parm).then(res => {
            console.log(res.data)
            this.setState({
                data: [...res.data.map(val => {
                    val.key = val.id;
                    return val;
                })],
                loading: false
            });
        });
    };
    render() {
        const self = this;
        const columns = [{
            title: '排名',
            dataIndex: 'index',
            key: 'index',
            render: function(text, record, index) {
                return "第"+record.index+"名";
            }
        },{
            title: '作品名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '投票编号',
            dataIndex: 'vote_code',
            key: 'vote_code'
        }, {
            title: '作品联系人',
            dataIndex: 'username',
            key: 'username'
        }, {
            title: '联系电话',
            dataIndex: 'usertel',
            key: 'usertel',
        }, {
            title: '总票数',
            dataIndex: 'num',
            key: 'num',
        }, {
            title: '所属活动',
            dataIndex: 'actName',
            key: 'actName',
            width:200
        }];

        const VoteTable = () => (
            <Table columns={columns} dataSource={this.state.data} />
        );

        const size = this.state.size;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="投票信息" second="活动投票统计排名" />
                {/*<Row gutter={16}>*/}
                    {/*<Col className="gutter-row" md={6}>*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="作品名称"*/}
                        {/*>*/}
                            {/*{getFieldDecorator('works_name', {*/}
                                {/*rules: [],*/}
                            {/*})(*/}
                                {/*<Input />*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*<Col className="gutter-row" md={6}>*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="活动名称"*/}
                        {/*>*/}
                            {/*{getFieldDecorator('activity_name', {*/}
                                {/*rules: [],*/}
                            {/*})(*/}
                                {/*<Input />*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                {/*<Row  gutter={16}>*/}
                    {/*<Col className="gutter-row" md={6}>*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="投票编号"*/}
                        {/*>*/}
                            {/*{getFieldDecorator('vote_num', {*/}
                                {/*rules: [],*/}
                            {/*})(*/}
                                {/*<Input />*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*<Col className="gutter-row" md={6}>*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="投票日期"*/}
                        {/*>*/}
                            {/*{getFieldDecorator('audit_state', {*/}
                                {/*rules: [],*/}
                            {/*})(*/}
                              {/*<RangePicker />*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                    {/*<Col className="gutter-row" md={4}>*/}
                        {/*<Button onClick={this.clearHandle} type="danger">清空</Button>*/}
                        {/*<Button onClick={this.searchHandle} type="primary">搜索</Button>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                <Card bordered={false} extra={<Link to={'/app/activity/list'}><Button>返回</Button></Link>} >
                    <Row>
                        <Col span={24}>
                            <VoteTable/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Form.create()(VoteStatisticsList);
