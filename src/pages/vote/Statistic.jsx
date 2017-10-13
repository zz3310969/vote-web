import React from 'react';
import {Row, Col,Table,Input,Button,Icon,DatePicker,Form,Card,} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
const { MonthPicker, RangePicker } = DatePicker;


/*投票统计列表*/

const FormItem = Form.Item;



const data = [{
    key: '1',
    id:'1',
    rank:'第一名',
    works_name:'作品1',
    vote_num:'000001',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_total: 3,
    activity_name:'首届南宋皇城小镇创意设计大赛暨旅游纪念品设计大赛'
},{
    key: '2',
    id:'2',
    rank:'第二名',
    works_name:'作品13',
    vote_num:'000002',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_total: 23,
    activity_name:'首届南宋皇城小镇创意设计大赛暨旅游纪念品设计大赛'
},{
    key: '3',
    id:'3',
    rank:'第三名',
    works_name:'作品31',
    vote_num:'000003',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_total: 4334,
    activity_name:'首届南宋皇城小镇创意设计大赛暨旅游纪念品设计大赛'
},{
    key: '4',
    id:'4',
    rank:'第四名',
    works_name:'作品41',
    vote_num:'000005',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    vote_total: 77,
    activity_name:'首届南宋皇城小镇创意设计大赛暨旅游纪念品设计大赛'
}];

class VoteStatisticsList extends React.Component {
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
            title: '排名',
            dataIndex: 'rank',
            key: 'rank'
        },{
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
            title: '总票数',
            dataIndex: 'vote_total',
            key: 'vote_total',
        }, {
            title: '所属活动',
            dataIndex: 'activity_name',
            key: 'activity_name',
            width:200
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
                <BreadcrumbCustom first="投票信息" second="投票统计" />
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

export default Form.create()(VoteStatisticsList);
