require('styles/common.css');

import React from 'react';

/* Import Component */
import Calendar from './calendar/Calendar.jsx';
import Checkbox from './checkbox/CheckBox.jsx';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
      	<Calendar/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
