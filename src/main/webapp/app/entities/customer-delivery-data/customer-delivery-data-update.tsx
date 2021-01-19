import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer-delivery-data.reducer';
import { ICustomerDeliveryData } from 'app/shared/model/customer-delivery-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerDeliveryDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDeliveryDataUpdate = (props: ICustomerDeliveryDataUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerDeliveryDataEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer-delivery-data');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerDeliveryDataEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tatraInvoiceApp.customerDeliveryData.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.customerDeliveryData.home.createOrEditLabel">
              Create or edit a CustomerDeliveryData
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerDeliveryDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-delivery-data-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-delivery-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyNameLabel" for="customer-delivery-data-companyName">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.companyName">Company Name</Translate>
                </Label>
                <AvField id="customer-delivery-data-companyName" type="text" name="companyName" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="customer-delivery-data-firstName">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.firstName">First Name</Translate>
                </Label>
                <AvField id="customer-delivery-data-firstName" type="text" name="firstName" />
                <UncontrolledTooltip target="firstNameLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.firstName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-delivery-data-lastName">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.lastName">Last Name</Translate>
                </Label>
                <AvField id="customer-delivery-data-lastName" type="text" name="lastName" />
                <UncontrolledTooltip target="lastNameLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.lastName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="customer-delivery-data-street">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.street">Street</Translate>
                </Label>
                <AvField id="customer-delivery-data-street" type="text" name="street" />
                <UncontrolledTooltip target="streetLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.street" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="customer-delivery-data-city">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.city">City</Translate>
                </Label>
                <AvField id="customer-delivery-data-city" type="text" name="city" />
                <UncontrolledTooltip target="cityLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.city" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="customer-delivery-data-postalCode">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="customer-delivery-data-postalCode" type="text" name="postalCode" />
                <UncontrolledTooltip target="postalCodeLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.postalCode" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="customer-delivery-data-country">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.country">Country</Translate>
                </Label>
                <AvField id="customer-delivery-data-country" type="text" name="country" />
                <UncontrolledTooltip target="countryLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.country" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="customer-delivery-data-telephone">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.telephone">Telephone</Translate>
                </Label>
                <AvField id="customer-delivery-data-telephone" type="text" name="telephone" />
                <UncontrolledTooltip target="telephoneLabel">
                  <Translate contentKey="tatraInvoiceApp.customerDeliveryData.help.telephone" />
                </UncontrolledTooltip>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer-delivery-data" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customerDeliveryDataEntity: storeState.customerDeliveryData.entity,
  loading: storeState.customerDeliveryData.loading,
  updating: storeState.customerDeliveryData.updating,
  updateSuccess: storeState.customerDeliveryData.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDeliveryDataUpdate);
