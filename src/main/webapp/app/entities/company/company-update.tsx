import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvoiceDesignSettings } from 'app/shared/model/invoice-design-settings.model';
import { getEntities as getInvoiceDesignSettings } from 'app/entities/invoice-design-settings/invoice-design-settings.reducer';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { getEntities as getUserAccounts } from 'app/entities/user-account/user-account.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyUpdate = (props: ICompanyUpdateProps) => {
  const [idsuserAccount, setIdsuserAccount] = useState([]);
  const [invoiceDesignSettingsId, setInvoiceDesignSettingsId] = useState('0');
  const [userAccountId, setUserAccountId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { companyEntity, invoiceDesignSettings, userAccounts, loading, updating } = props;

  const { supplementaryText } = companyEntity;

  const handleClose = () => {
    props.history.push('/company' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInvoiceDesignSettings();
    props.getUserAccounts();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...companyEntity,
        ...values,
        userAccounts: mapIdList(values.userAccounts),
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
          <h2 id="tatraInvoiceApp.company.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.company.home.createOrEditLabel">Create or edit a Company</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : companyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="company-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="company-name">
                  <Translate contentKey="tatraInvoiceApp.company.name">Name</Translate>
                </Label>
                <AvField id="company-name" type="text" name="name" />
                <UncontrolledTooltip target="nameLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.name" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="company-firstName">
                  <Translate contentKey="tatraInvoiceApp.company.firstName">First Name</Translate>
                </Label>
                <AvField id="company-firstName" type="text" name="firstName" />
                <UncontrolledTooltip target="firstNameLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.firstName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="company-lastName">
                  <Translate contentKey="tatraInvoiceApp.company.lastName">Last Name</Translate>
                </Label>
                <AvField id="company-lastName" type="text" name="lastName" />
                <UncontrolledTooltip target="lastNameLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.lastName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="company-street">
                  <Translate contentKey="tatraInvoiceApp.company.street">Street</Translate>
                </Label>
                <AvField id="company-street" type="text" name="street" />
                <UncontrolledTooltip target="streetLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.street" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="company-city">
                  <Translate contentKey="tatraInvoiceApp.company.city">City</Translate>
                </Label>
                <AvField id="company-city" type="text" name="city" />
                <UncontrolledTooltip target="cityLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.city" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="company-postalCode">
                  <Translate contentKey="tatraInvoiceApp.company.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="company-postalCode" type="text" name="postalCode" />
                <UncontrolledTooltip target="postalCodeLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.postalCode" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="company-country">
                  <Translate contentKey="tatraInvoiceApp.company.country">Country</Translate>
                </Label>
                <AvField id="company-country" type="text" name="country" />
                <UncontrolledTooltip target="countryLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.country" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="registrationNumberLabel" for="company-registrationNumber">
                  <Translate contentKey="tatraInvoiceApp.company.registrationNumber">Registration Number</Translate>
                </Label>
                <AvField id="company-registrationNumber" type="text" name="registrationNumber" />
                <UncontrolledTooltip target="registrationNumberLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.registrationNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="vatNumberLabel" for="company-vatNumber">
                  <Translate contentKey="tatraInvoiceApp.company.vatNumber">Vat Number</Translate>
                </Label>
                <AvField id="company-vatNumber" type="text" name="vatNumber" />
                <UncontrolledTooltip target="vatNumberLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.vatNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="registeredMarkLabel" for="company-registeredMark">
                  <Translate contentKey="tatraInvoiceApp.company.registeredMark">Registered Mark</Translate>
                </Label>
                <AvField id="company-registeredMark" type="text" name="registeredMark" />
                <UncontrolledTooltip target="registeredMarkLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.registeredMark" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="supplementaryTextLabel" for="company-supplementaryText">
                  <Translate contentKey="tatraInvoiceApp.company.supplementaryText">Supplementary Text</Translate>
                </Label>
                <AvInput id="company-supplementaryText" type="textarea" name="supplementaryText" />
                <UncontrolledTooltip target="supplementaryTextLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.supplementaryText" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="bankAccountNumberLabel" for="company-bankAccountNumber">
                  <Translate contentKey="tatraInvoiceApp.company.bankAccountNumber">Bank Account Number</Translate>
                </Label>
                <AvField id="company-bankAccountNumber" type="text" name="bankAccountNumber" />
                <UncontrolledTooltip target="bankAccountNumberLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.bankAccountNumber" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="ibanLabel" for="company-iban">
                  <Translate contentKey="tatraInvoiceApp.company.iban">Iban</Translate>
                </Label>
                <AvField id="company-iban" type="text" name="iban" />
                <UncontrolledTooltip target="ibanLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.iban" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="company-email">
                  <Translate contentKey="tatraInvoiceApp.company.email">Email</Translate>
                </Label>
                <AvField
                  id="company-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="emailLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.email" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="company-telephone">
                  <Translate contentKey="tatraInvoiceApp.company.telephone">Telephone</Translate>
                </Label>
                <AvField id="company-telephone" type="text" name="telephone" />
                <UncontrolledTooltip target="telephoneLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.telephone" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="webUrlLabel" for="company-webUrl">
                  <Translate contentKey="tatraInvoiceApp.company.webUrl">Web Url</Translate>
                </Label>
                <AvField id="company-webUrl" type="text" name="webUrl" />
                <UncontrolledTooltip target="webUrlLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.webUrl" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="company-createdDate">
                  <Translate contentKey="tatraInvoiceApp.company.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="company-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.companyEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.createdDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="company-updatedDate">
                  <Translate contentKey="tatraInvoiceApp.company.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="company-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.companyEntity.updatedDate)}
                />
                <UncontrolledTooltip target="updatedDateLabel">
                  <Translate contentKey="tatraInvoiceApp.company.help.updatedDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="company-invoiceDesignSettings">
                  <Translate contentKey="tatraInvoiceApp.company.invoiceDesignSettings">Invoice Design Settings</Translate>
                </Label>
                <AvInput id="company-invoiceDesignSettings" type="select" className="form-control" name="invoiceDesignSettings.id">
                  <option value="" key="0" />
                  {invoiceDesignSettings
                    ? invoiceDesignSettings.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="company-userAccount">
                  <Translate contentKey="tatraInvoiceApp.company.userAccount">User Account</Translate>
                </Label>
                <AvInput id="company-userAccount" type="select" className="form-control" name="userAccount.id">
                  <option value="" key="0" />
                  {userAccounts
                    ? userAccounts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="company-userAccount">
                  <Translate contentKey="tatraInvoiceApp.company.userAccount">User Account</Translate>
                </Label>
                <AvInput
                  id="company-userAccount"
                  type="select"
                  multiple
                  className="form-control"
                  name="userAccounts"
                  value={companyEntity.userAccounts && companyEntity.userAccounts.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {userAccounts
                    ? userAccounts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/company" replace color="info">
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
  invoiceDesignSettings: storeState.invoiceDesignSettings.entities,
  userAccounts: storeState.userAccount.entities,
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess,
});

const mapDispatchToProps = {
  getInvoiceDesignSettings,
  getUserAccounts,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUpdate);
