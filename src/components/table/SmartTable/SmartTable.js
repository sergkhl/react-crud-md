import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import { SmartTableRow } from './SmartTableRow';
import React, { PropTypes, Component } from 'react';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';

function sortFunc(a, b, key) {
  if (typeof (a[key]) === 'number') {
    return a[key] - b[key];
  }

  const ax = [];
  const bx = [];

  a[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { ax.push([$1 || Infinity, $2 || '']); });
  b[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { bx.push([$1 || Infinity, $2 || '']); });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

//converts object  { a: 55, b: 55, c: { d: 55 } } to { a: 55, b: 55, d: 55 }
export function processTableData(data) {
  if (data.constructor === Array) {
    return data.map(obj => {
      const newObj = {};

      Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
          Object.keys(obj[key]).forEach(subKey => {
            newObj[subKey] = obj[key][subKey];
          });
        } else {
          newObj[key] = obj[key];
        }
      });

      return newObj;
    });
  }
  return [];
}

class SmartTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: true,
      sortHeader: null
    };
  }

  componentWillMount() {
    this.setState({
      data: this.props.data
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sortHeader: null,
      data: nextProps.data
    });
  }

  sortByColumn = (e) => {
    const sortHeader = e.target.id;
    const { data } = this.state;

    const isAsc = (this.state.sortHeader === sortHeader) ? !this.state.isAsc : true;
    const sortedData = data.sort((a, b) => sortFunc(a, b, sortHeader));

    if (!isAsc) {
      sortedData.reverse();
    }

    this.setState({
      data: sortedData,
      sortHeader,
      isAsc
    });
  };

  render() {

    const { tableHeaders, onEdit, onDelete } = this.props;
    const { data } = this.state;

    const processedData = processTableData(data);

    return (
      <Table className="table" selectable={ false }>
        <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
          <TableRow>
            { tableHeaders && tableHeaders.map((header, index) => (
              <TableHeaderColumn key={ index }>
                <div className="rowAlign">
                  { header.alias }
                  { header.sortable &&
                    <SortIcon
                      id={ header.dataAlias }
                      className="sortIcon"
                      onMouseUp={ this.sortByColumn }
                    />
                  }
                </div>
              </TableHeaderColumn>
            )) }
            <TableHeaderColumn key="actions" style={ { width: '25px' } }>
              <div className="rowAlign">
                Actions
              </div>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows displayRowCheckbox={ false } preScanRows>
          {
            (processedData.map((row, index) => (
              <SmartTableRow key={ index } { ...{ row, index, tableHeaders, onEdit, onDelete } } />
            )))
          }
        </TableBody>
      </Table>
    );
  }
}

SmartTable.propTypes = {
  tableHeaders: PropTypes.array,
  data: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

exports.SmartTable = SmartTable;
