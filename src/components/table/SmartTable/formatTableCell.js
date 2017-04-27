import React from 'react';
import { NavLink } from 'react-router-dom';
import { FlatButton } from 'material-ui';

export default (cell, format, row) => {
  switch (format && format.type) {
    case 'link':
      return <NavLink style={ { color: 'black' } } to={ `${format.url}` }>{ cell }</NavLink>;
    case 'button':
      return (
        <FlatButton
          primary
          label={ `${format.text}` }
        />
      );
    case 'date':
      return new Date();
    default:
      return cell;
  }
};
