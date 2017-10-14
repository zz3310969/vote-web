import React from 'react';
import {Card, Row, Col, Menu, Dropdown,Form,Table,Input,Button,Icon} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';

/*报名列表*/

const FormItem = Form.Item;

const data = [{
    key: '1',
    id:'1',
    linkman: 'John Brown',
    tel: 13388612507,
    activity_name: 'sbsbbsb',
    regist_name: 'Json',
    user_state: '有效'
},{
    key: '2',
    id:'2',
    linkman: 'John Brown',
    tel: 13388612507,
    activity_name: 'sbsbbsb',
    regist_name: 'Json',
    user_state: '有效'
},{
    key: '4',
    id:'3',
    linkman: 'John Brown',
    tel: 13388612507,
    activity_name: 'sbsbbsb',
    regist_name: 'Json',
    user_state: '有效'
}];

class RegistList extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };

    // handleSizeChange = (e) => {
    //     this.setState({ size: e.target.value });
    // };
    // handleMenuClick = (e) => {
    //     console.log('click', e);
    // };
    // enterLoading = () => {
    //     this.setState({ loading: true });
    // };
    // enterIconLoading = () => {
    //     this.setState({ iconLoading: true });
    // };
    searchHandle = () => {
        //搜索事件

    }
    render() {

        const columns = [{
            title: '报名联系人',
            dataIndex: 'linkman',
            key: 'linkman'
        }, {
            title: '联系电话',
            dataIndex: 'tel',
            key: 'tel',
        }, {
            title: '活动名称',
            dataIndex: 'activity_name',
            key: 'activity_name',
        }, {
            title: '报名人',
            dataIndex: 'regist_name',
            key: 'regist_name',
        }, {
            title: '用户状态',
            dataIndex: 'user_state',
            key: 'user_state',
        }, {
            title: '',
            dataIndex: 'operation',
            key: 'operation',
            width:100,
            render:function(text,record,index){
                const linkUrl = '/app/auditing/list?user_id='+record.id+"&username="+record.linkman
                return (
                    <Link to={linkUrl} ><Icon type="link" />查看作品</Link>
                )
            }
        }];


        const RegistTable = () => (
            <Table columns={columns} dataSource={data} />
        );


        const size = this.state.size;
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
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="报名信息" second="报名列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="联系人"
                        >
                            {getFieldDecorator('linkman', {
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
                    <Col className="gutter-row" md={3}>
                        <Button onClick={this.searchHandle} >搜索</Button>
                    </Col>
                    <Col className="gutter-row" md={6}>
                    </Col>
                </Row>
                <Card bordered={false} >
                <Row>
                    <Col span={24}>
                        <RegistTable/>
                    </Col>
                </Row>
                </Card>
            </div>
        )
    }
}

export default Form.create()(RegistList);
