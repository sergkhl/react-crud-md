import * as ActionType from './ActionType';
import GroupApi from '../api/GroupApi';
import { ApiCallBeginAction } from './ApiAction';


export const getGroupsResponse = groups => ({
    type: ActionType.GET_GROUPS_RESPONSE,
    groups
});



export function getGroupsAction() {
    return dispatch => {

        dispatch(ApiCallBeginAction());

        return GroupApi.getAllGroups()
            .then(groups => {
                dispatch(getGroupsResponse(groups));
            }).catch(error => {
                throw error;
            });
    };
}
