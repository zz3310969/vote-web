import React from 'react';
import {Card, Row, Col, Menu, Dropdown,Form,Table,Input,Button,Icon,Select} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
import {getTableList,update,getActiviAtyList} from '../../axios/vote'

/*报名列表*/

const FormItem = Form.Item;


class RegistList extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
        activityList:[],
    };



    componentDidMount() {
        const queryParams = this.props.location.query;
        this.start(queryParams);
        getActiviAtyList().then(res => {
            this.setState({
                activityList:res.data,
            });
        });
    }



    start = (parms) => {
        this.setState({ loading: true });
        getTableList('/api/vote/activityuserAction/list.action',parms).then(res => {
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
                this.setState({loading: true});
                this.start(submitValues);
            }
        });
    };


    render() {

        const columns = [{
            title: '报名联系人',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '联系电话',
            dataIndex: 'tel',
            key: 'tel',
        }, {
            title: '活动名称',
            dataIndex: 'actName',
            key: 'actName',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:100,
            render:function(text,record,index){
                const linkUrl = '/app/auditing/list?user_id='+record.id+"&username="+record.name
                return (
                    <Link to={linkUrl} ><Icon type="link" />查看作品</Link>
                )
            }
        }];

        const tableProps = {
            columns: columns,
            rowKey: record => record.id,
            dataSource: this.state.data,
            pagination: this.state.pagination,
            loading: this.state.loading,
            onChange: this.handleTableChange,
        };


        const RegistTable = () => (
            <Table {...tableProps} />
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
                <Form layout='horizontal' onSubmit={this.handleSubmit} style={{marginTop: 20}}>
                <Row gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="联系人"
                        >
                            {getFieldDecorator('name', {
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
                    <Col className="gutter-row" md={2}>
                        <Button type='primary' htmlType="submit">搜索</Button>
                    </Col>
                    <Col className="gutter-row" md={6}>
                    </Col>
                </Row>
                </Form>
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
