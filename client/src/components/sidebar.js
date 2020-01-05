import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/vehicleRoutes/list">
        Routes history
      </a>

      <a className="menu-item" href="/users/list">
        User Management
      </a>

      <a className="menu-item" href="/vehicles/list">
        Vehicle Management
      </a>

      <a className="menu-item" href="/">
        Invoices
      </a>

      <a className="menu-item" href="/">
        User Panel
      </a>

    </Menu>
  );
};