import React from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,DatePicker,InputNumber } from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import { actbase,actsave,actload} from '../../axios';

import 'moment/locale/zh-cn';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

/*活动管理新增*/

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class ActivityAddForms extends React.Component {
    state = {
        confirmDirty: false,
        code : '',
        vals :[],
        activity:{},
        sign_range_date :[],
        vote_range_date:[]

    };

    componentDidMount() {
        this.start({id:this.props.params.id});
    }

    start = (parm) => {
        this.setState({loading: true});
        actload(parm).then(res => {
            console.log(res.data)
            const sign_range_date = new Array();
            sign_range_date[0] = moment(res.data.apply_start_time);
            sign_range_date[1] = moment(res.data.apply_end_time);
            // let vote_range_date = [];
            // vote_range_date[0] = res.data.vote_start_time;
            // vote_range_date[1] = res.data.vote_end_time;

            console.log(sign_range_date);
            // console.log(vote_range_date);
            this.setState({
                activity : res.data,
                sign_range_date :[moment(res.data.apply_start_time), moment(res.data.apply_end_time)] ,
                // vote_range_date : vote_range_date,
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
                console.log(submitValues)
                submitValues["apply_start_time"] = values["sign_range_date"][0].format('YYYY-MM-DD HH:mm:ss')
                submitValues["apply_end_time"] = values["sign_range_date"][1].format('YYYY-MM-DD HH:mm:ss')
                submitValues["vote_start_time"] = values["vote_range_date"][0].format('YYYY-MM-DD HH:mm:ss')
                submitValues["vote_end_time"] = values["vote_range_date"][1].format('YYYY-MM-DD HH:mm:ss')
                const {dispatch} = this.props;
                console.log(submitValues)
                this.setState({loading: true});
                actsave(submitValues).then(res => {
                    this.setState({

                        loading: false
                    });
                });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const rowFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 10,
                },
            },
        };
        return (
        <div className="gutter-example">
            <BreadcrumbCustom first="活动修改" second="活动修改" />
            <Card  bordered={false} title="活动信息" extra={<Link to={'/app/activity/list'}><Button>返回</Button></Link>}>
                <Form layout='horizontal' onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="活动名称"
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                initialValue:this.state.activity.name,
                                rules: [{
                                    required: true, message: '请输入活动名称!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                   
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="活动编码"
                            hasFeedback
                        >
                            {getFieldDecorator('code', {
                                initialValue:this.state.activity.code,
                                rules: [{
                                    required: true, message: '请输入活动编码!',
                                }],
                            })(
                                <Input disabled="true"/>
                            )}
                        </FormItem>
                   
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="报名时间"
                            hasFeedback
                        >
                            {getFieldDecorator('sign_range_date', {
                                initialValue:this.state.activity.sign_range_date,
                                rules: [{
                                    required: true, message: '请填写报名时间!',
                                }],
                            })(
                                <RangePicker style={{ width: '100%' }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="投票时间"
                            hasFeedback
                        >
                            {getFieldDecorator('vote_range_date', {
                                initialValue:this.state.activity.vote_range_date,
                                rules: [{
                                    required: true, message: '请填写投票时间!',
                                }],
                            })(
                                <RangePicker style={{ width: '100%' }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="每人每天可投票数"
                            hasFeedback
                            initialValue={2}
                        >
                            {getFieldDecorator('vote_limit', {
                                initialValue:this.state.activity.vote_limit,
                                rules: [{
                                    required: true, message: '每人每天可投票数!',
                                }],
                            })(
                                <InputNumber min={1} max={10} style={{ width: '100%' }}/>
                            )}
                        </FormItem>
                    </Col>
                    {/*<Col className="gutter-row" md={12}>*/}
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="活动状态"*/}
                            {/*hasFeedback*/}
                        {/*>*/}
                            {/*{getFieldDecorator('status', {*/}
                                {/*rules: [{*/}
                                    {/*required: true, message: '活动状态!',*/}
                                {/*}],*/}
                            {/*})(*/}
                                {/*<Select>*/}
                                    {/*{this.state.vals.map(d => <Select.Option key={d.code}>{d.name}</Select.Option>)}*/}
                                    {/*/!*<Select.Option key={1}>有效</Select.Option>*!/*/}
                                    {/*/!*<Select.Option key={0}>失效</Select.Option>*!/*/}
                                {/*</Select>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                    {/*</Col>*/}
                    <Col className="gutter-row" md={24}>
                        <FormItem
                            {...rowFormItemLayout}
                            label="活动描述"
                            hasFeedback
                        >
                            {getFieldDecorator('remark', {
                                initialValue:this.state.activity.remark,
                                rules: [],
                            })(
                                <TextArea placeholder="" autosize={{ minRows: 6, maxRows: 10 }} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem {...tailFormItemLayout}>
                        <Link to={'/app/activity/list'}><Button>取消</Button></Link>
                        <Button type="primary" htmlType="submit" size={'default'} style={{marginLeft:20}}>确定</Button>
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('id', {
                            initialValue: this.state.activity.id
                        })(
                            <Input type="hidden"/>
                        )}
                    </FormItem>
                </Row>
            </Form>
            </Card>
        </div>
        )
    }
}
export default Form.create()(ActivityAddForms);