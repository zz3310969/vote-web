import React from 'react';
import {Row, Col,Table,Input,Button,Icon,DatePicker,Form,Card,} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
import { votelist} from '../../axios';

const { MonthPicker, RangePicker } = DatePicker;
/*投票结果列表*/
const FormItem = Form.Item;
class VoteList extends React.Component {
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

        votelist(parm).then(res => {
            console.log(res.data)
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
                votelist(submitValues).then(res => {
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
