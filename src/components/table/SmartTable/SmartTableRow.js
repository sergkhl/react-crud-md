import { TableRow, TableRowColumn } from 'material-ui/Table';
import { IconMenu, IconButton, MenuItem } from 'material-ui';
import React, { PropTypes } from 'react';
import formatTableCell from './formatTableCell';

const renderRightIconButton = () => {
  return (
    <IconButton iconClassName="fa fa-ellipsis-v"/>
  );
};

const actionsMenu = (item, editCb, deleteCb) => {
  return (
    <IconMenu iconButtonElement={renderRightIconButton()}>
      <MenuItem
        primaryText="Edit"
        onTouchTap={() => editCb(item)}
      />
      <MenuItem
        primaryText="Delete"
        onTouchTap={() => deleteCb(item)}
      />
    </IconMenu>
  );
};

const SmartTableRow = ({index, row, tableHeaders, onEdit, onDelete}) => (
  <TableRow key={ index }>
    { tableHeaders.map((header, propIndex) => (
      <TableRowColumn key={ propIndex }>
        { formatTableCell(row[header.dataAlias], header.format, row) }
      </TableRowColumn>
    )) }
    <TableRowColumn key="actions" style={ { width: '25px' } }>
      { actionsMenu(row, onEdit, onDelete) }
    </TableRowColumn>
  </TableRow>
);

SmartTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  tableHeaders: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

exports.SmartTableRow = SmartTableRow;
