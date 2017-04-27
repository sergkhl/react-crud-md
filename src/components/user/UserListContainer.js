import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userAction from '../../action/UserAction';
import { Card, CardTitle, FloatingActionButton, FontIcon, Toggle } from 'material-ui';
import { SmartTable } from '../table/SmartTable/SmartTable';
import _ from 'lodash';

let tableHeaders = [
  {alias: 'First Name', sortable: true, dataAlias: 'firstName'},
  {alias: 'Last Name', sortable: true, dataAlias: 'lastName'},
  {alias: 'Group', sortable: false, dataAlias: 'groupId'}
];

export class UserListContainer extends React.Component {

  constructor() {
    super();

    this.state = {isGrouped: false};

    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSwitchGrouping = this.handleSwitchGrouping.bind(this);
  }

  componentDidMount() {
    this.props.action.getUsersAction()
      .catch(error => {
        toastr.error(error);
      });
  }

  handleAddUser() {
    this.props.history.push('/user');
  }

  handleEditUser(user) {
    if (user.id) {
      this.setState({selectedUserId: undefined});
      this.props.history.push(`/user/${user.id}`);
    }
  }

  handleDelete(user) {
    if (user.id) {
      this.setState({selectedUserId: undefined});
      this.props.action.deleteUserAction(user.id)
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleSwitchGrouping() {
    this.setState({isGrouped: !this.state.isGrouped});
    console.log('switch grouping');
  }

  getUsersByGroup(users) {
    return _.groupBy(users, user => user.groupId ? user.groupId : 'Ungrouped');
  }

  render() {
    const {users} = this.props;
    const {isGrouped} = this.state;
    const usersByGroup = isGrouped && this.getUsersByGroup(users);

    if (!users) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

        {
          !isGrouped &&
          <Card style={{margin: 20, order: 2, flex: '1 100%', maxWidth: 1024}}>
            <CardTitle
              title="All Users"
              subtitle={
                <Toggle
                  toggled={false}
                  onToggle={this.handleSwitchGrouping.bind(this)}
                  labelPosition="right"
                  label="Grouping"
                />
              }
            />
            <SmartTable { ...{
              tableHeaders,
              data: users,
              onEdit: this.handleEditUser.bind(this),
              onDelete: this.handleDelete.bind(this)
            } } />
          </Card>
        }

        {
          isGrouped &&
          (Object.keys(usersByGroup).map((groupName, index) => (
            <Card key={index} style={{margin: 20, order: 2, flex: '1 100%', maxWidth: 1024}}>
              <CardTitle
                title={groupName}
                subtitle={
                  <Toggle
                  toggled={true}
                  onToggle={this.handleSwitchGrouping.bind(this)}
                  labelPosition="right"
                  label="Grouping"
                />
                }
              />
              <SmartTable { ...{
                tableHeaders,
                data: usersByGroup[groupName],
                onEdit: this.handleEditUser.bind(this),
                onDelete: this.handleDelete.bind(this)
              } } />
            </Card>
          )))
        }

        <FloatingActionButton
          onTouchTap={this.handleAddUser.bind(this)}
          secondary={true}
          style={{position: 'fixed', top: 80, right: 30, zIndex: 9999}}>
          <FontIcon className="fa fa-plus"/>
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users,
  groups: state.groupReducer.groups
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(userAction, dispatch),

});

UserListContainer.propTypes = {
  users: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
