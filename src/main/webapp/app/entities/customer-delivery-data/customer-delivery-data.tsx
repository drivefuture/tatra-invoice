import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer-delivery-data.reducer';
import { ICustomerDeliveryData } from 'app/shared/model/customer-delivery-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDeliveryDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CustomerDeliveryData = (props: ICustomerDeliveryDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { customerDeliveryDataList, match, loading } = props;
  return (
    <div>
      <h2 id="customer-delivery-data-heading">
        <Translate contentKey="tatraInvoiceApp.customerDeliveryData.home.title">Customer Delivery Data</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.customerDeliveryData.home.createLabel">Create new Customer Delivery Data</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {customerDeliveryDataList && customerDeliveryDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.companyName">Company Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.street">Street</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.telephone">Telephone</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.updatedDate">Updated Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerDeliveryDataList.map((customerDeliveryData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customerDeliveryData.id}`} color="link" size="sm">
                      {customerDeliveryData.id}
                    </Button>
                  </td>
                  <td>{customerDeliveryData.companyName}</td>
                  <td>{customerDeliveryData.firstName}</td>
                  <td>{customerDeliveryData.lastName}</td>
                  <td>{customerDeliveryData.street}</td>
                  <td>{customerDeliveryData.city}</td>
                  <td>{customerDeliveryData.postalCode}</td>
                  <td>{customerDeliveryData.country}</td>
                  <td>{customerDeliveryData.telephone}</td>
                  <td>
                    {customerDeliveryData.createdDate ? (
                      <TextFormat type="date" value={customerDeliveryData.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerDeliveryData.updatedDate ? (
                      <TextFormat type="date" value={customerDeliveryData.updatedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customerDeliveryData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerDeliveryData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerDeliveryData.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.home.notFound">No Customer Delivery Data found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customerDeliveryData }: IRootState) => ({
  customerDeliveryDataList: customerDeliveryData.entities,
  loading: customerDeliveryData.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDeliveryData);
