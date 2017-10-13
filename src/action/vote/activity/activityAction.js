import {INFO_LIST} from '../../common/actionType';
import axios from 'axios';
import {setTableNormal, setTableLoading, setTableDataSource} from '../../common/tableAction'


export const actlist = (params = {}) => {
    console.log('params:', params);
    return dispatch => {
        dispatch(setTableLoading());
        axios.get('/api/vote/activityAction/list.action', params
        ).then(
            function (rs) {
                dispatch(setTableDataSource(INFO_LIST, rs.data.total, rs.data.dataList));
                dispatch(setTableNormal())
            }
        ).catch(err => {
            dispatch(setTableNormal())
        });
    }
};