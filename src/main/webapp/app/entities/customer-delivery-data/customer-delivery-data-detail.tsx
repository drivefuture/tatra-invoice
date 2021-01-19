import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-delivery-data.reducer';
import { ICustomerDeliveryData } from 'app/shared/model/customer-delivery-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDeliveryDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDeliveryDataDetail = (props: ICustomerDeliveryDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerDeliveryDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.customerDeliveryData.detail.title">CustomerDeliveryData</Translate> [
          <b>{customerDeliveryDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="companyName">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.companyName">Company Name</Translate>
            </span>
            <UncontrolledTooltip target="companyName">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.companyName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.companyName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.firstName">First Name</Translate>
            </span>
            <UncontrolledTooltip target="firstName">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.firstName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.lastName">Last Name</Translate>
            </span>
            <UncontrolledTooltip target="lastName">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.lastName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.lastName}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.street">Street</Translate>
            </span>
            <UncontrolledTooltip target="street">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.street" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.street}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.city">City</Translate>
            </span>
            <UncontrolledTooltip target="city">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.city" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.city}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.postalCode">Postal Code</Translate>
            </span>
            <UncontrolledTooltip target="postalCode">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.postalCode" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.postalCode}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.country">Country</Translate>
            </span>
            <UncontrolledTooltip target="country">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.country" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.country}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.telephone">Telephone</Translate>
            </span>
            <UncontrolledTooltip target="telephone">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.telephone" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerDeliveryDataEntity.telephone}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.createdDate">Created Date</Translate>
            </span>
            <UncontrolledTooltip target="createdDate">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.createdDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {customerDeliveryDataEntity.createdDate ? (
              <TextFormat value={customerDeliveryDataEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {customerDeliveryDataEntity.updatedDate ? (
              <TextFormat value={customerDeliveryDataEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/customer-delivery-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-delivery-data/${customerDeliveryDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customerDeliveryData }: IRootState) => ({
  customerDeliveryDataEntity: customerDeliveryData.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDeliveryDataDetail);
