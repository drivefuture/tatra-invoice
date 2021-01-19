import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerDeliveryData from './customer-delivery-data';
import CustomerDeliveryDataDetail from './customer-delivery-data-detail';
import CustomerDeliveryDataUpdate from './customer-delivery-data-update';
import CustomerDeliveryDataDeleteDialog from './customer-delivery-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerDeliveryDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerDeliveryDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerDeliveryDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerDeliveryData} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CustomerDeliveryDataDeleteDialog} />
  </>
);

export default Routes;
