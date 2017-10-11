import React from 'react';
import {Card, Row, Col, Menu, Dropdown,Form,Table,Input,Button,Icon,Select,Badge,Modal} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';

/*审核列表*/

const FormItem = Form.Item;

const auditState = [
  {
    id:1,
    val:'1',
    text:'审核通过'
  },{
    id:2,
    val:'0',
    text:'未审核'
  },{
    id:3,
    val:'2',
    text:'审核未通过'
  }
]

const getAuditText = function(val){
   let returnText = "";
   auditState.forEach(function(item,index){
     if(val==item.val){
        returnText = item.text;
     }
   });
   return returnText;
}


const data = [{
    key: '1',
    id:'1',
    works_name:'作品1',
    vote_num:'000001',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    activity_name: 'sbsbbsb',
    audit_date:'2017-09-09 22:29:12',
    audit_state: '0'
},{
    key: '2',
    id:'2',
    works_name:'作品2',
    vote_num:'000002',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    activity_name: 'sbsbbsb',
    audit_date:'2017-09-09 22:29:12',
    audit_state: '1'
},{
    key: '3',
    id:'3',
    works_name:'作品3',
    vote_num:'000003',
    works_linkman: 'John Brown',
    linkman_tel: 13388612507,
    activity_name: 'sbsbbsb',
    audit_date:'2017-09-09 22:29:12',
    audit_state: '2'
}];

class AuditingList extends React.Component {
    state = {
        size: 'default',
        loading: false,
        iconLoading: false,
    };
    searchHandle = () => {
      //搜索事件
    };
    rollbackAudit = (worksId) => {
        Modal.confirm({
            title: '确定撤销已审核通过的作品?',
            content: '确定后，作品将变成审核未通过!',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              
            },
        });
    }
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
            title: '所属活动',
            dataIndex: 'activity_name',
            key: 'activity_name',
        }, {
            title: '审核时间',
            dataIndex: 'audit_date',
            key: 'audit_date',
        }, {
            title: '状态',
            dataIndex: 'audit_state',
            width:100,
            key: 'audit_state',
            render:function(text,record,index){
              if(text=='1'){
                return (<span><Badge status="success" />{getAuditText(text)}</span>)
              }else if(text=='0'){
                return (<span><Badge status="default"/>{getAuditText(text)}</span>)
              }else if(text=='2'){
                return (<span><Badge status="error"/>{getAuditText(text)}</span>)
              }
            }
        }, {
            title: '',
            dataIndex: 'operator',
            key: 'operator',
            width:160,
            render:function(text,record,index){
              const viewButton = (<Link to={'/app/regist/view?id='+record.id+"&back="}  style={{marginRight:20}}>查看</Link>);
              const rollbackButton = (<span onClick={()=>self.rollbackAudit(record.id)}>撤销审核</span>);
              const auditButton = (<Link to={'/app/regist/view?id='+record.id}>作品审核</Link>);

              if(record.audit_state=='1'){
                return (<span>{viewButton}{rollbackButton}</span>)
              }else if(record.audit_state=='0'){
                return (<span>{viewButton}{auditButton}</span>)
              }else if(record.audit_state=='2'){
                return (<span>{viewButton}</span>)
              }
            }
        }];

        const AuditingTable = () => (
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
                <BreadcrumbCustom first="作品信息" second="作品列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={5}>
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
                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="所属活动"
                        >
                            {getFieldDecorator('activity_name', {
                                rules: [],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="作品联系人"
                        >
                            {getFieldDecorator('works_linkman', {
                                rules: [],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={5}>
                        <FormItem
                            {...formItemLayout}
                            label="审核状态"
                        >
                            {getFieldDecorator('audit_state', {
                                rules: [],
                            })(
                              <Select style={{width:'100%'}}>
                                {auditState.map(item => <Select.Option key={item.val}>{item.text}</Select.Option>)}
                              </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" md={2}>
                        <Button onClick={this.searchHandle} >搜索</Button>
                    </Col>
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
