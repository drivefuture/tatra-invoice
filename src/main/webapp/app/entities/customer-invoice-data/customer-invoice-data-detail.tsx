import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-invoice-data.reducer';
import { ICustomerInvoiceData } from 'app/shared/model/customer-invoice-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerInvoiceDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerInvoiceDataDetail = (props: ICustomerInvoiceDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerInvoiceDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.customerInvoiceData.detail.title">CustomerInvoiceData</Translate> [
          <b>{customerInvoiceDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="companyName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.companyName">Company Name</Translate>
            </span>
            <UncontrolledTooltip target="companyName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.companyName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.companyName}</dd>
          <dt>
            <span id="ownName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.ownName">Own Name</Translate>
            </span>
            <UncontrolledTooltip target="ownName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.ownName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.ownName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.firstName">First Name</Translate>
            </span>
            <UncontrolledTooltip target="firstName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.firstName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.lastName">Last Name</Translate>
            </span>
            <UncontrolledTooltip target="lastName">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.lastName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.lastName}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.street">Street</Translate>
            </span>
            <UncontrolledTooltip target="street">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.street" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.street}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.city">City</Translate>
            </span>
            <UncontrolledTooltip target="city">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.city" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.city}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.postalCode">Postal Code</Translate>
            </span>
            <UncontrolledTooltip target="postalCode">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.postalCode" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.postalCode}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.country">Country</Translate>
            </span>
            <UncontrolledTooltip target="country">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.country" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.country}</dd>
          <dt>
            <span id="registrationNumber">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.registrationNumber">Registration Number</Translate>
            </span>
            <UncontrolledTooltip target="registrationNumber">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.registrationNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.registrationNumber}</dd>
          <dt>
            <span id="vatNumber">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.vatNumber">Vat Number</Translate>
            </span>
            <UncontrolledTooltip target="vatNumber">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.vatNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.vatNumber}</dd>
          <dt>
            <span id="bankAccountNumber">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.bankAccountNumber">Bank Account Number</Translate>
            </span>
            <UncontrolledTooltip target="bankAccountNumber">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.bankAccountNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.bankAccountNumber}</dd>
          <dt>
            <span id="iban">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.iban">Iban</Translate>
            </span>
            <UncontrolledTooltip target="iban">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.iban" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.iban}</dd>
          <dt>
            <span id="webUrl">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.webUrl">Web Url</Translate>
            </span>
            <UncontrolledTooltip target="webUrl">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.webUrl" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerInvoiceDataEntity.webUrl}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.createdDate">Created Date</Translate>
            </span>
            <UncontrolledTooltip target="createdDate">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.createdDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {customerInvoiceDataEntity.createdDate ? (
              <TextFormat value={customerInvoiceDataEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {customerInvoiceDataEntity.updatedDate ? (
              <TextFormat value={customerInvoiceDataEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/customer-invoice-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-invoice-data/${customerInvoiceDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customerInvoiceData }: IRootState) => ({
  customerInvoiceDataEntity: customerInvoiceData.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInvoiceDataDetail);
