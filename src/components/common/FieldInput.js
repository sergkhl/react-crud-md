import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const FieldInput = ({input, type, name, label, placeholder, meta: {touched, error, warning}}) => {
    return(
    <TextField
      {...input}
      hintText={placeholder}
      errorText={touched && (error || warning)}
      floatingLabelText={placeholder}
      fullWidth={true}
    />
    );
};

FieldInput.propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired,
};

export default FieldInput;
