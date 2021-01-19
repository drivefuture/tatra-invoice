import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice-design-template.reducer';
import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDesignTemplateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InvoiceDesignTemplate = (props: IInvoiceDesignTemplateProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { invoiceDesignTemplateList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-design-template-heading">
        <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.home.title">Invoice Design Templates</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.home.createLabel">Create new Invoice Design Template</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceDesignTemplateList && invoiceDesignTemplateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.jrxmlTemplateFile">Jrxml Template File</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceDesignTemplateList.map((invoiceDesignTemplate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoiceDesignTemplate.id}`} color="link" size="sm">
                      {invoiceDesignTemplate.id}
                    </Button>
                  </td>
                  <td>{invoiceDesignTemplate.name}</td>
                  <td>{invoiceDesignTemplate.description}</td>
                  <td>
                    {invoiceDesignTemplate.image ? (
                      <div>
                        {invoiceDesignTemplate.imageContentType ? (
                          <a onClick={openFile(invoiceDesignTemplate.imageContentType, invoiceDesignTemplate.image)}>
                            <img
                              src={`data:${invoiceDesignTemplate.imageContentType};base64,${invoiceDesignTemplate.image}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {invoiceDesignTemplate.imageContentType}, {byteSize(invoiceDesignTemplate.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignTemplate.jrxmlTemplateFile ? (
                      <div>
                        {invoiceDesignTemplate.jrxmlTemplateFileContentType ? (
                          <a
                            onClick={openFile(invoiceDesignTemplate.jrxmlTemplateFileContentType, invoiceDesignTemplate.jrxmlTemplateFile)}
                          >
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {invoiceDesignTemplate.jrxmlTemplateFileContentType}, {byteSize(invoiceDesignTemplate.jrxmlTemplateFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignTemplate.createdDate ? (
                      <TextFormat type="date" value={invoiceDesignTemplate.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {invoiceDesignTemplate.updatedDate ? (
                      <TextFormat type="date" value={invoiceDesignTemplate.updatedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoiceDesignTemplate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceDesignTemplate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceDesignTemplate.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.home.notFound">No Invoice Design Templates found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoiceDesignTemplate }: IRootState) => ({
  invoiceDesignTemplateList: invoiceDesignTemplate.entities,
  loading: invoiceDesignTemplate.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignTemplate);
