import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Invoice from './invoice';
import InvoiceItem from './invoice-item';
import Company from './company';
import InvoiceDesignSettings from './invoice-design-settings';
import Customer from './customer';
import CustomerInvoiceData from './customer-invoice-data';
import CustomerDeliveryData from './customer-delivery-data';
import InvoiceDesignTemplate from './invoice-design-template';
import UserAccount from './user-account';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}invoice`} component={Invoice} />
      <ErrorBoundaryRoute path={`${match.url}invoice-item`} component={InvoiceItem} />
      <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}invoice-design-settings`} component={InvoiceDesignSettings} />
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}customer-invoice-data`} component={CustomerInvoiceData} />
      <ErrorBoundaryRoute path={`${match.url}customer-delivery-data`} component={CustomerDeliveryData} />
      <ErrorBoundaryRoute path={`${match.url}invoice-design-template`} component={InvoiceDesignTemplate} />
      <ErrorBoundaryRoute path={`${match.url}user-account`} component={UserAccount} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
