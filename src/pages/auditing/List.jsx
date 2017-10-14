import React from 'react';
import {Card, Row, Col, Menu, Dropdown,Form,Table,Input,Button,Icon,Select,Badge,Modal} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';
import {getTableList,update} from '../../axios/vote'
import {get_} from '../../axios/tools'


/*审核列表*/

const FormItem = Form.Item;







class AuditingList extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
        auditState:[],
        pagination: {
            pageSize: 10
        },
    };

    componentDidMount() {
        this.load();
        const queryParams = this.props.location.query;
        this.start(queryParams);
        this.props.form.setFieldsValue({username:queryParams["username"]})
    }

    load = () => {
        get_({url:'/api/vote/productionAction/base.action'}).then(res => {
            this.setState({
                auditState:res.data.status,
            });
        });
    };

    start = (parms) => {
        this.setState({ loading: true });
        getTableList('/api/vote/productionAction/list.action',parms).then(res => {
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

    rollbackAudit = (worksId) => {
        var self = this;
        Modal.confirm({
            title: '确定撤销已审核通过的作品?',
            content: '确定后，作品将变成审核未通过!',
            onOk() {
              let submitValues = {};
                submitValues.id = worksId;
                submitValues.status = 'managecancel';
                update("/api/vote/productionAction/update.action",submitValues).then(res => {
                    let submitValues = {...self.props.form.getFieldsValue()}
                    self.setState({loading: true});
                    self.start(submitValues);
                });
            },
            onCancel() {
              
            },
        });
    }
    render() {
        const self = this;
        const columns = [{
            title: '作品名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '投票编号',
            dataIndex: 'activity_code',
            key: 'activity_code'
        }, {
            title: '作品联系人',
            dataIndex: 'username',
            key: 'username'
        }, {
            title: '联系电话',
            dataIndex: 'usertel',
            key: 'usertel',
        }, {
            title: '所属活动',
            dataIndex: 'actName',
            key: 'actName',
        }, {
            title: '审核时间',
            dataIndex: 'update_date',
            key: 'update_date',
        }, {
            title: '状态',
            dataIndex: 'proStatusName',
            width:100,
            key: 'proStatusName',

        }, {
            title: '',
            dataIndex: 'operator',
            key: 'operator',
            width:160,
            render:function(text,record,index){
              const viewButton = (<Link to={'/app/auditing/view/'+record.id+"?optype=1"}  style={{marginRight:20}}>查看</Link>);
              const rollbackButton = (<span onClick={()=>self.rollbackAudit(record.id)}>撤销审核</span>);
              const auditButton = (<Link to={'/app/auditing/view/'+record.id+"?optype=2"}>作品审核</Link>);

              if(record.status=='processed'){
                return (<span>{viewButton}{rollbackButton}</span>)
              }else if(record.status=='waitProcess'){
                return (<span>{viewButton}{auditButton}</span>)
              }else if(record.status){
                return (<span>{viewButton}</span>)
              }
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

        const AuditingTable = () => (
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
                <BreadcrumbCustom first="活动配置" second="审计列表" />
                <Row gutter={16}>
                    <Form layout='horizontal' onSubmit={this.handleSubmit} style={{marginTop: 20}}>

                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="作品名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [],
                            })(
                                <Input size='default'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="所属活动"
                        >
                            {getFieldDecorator('actName', {
                                rules: [],
                            })(
                                <Input size='default' />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="作品联系人"
                        >
                            {getFieldDecorator('username', {
                                rules: [],
                            })(
                                <Input size='default' />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="审核状态"
                        >
                            {getFieldDecorator('status', {
                                rules: [],
                            })(
                              <Select style={{width:'100%'}}  size='default'>
                                {this.state.auditState.map(item => <Select.Option key={item.value}>{item.text}</Select.Option>)}
                              </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={2}>
                        <Button type='primary' htmlType="submit">搜索</Button>
                    </Col>
                    </Form>
                </Row>
                <Card bordered={false} >
                    <Row>
                        <Col span={24}>
                            <AuditingTable/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Form.create()(AuditingList);
