import React, { useState } from 'react';
import classnames from 'classnames';

import './index.css';

const IconComponent = ({ icon, title, styles }) => {
  const [active, setActive] = useState(true);

  return (
    <div className={classnames('icon-control', !active && 'icon-control--off')}>
      <i 
        className="material-icons icon-control__icon" 
        onClick={() => { setActive(!active); }}
        style={styles}
      >
        {icon}
      </i>
      <div className="icon-control__title">{title}</div>
    </div> 
  );
};

export default IconComponent;