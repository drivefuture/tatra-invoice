import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceUpdate = (props: IInvoiceUpdateProps) => {
  const [companyId, setCompanyId] = useState('0');
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceEntity, companies, customers, loading, updating } = props;

  const { comment, beforeInvoiceItemsText, invoiceFooterText, pdfFile, pdfFileContentType } = invoiceEntity;

  const handleClose = () => {
    props.history.push('/invoice');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getCompanies();
    props.getCustomers();
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
    values.issueDate = convertDateTimeToServer(values.issueDate);
    values.dueDate = convertDateTimeToServer(values.dueDate);
    values.paymentDate = convertDateTimeToServer(values.paymentDate);
    values.taxPoint = convertDateTimeToServer(values.taxPoint);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedDate = convertDateTimeToServer(values.updatedDate);

    if (errors.length === 0) {
      const entity = {
        ...invoiceEntity,
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
          <h2 id="tatraInvoiceApp.invoice.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.invoice.home.createOrEditLabel">Create or edit a Invoice</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="invoice-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="invoice-number">
                  <Translate contentKey="tatraInvoiceApp.invoice.number">Number</Translate>
                </Label>
                <AvField id="invoice-number" type="text" name="number" />
                <UncontrolledTooltip target="numberLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.number" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="invoice-issueDate">
                  <Translate contentKey="tatraInvoiceApp.invoice.issueDate">Issue Date</Translate>
                </Label>
                <AvInput
                  id="invoice-issueDate"
                  type="datetime-local"
                  className="form-control"
                  name="issueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.issueDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="issueDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.issueDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="paymentMethodLabel" for="invoice-paymentMethod">
                  <Translate contentKey="tatraInvoiceApp.invoice.paymentMethod">Payment Method</Translate>
                </Label>
                <AvInput
                  id="invoice-paymentMethod"
                  type="select"
                  className="form-control"
                  name="paymentMethod"
                  value={(!isNew && invoiceEntity.paymentMethod) || 'BANK_TRANSFER'}
                >
                  <option value="BANK_TRANSFER">{translate('tatraInvoiceApp.PaymentMethod.BANK_TRANSFER')}</option>
                  <option value="CASH">{translate('tatraInvoiceApp.PaymentMethod.CASH')}</option>
                  <option value="CASH_ON_DELIVERY">{translate('tatraInvoiceApp.PaymentMethod.CASH_ON_DELIVERY')}</option>
                </AvInput>
                <UncontrolledTooltip target="paymentMethodLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.paymentMethod" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="duePeriodLabel" for="invoice-duePeriod">
                  <Translate contentKey="tatraInvoiceApp.invoice.duePeriod">Due Period</Translate>
                </Label>
                <AvField
                  id="invoice-duePeriod"
                  type="string"
                  className="form-control"
                  name="duePeriod"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="duePeriodLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.duePeriod" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="dueDateLabel" for="invoice-dueDate">
                  <Translate contentKey="tatraInvoiceApp.invoice.dueDate">Due Date</Translate>
                </Label>
                <AvInput
                  id="invoice-dueDate"
                  type="datetime-local"
                  className="form-control"
                  name="dueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.dueDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="dueDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.dueDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="paymentDateLabel" for="invoice-paymentDate">
                  <Translate contentKey="tatraInvoiceApp.invoice.paymentDate">Payment Date</Translate>
                </Label>
                <AvInput
                  id="invoice-paymentDate"
                  type="datetime-local"
                  className="form-control"
                  name="paymentDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.paymentDate)}
                />
                <UncontrolledTooltip target="paymentDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.paymentDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="taxPointLabel" for="invoice-taxPoint">
                  <Translate contentKey="tatraInvoiceApp.invoice.taxPoint">Tax Point</Translate>
                </Label>
                <AvInput
                  id="invoice-taxPoint"
                  type="datetime-local"
                  className="form-control"
                  name="taxPoint"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.taxPoint)}
                />
                <UncontrolledTooltip target="taxPointLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.taxPoint" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="totalAmountLabel" for="invoice-totalAmount">
                  <Translate contentKey="tatraInvoiceApp.invoice.totalAmount">Total Amount</Translate>
                </Label>
                <AvField id="invoice-totalAmount" type="text" name="totalAmount" />
                <UncontrolledTooltip target="totalAmountLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.totalAmount" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="currencyLabel" for="invoice-currency">
                  <Translate contentKey="tatraInvoiceApp.invoice.currency">Currency</Translate>
                </Label>
                <AvField
                  id="invoice-currency"
                  type="text"
                  name="currency"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="currencyLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.currency" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="variableSymbolLabel" for="invoice-variableSymbol">
                  <Translate contentKey="tatraInvoiceApp.invoice.variableSymbol">Variable Symbol</Translate>
                </Label>
                <AvField id="invoice-variableSymbol" type="text" name="variableSymbol" />
                <UncontrolledTooltip target="variableSymbolLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.variableSymbol" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="constantSymbolLabel" for="invoice-constantSymbol">
                  <Translate contentKey="tatraInvoiceApp.invoice.constantSymbol">Constant Symbol</Translate>
                </Label>
                <AvField id="invoice-constantSymbol" type="text" name="constantSymbol" />
                <UncontrolledTooltip target="constantSymbolLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.constantSymbol" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="specialSymbolLabel" for="invoice-specialSymbol">
                  <Translate contentKey="tatraInvoiceApp.invoice.specialSymbol">Special Symbol</Translate>
                </Label>
                <AvField id="invoice-specialSymbol" type="text" name="specialSymbol" />
              </AvGroup>
              <AvGroup>
                <Label id="orderNumberLabel" for="invoice-orderNumber">
                  <Translate contentKey="tatraInvoiceApp.invoice.orderNumber">Order Number</Translate>
                </Label>
                <AvField id="invoice-orderNumber" type="text" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="languageLabel" for="invoice-language">
                  <Translate contentKey="tatraInvoiceApp.invoice.language">Language</Translate>
                </Label>
                <AvInput
                  id="invoice-language"
                  type="select"
                  className="form-control"
                  name="language"
                  value={(!isNew && invoiceEntity.language) || 'CZECH'}
                >
                  <option value="CZECH">{translate('tatraInvoiceApp.Language.CZECH')}</option>
                  <option value="SLOVAK">{translate('tatraInvoiceApp.Language.SLOVAK')}</option>
                  <option value="POLISH">{translate('tatraInvoiceApp.Language.POLISH')}</option>
                  <option value="RUSSIAN">{translate('tatraInvoiceApp.Language.RUSSIAN')}</option>
                  <option value="ENGLISH">{translate('tatraInvoiceApp.Language.ENGLISH')}</option>
                  <option value="GERMAN">{translate('tatraInvoiceApp.Language.GERMAN')}</option>
                </AvInput>
                <UncontrolledTooltip target="languageLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.language" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="commentLabel" for="invoice-comment">
                  <Translate contentKey="tatraInvoiceApp.invoice.comment">Comment</Translate>
                </Label>
                <AvInput id="invoice-comment" type="textarea" name="comment" />
                <UncontrolledTooltip target="commentLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.comment" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="beforeInvoiceItemsTextLabel" for="invoice-beforeInvoiceItemsText">
                  <Translate contentKey="tatraInvoiceApp.invoice.beforeInvoiceItemsText">Before Invoice Items Text</Translate>
                </Label>
                <AvInput id="invoice-beforeInvoiceItemsText" type="textarea" name="beforeInvoiceItemsText" />
                <UncontrolledTooltip target="beforeInvoiceItemsTextLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.beforeInvoiceItemsText" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="invoiceFooterTextLabel" for="invoice-invoiceFooterText">
                  <Translate contentKey="tatraInvoiceApp.invoice.invoiceFooterText">Invoice Footer Text</Translate>
                </Label>
                <AvInput id="invoice-invoiceFooterText" type="textarea" name="invoiceFooterText" />
                <UncontrolledTooltip target="invoiceFooterTextLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.invoiceFooterText" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="pdfFileLabel" for="pdfFile">
                    <Translate contentKey="tatraInvoiceApp.invoice.pdfFile">Pdf File</Translate>
                  </Label>
                  <br />
                  {pdfFile ? (
                    <div>
                      {pdfFileContentType ? (
                        <a onClick={openFile(pdfFileContentType, pdfFile)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {pdfFileContentType}, {byteSize(pdfFile)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('pdfFile')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_pdfFile" type="file" onChange={onBlobChange(false, 'pdfFile')} />
                  <AvInput type="hidden" name="pdfFile" value={pdfFile} />
                </AvGroup>

                <UncontrolledTooltip target="pdfFileLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.pdfFile" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-createdDate">
                  <Translate contentKey="tatraInvoiceApp.invoice.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="invoice-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.createdDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="invoice-updatedDate">
                  <Translate contentKey="tatraInvoiceApp.invoice.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="invoice-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.updatedDate)}
                />
                <UncontrolledTooltip target="updatedDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoice.help.updatedDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-company">
                  <Translate contentKey="tatraInvoiceApp.invoice.company">Company</Translate>
                </Label>
                <AvInput
                  id="invoice-company"
                  type="select"
                  className="form-control"
                  name="company.id"
                  value={isNew ? companies[0] && companies[0].id : invoiceEntity.company?.id}
                  required
                >
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-customer">
                  <Translate contentKey="tatraInvoiceApp.invoice.customer">Customer</Translate>
                </Label>
                <AvInput
                  id="invoice-customer"
                  type="select"
                  className="form-control"
                  name="customer.id"
                  value={isNew ? customers[0] && customers[0].id : invoiceEntity.customer?.id}
                  required
                >
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invoice" replace color="info">
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
  companies: storeState.company.entities,
  customers: storeState.customer.entities,
  invoiceEntity: storeState.invoice.entity,
  loading: storeState.invoice.loading,
  updating: storeState.invoice.updating,
  updateSuccess: storeState.invoice.updateSuccess,
});

const mapDispatchToProps = {
  getCompanies,
  getCustomers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceUpdate);
