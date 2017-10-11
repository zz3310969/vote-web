import React from 'react';
import {Row, Col,Table,Input,Button,Icon,DatePicker,Form,Card,} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
const { MonthPicker, RangePicker } = DatePicker;


/*投票结果列表*/

const FormItem = Form.Item;



const data = [{
    key: '1',
    id:'1',
    works_name:'作品1',
    vote_num:'000001',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_user: '张三',
    vote_date:'2017-09-09 22:29:12',
    vote_count: 3
},{
    key: '2',
    id:'2',
    works_name:'作品13',
    vote_num:'000002',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_user: '张三',
    vote_date:'2017-09-09 22:29:12',
    vote_count: 3
},{
    key: '3',
    id:'3',
    works_name:'作品31',
    vote_num:'000003',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_user: '张三12',
    vote_date:'2017-09-09 22:29:12',
    vote_count: 3
},{
    key: '4',
    id:'4',
    works_name:'作品41',
    vote_num:'000005',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_user: '张三23',
    vote_date:'2017-09-09 22:29:12',
    vote_count: 3
}];

class VoteList extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    searchHandle = () => {
      //搜索事件
    };
    render() {
        const self = this;
        const columns = [{
            title: '作品名称',
            dataIndex: 'works_name',
            key: 'works_name'
        }, {
            title: '投票编号',
            dataIndex: 'vote_num',
            key: 'vote_num'
        }, {
            title: '作品联系人',
            dataIndex: 'works_linkman',
            key: 'works_linkman'
        }, {
            title: '联系电话',
            dataIndex: 'linkman_tel',
            key: 'linkman_tel',
        }, {
            title: '投票人',
            dataIndex: 'vote_user',
            key: 'vote_user',
        }, {
            title: '投票数',
            dataIndex: 'vote_count',
            key: 'vote_count',
        }, {
            title: '投票时间',
            dataIndex: 'vote_date',
            key: 'vote_date'
        }];

        const VoteTable = () => (
            <Table columns={columns} dataSource={data} />
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
                <BreadcrumbCustom first="投票信息" second="投票列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="作品名称"
                        >
                            {getFieldDecorator('works_name', {
                                rules: [],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="活动名称"
                        >
                            {getFieldDecorator('activity_name', {
                                rules: [],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row  gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="投票编号"
                        >
                            {getFieldDecorator('vote_num', {
                                rules: [],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="投票日期"
                        >
                            {getFieldDecorator('audit_state', {
                                rules: [],
                            })(
                              <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        <Button onClick={this.clearHandle} type="danger">清空</Button>
                        <Button onClick={this.searchHandle} type="primary">搜索</Button>
                    </Col>
                </Row>
                <Card bordered={false} >
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

export default Form.create()(VoteList);
