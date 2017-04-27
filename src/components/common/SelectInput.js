import React, { PropTypes } from 'react';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';

const SelectInput = ({input, name, label, defaultOption, options, meta: {touched, error, warning}}) => {

  return (
    <div>
      {/*<SelectField
        value={this.state.value}
        onChange={handleChange}
        errorText={touched && (error || warning)}
        floatingLabelText={label}
      >
        <MenuItem key="" value="" primaryText="-" />
        {
          options.map(option => {
            return <MenuItem key={option.value} value={option.value} primaryText={option.text} />;
          })
        }
      </SelectField>*/}

      <div htmlFor={name} style={{paddingTop: 5, paddingBottom: 5}}>{label}</div>
      <div>
        <select
          style={{width: '100%', height: 32}}
          {...input}
          name={name}
        >
          {/*<option key="" value="">-</option>*/}
          {
            options.map(option => {
              return <option key={option.value} value={option.value}>{option.text}</option>;
            })
          }
        </select>

      </div>
    </div>
  );
};

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.object.isRequired
};

export default SelectInput;
