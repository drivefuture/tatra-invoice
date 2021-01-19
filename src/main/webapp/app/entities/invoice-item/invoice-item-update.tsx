import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice.reducer';
import { getEntity, updateEntity, createEntity, reset } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceItemUpdate = (props: IInvoiceItemUpdateProps) => {
  const [invoiceId, setInvoiceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceItemEntity, invoices, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/invoice-item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInvoices();
  }, []);

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
        ...invoiceItemEntity,
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
          <h2 id="tatraInvoiceApp.invoiceItem.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.invoiceItem.home.createOrEditLabel">Create or edit a InvoiceItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="invoice-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sequenceLabel" for="invoice-item-sequence">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.sequence">Sequence</Translate>
                </Label>
                <AvField
                  id="invoice-item-sequence"
                  type="string"
                  className="form-control"
                  name="sequence"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="sequenceLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.sequence" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="invoice-item-quantity">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="invoice-item-quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="quantityLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.quantity" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="measureUnitLabel" for="invoice-item-measureUnit">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.measureUnit">Measure Unit</Translate>
                </Label>
                <AvField
                  id="invoice-item-measureUnit"
                  type="text"
                  name="measureUnit"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="measureUnitLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.measureUnit" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="invoice-item-description">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.description">Description</Translate>
                </Label>
                <AvField
                  id="invoice-item-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="descriptionLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.description" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="measureUnitPriceLabel" for="invoice-item-measureUnitPrice">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.measureUnitPrice">Measure Unit Price</Translate>
                </Label>
                <AvField
                  id="invoice-item-measureUnitPrice"
                  type="text"
                  name="measureUnitPrice"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="measureUnitPriceLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.measureUnitPrice" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-item-createdDate">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="invoice-item-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceItemEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.createdDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="invoice-item-updatedDate">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="invoice-item-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceItemEntity.updatedDate)}
                />
                <UncontrolledTooltip target="updatedDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.help.updatedDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-item-invoice">
                  <Translate contentKey="tatraInvoiceApp.invoiceItem.invoice">Invoice</Translate>
                </Label>
                <AvInput id="invoice-item-invoice" type="select" className="form-control" name="invoice.id">
                  <option value="" key="0" />
                  {invoices
                    ? invoices.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invoice-item" replace color="info">
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
  invoices: storeState.invoice.entities,
  invoiceItemEntity: storeState.invoiceItem.entity,
  loading: storeState.invoiceItem.loading,
  updating: storeState.invoiceItem.updating,
  updateSuccess: storeState.invoiceItem.updateSuccess,
});

const mapDispatchToProps = {
  getInvoices,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItemUpdate);
