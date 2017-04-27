import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userAction from '../../action/UserAction';
import * as groupAction from '../../action/GroupAction';
import UserForm from './UserForm'; // eslint-disable-line import/no-named-as-default
import { groupsFormattedForDropdown } from '../../selectors/selectors'; // eslint-disable-line import/no-named-as-default

export class AddOrEditUserContainer extends React.Component {

  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    toastr.options = {
      "positionClass": "toast-bottom-full-width"
    }
  }

  componentDidMount() {
    this.props.action.getUserAction(this.props.match.params.id)
      .catch(error => {
        toastr.error(error);
      });

    this.props.action.getGroupsAction()
      .catch(error => {
        toastr.error(error);
      });
  }

  handleSave(values) {
    const user = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      groupId: values.groupId
    };

    this.props.action.saveUserAction(user)
      .then(() => {
        toastr.success('User saved');
        this.props.history.push('/users');
      }).catch(error => {
      toastr.error(error);
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace('/users');
  }

  render() {
    const {initialValues} = this.props;
    const heading = initialValues && initialValues.id ? 'Edit' : 'Add';

    return (
      <div className="container">
        <UserForm
          heading={heading}
          groups={this.props.groups}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={this.props.initialValues}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.id; //from the path '/user/:id'

  if (userId && state.selectedUserReducer.user && userId === state.selectedUserReducer.user.id) {
    return {
      initialValues: state.selectedUserReducer.user,
      groups: groupsFormattedForDropdown(state.groupReducer.groups)
    };
  } else {
    return {
      groups: groupsFormattedForDropdown(state.groupReducer.groups)
    };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({...groupAction, ...userAction}, dispatch)
});

AddOrEditUserContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  groups: PropTypes.array,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditUserContainer);
