import React from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,DatePicker,InputNumber,Modal,Upload} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from "react-router";
import moment from 'moment';
import {load,update} from '../../axios/vote'

const { MonthPicker, RangePicker } = DatePicker;

/*活动管理新增*/

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AuditingViewForms extends React.Component {


    constructor(props) {
        super(props);

    }
    state = {
        previewVisible: false,
        previewImage: '',
        production:{},
        fileList: [],
        optype:1||this.props.location.query.optype,
      };

    componentDidMount() {
        this.start({id:this.props.params.id});
    }

    start = (parm) => {
        this.setState({loading: true});
        load("/api/vote/productionAction/load.action",parm).then(res => {
            console.log(res.data)
            const fileList = this.state.fileList;
            var image ={};
            image.uid=-1;
            image.name=res.data.name;
            image.status='done';
            image.url='/api/selin/fileAction/getFile.action?filename='+res.data.img_src;
            fileList.push(image);
            this.setState({
                production : res.data,
                vals : res.data.vals,
                loading: false,
                fileList,
            });
        });
    };

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    };

    static contextTypes = {
        router:React.PropTypes.object.isRequired
    };

    handleSubmit = (e) => {
        let submitValues = {};
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
            } else {
                Object.assign(submitValues, values)
                console.log(submitValues)

                console.log(submitValues)
                this.setState({loading: true});
                update("/api/vote/productionAction/update.action",submitValues).then(res => {
                    this.context.router.push({
                        pathname: '/app/auditing/list'
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
        const { previewVisible, previewImage, fileList } = this.state;


        return (
        <div className="gutter-example">
            <BreadcrumbCustom first="报名信息" second="作品查看" />
            <Card title="作品信息" bordered={false} extra={<Link to={'/app/auditing/list'}><Button>返回</Button></Link>}>
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col className="gutter-row" md={24}>
                        <FormItem
                            {...rowFormItemLayout}
                            label="作品"
                        >
                            {getFieldDecorator('works', {
                                rules: [],
                            })(
                                <div className="clearfix">
                                    <Upload
                                      disabled={true}
                                      action="//jsonplaceholder.typicode.com/posts/"
                                      listType="picture-card"
                                      fileList={fileList}
                                      onPreview={this.handlePreview}
                                    >
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                  </div>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="作品名称"
                        >
                            {getFieldDecorator('name', {
                                initialValue:this.state.production.name,
                                rules: [],
                            })(
                                <Input disabled={true}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="作品状态"
                        >
                            {getFieldDecorator('statusName', {
                                initialValue:this.state.production.proStatusName,
                                rules: [],
                            })(
                                <Input disabled={true}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="作品联系人"
                        >
                            {getFieldDecorator('username', {
                                initialValue:this.state.production.username,
                                rules: [],
                            })(
                                <Input disabled={true}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="联系电话"
                        >
                            {getFieldDecorator('usertel', {
                                initialValue:this.state.production.usertel,
                                rules: [],
                            })(
                                <Input disabled={true}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="投票编号"
                        >
                            {getFieldDecorator('vote_code', {
                                initialValue:this.state.production.vote_code,
                                rules: [],
                            })(
                                <Input disabled={true}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="审核时间"
                        >
                            {getFieldDecorator('update_date', {
                                initialValue:this.state.production.update_date,
                                rules: [],
                            })(
                                <Input disabled={true}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="作品描述"
                        >
                            {getFieldDecorator('remark', {
                                initialValue:this.state.production.remark,
                                rules: [],
                            })(
                                <TextArea disabled={true}></TextArea>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12} >
                        <FormItem
                            {...formItemLayout}
                            label="审核意见"
                        >
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '请选择审核意见!' }],
                            })(
                                <Select >
                                    <Select.Option key="processed">审核通过</Select.Option>
                                    <Select.Option key="managecancel">审核不通过作废</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem {...tailFormItemLayout}>
                    <Link to={'/app/auditing/list'}><Button>取消</Button></Link>
                    <Button type="primary" htmlType="submit" size={'default'} style={{marginLeft:20}}>确定</Button>
                </FormItem>

                <FormItem>
                    {getFieldDecorator('id', {
                        initialValue: this.state.production.id
                    })(
                        <Input type="hidden"/>
                    )}
                </FormItem>

            </Form>
            </Card>
        </div>
        )
    }
}


export default Form.create()(AuditingViewForms);