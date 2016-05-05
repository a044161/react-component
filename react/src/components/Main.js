require('styles/common.css');

import React from 'react';

/* Import Component */
import Calendar from './calendar/Calendar.jsx';


class AppComponent extends React.Component {
  render() {
    return (
      <div className="layout-wrap">
        <Calendar/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
