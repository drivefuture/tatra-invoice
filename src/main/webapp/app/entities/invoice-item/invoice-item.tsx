import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InvoiceItem = (props: IInvoiceItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { invoiceItemList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-item-heading">
        <Translate contentKey="tatraInvoiceApp.invoiceItem.home.title">Invoice Items</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.invoiceItem.home.createLabel">Create new Invoice Item</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceItemList && invoiceItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.measureUnit">Measure Unit</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.measureUnitPrice">Measure Unit Price</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.updatedDate">Updated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.invoice">Invoice</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceItemList.map((invoiceItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoiceItem.id}`} color="link" size="sm">
                      {invoiceItem.id}
                    </Button>
                  </td>
                  <td>{invoiceItem.sequence}</td>
                  <td>{invoiceItem.quantity}</td>
                  <td>{invoiceItem.measureUnit}</td>
                  <td>{invoiceItem.description}</td>
                  <td>{invoiceItem.measureUnitPrice}</td>
                  <td>
                    {invoiceItem.createdDate ? <TextFormat type="date" value={invoiceItem.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {invoiceItem.updatedDate ? <TextFormat type="date" value={invoiceItem.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{invoiceItem.invoice ? <Link to={`invoice/${invoiceItem.invoice.id}`}>{invoiceItem.invoice.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tatraInvoiceApp.invoiceItem.home.notFound">No Invoice Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoiceItem }: IRootState) => ({
  invoiceItemList: invoiceItem.entities,
  loading: invoiceItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItem);
