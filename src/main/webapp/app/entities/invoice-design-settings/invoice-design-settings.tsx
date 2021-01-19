import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice-design-settings.reducer';
import { IInvoiceDesignSettings } from 'app/shared/model/invoice-design-settings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDesignSettingsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InvoiceDesignSettings = (props: IInvoiceDesignSettingsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { invoiceDesignSettingsList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-design-settings-heading">
        <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.home.title">Invoice Design Settings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.home.createLabel">Create new Invoice Design Settings</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceDesignSettingsList && invoiceDesignSettingsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.logo">Logo</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.signatureAndStamp">Signature And Stamp</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.template">Template</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceDesignSettingsList.map((invoiceDesignSettings, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoiceDesignSettings.id}`} color="link" size="sm">
                      {invoiceDesignSettings.id}
                    </Button>
                  </td>
                  <td>
                    {invoiceDesignSettings.logo ? (
                      <div>
                        {invoiceDesignSettings.logoContentType ? (
                          <a onClick={openFile(invoiceDesignSettings.logoContentType, invoiceDesignSettings.logo)}>
                            <img
                              src={`data:${invoiceDesignSettings.logoContentType};base64,${invoiceDesignSettings.logo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {invoiceDesignSettings.logoContentType}, {byteSize(invoiceDesignSettings.logo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignSettings.signatureAndStamp ? (
                      <div>
                        {invoiceDesignSettings.signatureAndStampContentType ? (
                          <a
                            onClick={openFile(invoiceDesignSettings.signatureAndStampContentType, invoiceDesignSettings.signatureAndStamp)}
                          >
                            <img
                              src={`data:${invoiceDesignSettings.signatureAndStampContentType};base64,${invoiceDesignSettings.signatureAndStamp}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {invoiceDesignSettings.signatureAndStampContentType}, {byteSize(invoiceDesignSettings.signatureAndStamp)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignSettings.createdDate ? (
                      <TextFormat type="date" value={invoiceDesignSettings.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignSettings.updatedDate ? (
                      <TextFormat type="date" value={invoiceDesignSettings.updatedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignSettings.template ? (
                      <Link to={`invoice-design-template/${invoiceDesignSettings.template.id}`}>{invoiceDesignSettings.template.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoiceDesignSettings.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceDesignSettings.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceDesignSettings.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.home.notFound">No Invoice Design Settings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoiceDesignSettings }: IRootState) => ({
  invoiceDesignSettingsList: invoiceDesignSettings.entities,
  loading: invoiceDesignSettings.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignSettings);
