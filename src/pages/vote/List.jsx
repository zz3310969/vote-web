import React from 'react';
import {Row, Col,Table,Input,Button,Icon,DatePicker,Form,Card,Select} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
import { votelist} from '../../axios';
import {getTableList,getActiviAtyList} from '../../axios/vote'
import {get_} from '../../axios/tools'


const { MonthPicker, RangePicker } = DatePicker;
/*投票结果列表*/
const FormItem = Form.Item;
class VoteList extends React.Component {
    state = {
        pagination: {
            pageSize: 10
        },
        size: 'default',
        loading: false,
        iconLoading: false,
        data: [],
        activityList:[],
    };

    componentDidMount() {
        // const queryParams = this.props.location.query;
        // this.start(queryParams);
        // this.props.form.setFieldsValue({username:queryParams["username"]})
        this.start(this.state.pagination);
        getActiviAtyList().then(res => {
            this.setState({
                activityList:res.data,
            });
        });
    }


    start = (parms) => {
        this.setState({loading: true});
        getTableList('/api/vote/voteAction/list.action',parms).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.total;
            this.setState({
                data: [...res.data.dataList.map(val => {
                    val.key = val.id;
                    return val;
                })],
                pagination,
                loading: false
            });
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        let submitValues = {...this.props.form.getFieldsValue()}
        submitValues.currentPage= pagination.current;
        this.setState({loading: true});
        this.start(submitValues);
    }

    handleSubmit = (e) => {
        let submitValues = {};
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Object.assign(submitValues, values)
                if(values["vote_range_date"] != null){
                    submitValues["vote_start_date"] = values["vote_range_date"][0].format('YYYY-MM-DD HH:mm:ss')
                    submitValues["vote_end_date"] = values["vote_range_date"][1].format('YYYY-MM-DD HH:mm:ss')
                }
                this.setState({loading: true});
                this.start(submitValues);
            }
        });
    };
    render() {
        const self = this;
        const columns = [{
            title: '作品名称',
            dataIndex: 'proName',
            key: 'proName'
        }, {
            title: '投票编号',
            dataIndex: 'vote_code',
            key: 'vote_code'
        }, {
            title: '作品联系人',
            dataIndex: 'proUserName',
            key: 'proUserName'
        }, {
            title: '联系电话',
            dataIndex: 'proUserTel',
            key: 'proUserTel',
        }, {
            title: '投票人',
            dataIndex: 'vote_user_openid',
            key: 'vote_user_openid',
        }, {
            title: '投票数',
            dataIndex: 'vote_num',
            key: 'vote_num',
        }, {
            title: '投票时间',
            dataIndex: 'vote_date',
            key: 'vote_date'
        }];

        const tableProps = {
            columns: columns,
            rowKey: record => record.id,
            dataSource: this.state.data,
            pagination: this.state.pagination,
            loading: this.state.loading,
            onChange: this.handleTableChange,
        };


        const VoteTable = () => (
            <Table {...tableProps} />
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
                <Form layout='horizontal' onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                <Row gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="作品名称"
                        >
                            {getFieldDecorator('proName', {
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
                            {getFieldDecorator('activity_code', {
                                rules: [],
                            })(
                                <Select style={{width:'100%'}}  size='default'>
                                    {this.state.activityList.map(item => <Select.Option key={item.code}>{item.name}</Select.Option>)}
                                </Select>
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
                            {getFieldDecorator('vote_code', {
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
                            {getFieldDecorator('vote_range_date', {
                                rules: [],
                            })(
                              <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        <Button onClick={this.clearHandle} type="danger">清空</Button>
                        <Button type='primary' htmlType="submit">搜索</Button>
                    </Col>
                </Row>
                </Form>
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
