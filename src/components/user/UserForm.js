import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';

export const UserForm = ({handleSubmit, pristine, reset, submitting, heading, groups, handleSave, handleCancel}) => {
  const actions = [
    <FlatButton
      label="Submit"
      primary={true}
      disabled={submitting}
      onTouchTap={handleSubmit(handleSave)}
    />,
    <FlatButton
      label="Clear Values"
      primary={true}
      style={heading === 'Add' ? {} : {display: 'none'}}
      disabled={pristine || submitting}
      onTouchTap={reset}
    />,
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleCancel}
    />,
  ];

  return (
    <Dialog
      title={heading}
      open={true}
      modal={true}
      actions={actions}
    >

        <Field
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Name of the user"
          component={FieldInput}
        />

        <Field
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Last Name of the user"
          component={FieldInput}
        />

        <Field
          name="groupId"
          label="Group"
          options={groups}
          component={SelectInput}
        />

    </Dialog>

  );
};


const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  /*if (!values.groupId) {
    errors.groupId = 'Required';
  }*/

  return errors;
};


UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};


export default reduxForm({
  form: 'UserForm',
  validate
})(UserForm);
