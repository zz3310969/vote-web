import React from 'react';
import { Row, Col, Menu, Dropdown,Form,Table,Input,Button,Card,Icon} from 'antd';
import BreadcrumbCustom from '../../components/BreadcrumbCustom';
import { Link } from 'react-router';

/*活动管理列表*/

const FormItem = Form.Item;

const data = [{
    key: '1',
    id: '1',
    name: 'John Brown',
    num: 123123123123,
    start_date: '2017-09-09',
    vote_date: '2017-09-09',
    vote_day_count: 3
},{
    key: '2',
    id: '2',
    name: 'John Brown',
    num: 123123123123,
    start_date: '2017-09-09',
    vote_date: '2017-09-09',
    vote_day_count: 3
},{
    key: '3',
    id: '3',
    name: 'John Brown',
    num: 123123123123,
    start_date: '2017-09-09',
    vote_date: '2017-09-09',
    vote_day_count: 3
},{
    key: '5',
    id: '5',
    name: 'John Brown',
    num: 123123123123,
    start_date: '2017-09-09',
    vote_date: '2017-09-09',
    vote_day_count: 3
}];

const columns = [{
    title: '活动名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '活动编号',
    dataIndex: 'num',
    key: 'num',
}, {
    title: '开始时间',
    dataIndex: 'start_date',
    key: 'start_date',
}, {
    title: '投票时间',
    dataIndex: 'vote_date',
    key: 'vote_date',
}, {
    title: '每人每日投票数',
    dataIndex: 'vote_day_count',
    key: 'vote_day_count',
}, {
    title: '',
    dataIndex: 'operator',
    key: 'operator',
    width:80,
    render:function(text,record,index){
        const linkUrl = '/app/activity/add?id='+record.id
        return (
            <div  style={{textAlign:'right',paddingRight:20}}>
                <Link to={linkUrl}><Icon type="edit" />修改</Link>
            </div>
        )
    }
}];

const ActivityTable = () => (
    <Table columns={columns} dataSource={data} />
);


class ActivityList extends React.Component {
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
                <BreadcrumbCustom first="活动管理" second="活动列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <FormItem
                            {...formItemLayout}
                            label="活动名称"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
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
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
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
                    <Col className="gutter-row" md={3} style={{textAlign:'right'}}>
                        <Link to={'/app/activity/add'}><Button type="primary">新增</Button></Link>
                    </Col>
                </Row>
                <Card  bordered={false} >
                    <Row>
                        <Col span={24}>

                            <ActivityTable/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Form.create()(ActivityList);
