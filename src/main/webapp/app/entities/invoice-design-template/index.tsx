import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvoiceDesignTemplate from './invoice-design-template';
import InvoiceDesignTemplateDetail from './invoice-design-template-detail';
import InvoiceDesignTemplateUpdate from './invoice-design-template-update';
import InvoiceDesignTemplateDeleteDialog from './invoice-design-template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvoiceDesignTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvoiceDesignTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvoiceDesignTemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvoiceDesignTemplate} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InvoiceDesignTemplateDeleteDialog} />
  </>
);

export default Routes;
