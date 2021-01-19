import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvoiceDesignSettings from './invoice-design-settings';
import InvoiceDesignSettingsDetail from './invoice-design-settings-detail';
import InvoiceDesignSettingsUpdate from './invoice-design-settings-update';
import InvoiceDesignSettingsDeleteDialog from './invoice-design-settings-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvoiceDesignSettingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvoiceDesignSettingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvoiceDesignSettingsDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvoiceDesignSettings} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InvoiceDesignSettingsDeleteDialog} />
  </>
);

export default Routes;
