import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer-invoice-data.reducer';
import { ICustomerInvoiceData } from 'app/shared/model/customer-invoice-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerInvoiceDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerInvoiceDataUpdate = (props: ICustomerInvoiceDataUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerInvoiceDataEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer-invoice-data');
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
        ...customerInvoiceDataEntity,
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
          <h2 id="tatraInvoiceApp.customerInvoiceData.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.customerInvoiceData.home.createOrEditLabel">
              Create or edit a CustomerInvoiceData
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerInvoiceDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-invoice-data-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-invoice-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyNameLabel" for="customer-invoice-data-companyName">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.companyName">Company Name</Translate>
                </Label>
                <AvField id="customer-invoice-data-companyName" type="text" name="companyName" />
              </AvGroup>
              <AvGroup>
                <Label id="ownNameLabel" for="customer-invoice-data-ownName">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.ownName">Own Name</Translate>
                </Label>
                <AvField
                  id="customer-invoice-data-ownName"
                  type="text"
                  name="ownName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="ownNameLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.ownName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="customer-invoice-data-firstName">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.firstName">First Name</Translate>
                </Label>
                <AvField id="customer-invoice-data-firstName" type="text" name="firstName" />
                <UncontrolledTooltip target="firstNameLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.firstName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-invoice-data-lastName">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.lastName">Last Name</Translate>
                </Label>
                <AvField id="customer-invoice-data-lastName" type="text" name="lastName" />
                <UncontrolledTooltip target="lastNameLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.lastName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="customer-invoice-data-street">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.street">Street</Translate>
                </Label>
                <AvField id="customer-invoice-data-street" type="text" name="street" />
                <UncontrolledTooltip target="streetLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.street" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="customer-invoice-data-city">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.city">City</Translate>
                </Label>
                <AvField id="customer-invoice-data-city" type="text" name="city" />
                <UncontrolledTooltip target="cityLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.city" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="customer-invoice-data-postalCode">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="customer-invoice-data-postalCode" type="text" name="postalCode" />
                <UncontrolledTooltip target="postalCodeLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.postalCode" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="customer-invoice-data-country">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.country">Country</Translate>
                </Label>
                <AvField id="customer-invoice-data-country" type="text" name="country" />
                <UncontrolledTooltip target="countryLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.country" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="registrationNumberLabel" for="customer-invoice-data-registrationNumber">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.registrationNumber">Registration Number</Translate>
                </Label>
                <AvField id="customer-invoice-data-registrationNumber" type="text" name="registrationNumber" />
                <UncontrolledTooltip target="registrationNumberLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.registrationNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="vatNumberLabel" for="customer-invoice-data-vatNumber">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.vatNumber">Vat Number</Translate>
                </Label>
                <AvField id="customer-invoice-data-vatNumber" type="text" name="vatNumber" />
                <UncontrolledTooltip target="vatNumberLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.vatNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="bankAccountNumberLabel" for="customer-invoice-data-bankAccountNumber">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.bankAccountNumber">Bank Account Number</Translate>
                </Label>
                <AvField id="customer-invoice-data-bankAccountNumber" type="text" name="bankAccountNumber" />
                <UncontrolledTooltip target="bankAccountNumberLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.bankAccountNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="ibanLabel" for="customer-invoice-data-iban">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.iban">Iban</Translate>
                </Label>
                <AvField id="customer-invoice-data-iban" type="text" name="iban" />
                <UncontrolledTooltip target="ibanLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.iban" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="webUrlLabel" for="customer-invoice-data-webUrl">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.webUrl">Web Url</Translate>
                </Label>
                <AvField id="customer-invoice-data-webUrl" type="text" name="webUrl" />
                <UncontrolledTooltip target="webUrlLabel">
                  <Translate contentKey="tatraInvoiceApp.customerInvoiceData.help.webUrl" />
                </UncontrolledTooltip>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer-invoice-data" replace color="info">
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
  customerInvoiceDataEntity: storeState.customerInvoiceData.entity,
  loading: storeState.customerInvoiceData.loading,
  updating: storeState.customerInvoiceData.updating,
  updateSuccess: storeState.customerInvoiceData.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInvoiceDataUpdate);
