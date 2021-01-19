import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomerInvoiceData } from 'app/shared/model/customer-invoice-data.model';
import { getEntities as getCustomerInvoiceData } from 'app/entities/customer-invoice-data/customer-invoice-data.reducer';
import { ICustomerDeliveryData } from 'app/shared/model/customer-delivery-data.model';
import { getEntities as getCustomerDeliveryData } from 'app/entities/customer-delivery-data/customer-delivery-data.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [customerInvoiceDataId, setCustomerInvoiceDataId] = useState('0');
  const [deliveryDataId, setDeliveryDataId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, customerInvoiceData, customerDeliveryData, loading, updating } = props;

  const { comment, supplementaryText, beforeInvoiceItemsText, invoiceFooterText } = customerEntity;

  const handleClose = () => {
    props.history.push('/customer' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomerInvoiceData();
    props.getCustomerDeliveryData();
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
        ...customerEntity,
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
          <h2 id="tatraInvoiceApp.customer.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="emailLabel" for="customer-email">
                  <Translate contentKey="tatraInvoiceApp.customer.email">Email</Translate>
                </Label>
                <AvField
                  id="customer-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailCopyLabel" for="customer-emailCopy">
                  <Translate contentKey="tatraInvoiceApp.customer.emailCopy">Email Copy</Translate>
                </Label>
                <AvField id="customer-emailCopy" type="text" name="emailCopy" />
                <UncontrolledTooltip target="emailCopyLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.emailCopy" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="emailBlindCopyLabel" for="customer-emailBlindCopy">
                  <Translate contentKey="tatraInvoiceApp.customer.emailBlindCopy">Email Blind Copy</Translate>
                </Label>
                <AvField id="customer-emailBlindCopy" type="text" name="emailBlindCopy" />
                <UncontrolledTooltip target="emailBlindCopyLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.emailBlindCopy" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="customer-telephone">
                  <Translate contentKey="tatraInvoiceApp.customer.telephone">Telephone</Translate>
                </Label>
                <AvField id="customer-telephone" type="text" name="telephone" />
                <UncontrolledTooltip target="telephoneLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.telephone" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="invoiceDuePeriodLabel" for="customer-invoiceDuePeriod">
                  <Translate contentKey="tatraInvoiceApp.customer.invoiceDuePeriod">Invoice Due Period</Translate>
                </Label>
                <AvField
                  id="customer-invoiceDuePeriod"
                  type="string"
                  className="form-control"
                  name="invoiceDuePeriod"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="invoiceDuePeriodLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.invoiceDuePeriod" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="invoiceLanguageLabel" for="customer-invoiceLanguage">
                  <Translate contentKey="tatraInvoiceApp.customer.invoiceLanguage">Invoice Language</Translate>
                </Label>
                <AvInput
                  id="customer-invoiceLanguage"
                  type="select"
                  className="form-control"
                  name="invoiceLanguage"
                  value={(!isNew && customerEntity.invoiceLanguage) || 'CZECH'}
                >
                  <option value="CZECH">{translate('tatraInvoiceApp.Language.CZECH')}</option>
                  <option value="SLOVAK">{translate('tatraInvoiceApp.Language.SLOVAK')}</option>
                  <option value="POLISH">{translate('tatraInvoiceApp.Language.POLISH')}</option>
                  <option value="RUSSIAN">{translate('tatraInvoiceApp.Language.RUSSIAN')}</option>
                  <option value="ENGLISH">{translate('tatraInvoiceApp.Language.ENGLISH')}</option>
                  <option value="GERMAN">{translate('tatraInvoiceApp.Language.GERMAN')}</option>
                </AvInput>
                <UncontrolledTooltip target="invoiceLanguageLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.invoiceLanguage" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="commentLabel" for="customer-comment">
                  <Translate contentKey="tatraInvoiceApp.customer.comment">Comment</Translate>
                </Label>
                <AvInput id="customer-comment" type="textarea" name="comment" />
                <UncontrolledTooltip target="commentLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.comment" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="supplementaryTextLabel" for="customer-supplementaryText">
                  <Translate contentKey="tatraInvoiceApp.customer.supplementaryText">Supplementary Text</Translate>
                </Label>
                <AvInput id="customer-supplementaryText" type="textarea" name="supplementaryText" />
                <UncontrolledTooltip target="supplementaryTextLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.supplementaryText" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="beforeInvoiceItemsTextLabel" for="customer-beforeInvoiceItemsText">
                  <Translate contentKey="tatraInvoiceApp.customer.beforeInvoiceItemsText">Before Invoice Items Text</Translate>
                </Label>
                <AvInput id="customer-beforeInvoiceItemsText" type="textarea" name="beforeInvoiceItemsText" />
                <UncontrolledTooltip target="beforeInvoiceItemsTextLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.beforeInvoiceItemsText" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="invoiceFooterTextLabel" for="customer-invoiceFooterText">
                  <Translate contentKey="tatraInvoiceApp.customer.invoiceFooterText">Invoice Footer Text</Translate>
                </Label>
                <AvInput id="customer-invoiceFooterText" type="textarea" name="invoiceFooterText" />
                <UncontrolledTooltip target="invoiceFooterTextLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.invoiceFooterText" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="customer-createdDate">
                  <Translate contentKey="tatraInvoiceApp.customer.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="customer-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.createdDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="customer-updatedDate">
                  <Translate contentKey="tatraInvoiceApp.customer.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="customer-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.updatedDate)}
                />
                <UncontrolledTooltip target="updatedDateLabel">
                  <Translate contentKey="tatraInvoiceApp.customer.help.updatedDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="customer-customerInvoiceData">
                  <Translate contentKey="tatraInvoiceApp.customer.customerInvoiceData">Customer Invoice Data</Translate>
                </Label>
                <AvInput id="customer-customerInvoiceData" type="select" className="form-control" name="customerInvoiceData.id">
                  <option value="" key="0" />
                  {customerInvoiceData
                    ? customerInvoiceData.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.ownName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="customer-deliveryData">
                  <Translate contentKey="tatraInvoiceApp.customer.deliveryData">Delivery Data</Translate>
                </Label>
                <AvInput id="customer-deliveryData" type="select" className="form-control" name="deliveryData.id">
                  <option value="" key="0" />
                  {customerDeliveryData
                    ? customerDeliveryData.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.companyName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
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
  customerInvoiceData: storeState.customerInvoiceData.entities,
  customerDeliveryData: storeState.customerDeliveryData.entities,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getCustomerInvoiceData,
  getCustomerDeliveryData,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
