import React from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,DatePicker,InputNumber,Modal,Upload} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from "react-router";

const { MonthPicker, RangePicker } = DatePicker;

/*活动管理新增*/

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class RegistViewForms extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
      };
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // };
    // handleConfirmBlur = (e) => {
    //     const value = e.target.value;
    //     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // };
    // checkConfirm = (rule, value, callback) => {
    //     const form = this.props.form;
    //     if (value && this.state.confirmDirty) {
    //         form.validateFields(['confirm'], { force: true });
    //     }
    //     callback();
    // };
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
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
            <Card title="作品信息" bordered={false} extra={<Link to={'/app/regist/list'}><Button>返回</Button></Link>}>
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
                            {getFieldDecorator('works_name', {
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
                            {getFieldDecorator('works_states', {
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
                            {getFieldDecorator('works_contacts', {
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
                            {getFieldDecorator('contacts_tel', {
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
                            {getFieldDecorator('vote_num', {
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
                            {getFieldDecorator('audit_date', {
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
                            {getFieldDecorator('works_desc', {
                                rules: [],
                            })(
                                <TextArea disabled={true}></TextArea>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="审核意见"
                        >
                            {getFieldDecorator('audit_comments', {
                                rules: [],
                            })(
                                <TextArea disabled={true}></TextArea>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            </Card>
        </div>
        )
    }
}


export default Form.create()(RegistViewForms);