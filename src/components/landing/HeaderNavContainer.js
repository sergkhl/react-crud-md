import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconHome from 'material-ui/svg-icons/action/home';
import IconUsers from 'material-ui/svg-icons/social/group';
import AppBar from 'material-ui/AppBar';
import MDSpinner from "react-md-spinner";

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export const HeaderNavContainer = ({apiCallsInProgress}) => {
  return (
    <div>
      <AppBar
        title={<span style={styles.title}>react-crud-md</span>}
        iconElementRight={apiCallsInProgress > 0 ?
          <MDSpinner style={{marginTop: 10, marginRight: 10}} singleColor="#fff"/> : <span></span>}
      />

      <Tabs>
        <Tab icon={<IconHome />} containerElement={<NavLink exact to="/">Home</NavLink>} />
        <Tab icon={<IconUsers />} containerElement={<NavLink to="/users">Users</NavLink>} />
      </Tabs>
    </div>

  );
};


HeaderNavContainer.propTypes = {
  apiCallsInProgress: PropTypes.number.isRequired
};


const mapStateToProps = state => ({
  apiCallsInProgress: state.apiReducer.apiCallsInProgress
});


export default connect(mapStateToProps)(HeaderNavContainer);

