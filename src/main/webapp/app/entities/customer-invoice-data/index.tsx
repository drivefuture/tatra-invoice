import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerInvoiceData from './customer-invoice-data';
import CustomerInvoiceDataDetail from './customer-invoice-data-detail';
import CustomerInvoiceDataUpdate from './customer-invoice-data-update';
import CustomerInvoiceDataDeleteDialog from './customer-invoice-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerInvoiceDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerInvoiceDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerInvoiceDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerInvoiceData} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CustomerInvoiceDataDeleteDialog} />
  </>
);

export default Routes;
