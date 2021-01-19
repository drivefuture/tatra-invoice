import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer-invoice-data.reducer';
import { ICustomerInvoiceData } from 'app/shared/model/customer-invoice-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerInvoiceDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CustomerInvoiceData = (props: ICustomerInvoiceDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { customerInvoiceDataList, match, loading } = props;
  return (
    <div>
      <h2 id="customer-invoice-data-heading">
        <Translate contentKey="tatraInvoiceApp.customerInvoiceData.home.title">Customer Invoice Data</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.customerInvoiceData.home.createLabel">Create new Customer Invoice Data</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {customerInvoiceDataList && customerInvoiceDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.companyName">Company Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.ownName">Own Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.street">Street</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.registrationNumber">Registration Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.vatNumber">Vat Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.bankAccountNumber">Bank Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.iban">Iban</Translate>
                </th>
                <th>
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.webUrl">Web Url</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerInvoiceDataList.map((customerInvoiceData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customerInvoiceData.id}`} color="link" size="sm">
                      {customerInvoiceData.id}
                    </Button>
                  </td>
                  <td>{customerInvoiceData.companyName}</td>
                  <td>{customerInvoiceData.ownName}</td>
                  <td>{customerInvoiceData.firstName}</td>
                  <td>{customerInvoiceData.lastName}</td>
                  <td>{customerInvoiceData.street}</td>
                  <td>{customerInvoiceData.city}</td>
                  <td>{customerInvoiceData.postalCode}</td>
                  <td>{customerInvoiceData.country}</td>
                  <td>{customerInvoiceData.registrationNumber}</td>
                  <td>{customerInvoiceData.vatNumber}</td>
                  <td>{customerInvoiceData.bankAccountNumber}</td>
                  <td>{customerInvoiceData.iban}</td>
                  <td>{customerInvoiceData.webUrl}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customerInvoiceData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerInvoiceData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerInvoiceData.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.home.notFound">No Customer Invoice Data found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customerInvoiceData }: IRootState) => ({
  customerInvoiceDataList: customerInvoiceData.entities,
  loading: customerInvoiceData.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInvoiceData);
