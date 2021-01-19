import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/invoice">
      <Translate contentKey="global.menu.entities.invoice" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice-item">
      <Translate contentKey="global.menu.entities.invoiceItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/company">
      <Translate contentKey="global.menu.entities.company" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice-design-settings">
      <Translate contentKey="global.menu.entities.invoiceDesignSettings" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer-invoice-data">
      <Translate contentKey="global.menu.entities.customerInvoiceData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer-delivery-data">
      <Translate contentKey="global.menu.entities.customerDeliveryData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/invoice-design-template">
      <Translate contentKey="global.menu.entities.invoiceDesignTemplate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-account">
      <Translate contentKey="global.menu.entities.userAccount" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
