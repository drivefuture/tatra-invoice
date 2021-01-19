import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';
import { getEntities as getInvoiceDesignTemplates } from 'app/entities/invoice-design-template/invoice-design-template.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './invoice-design-settings.reducer';
import { IInvoiceDesignSettings } from 'app/shared/model/invoice-design-settings.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceDesignSettingsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDesignSettingsUpdate = (props: IInvoiceDesignSettingsUpdateProps) => {
  const [templateId, setTemplateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceDesignSettingsEntity, invoiceDesignTemplates, loading, updating } = props;

  const { logo, logoContentType, signatureAndStamp, signatureAndStampContentType } = invoiceDesignSettingsEntity;

  const handleClose = () => {
    props.history.push('/invoice-design-settings');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInvoiceDesignTemplates();
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
        ...invoiceDesignSettingsEntity,
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
          <h2 id="tatraInvoiceApp.invoiceDesignSettings.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.home.createOrEditLabel">
              Create or edit a InvoiceDesignSettings
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceDesignSettingsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-design-settings-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="invoice-design-settings-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="logo">
                    <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.logo">Logo</Translate>
                  </Label>
                  <br />
                  {logo ? (
                    <div>
                      {logoContentType ? (
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {logoContentType}, {byteSize(logo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('logo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_logo" type="file" onChange={onBlobChange(true, 'logo')} accept="image/*" />
                  <AvInput type="hidden" name="logo" value={logo} />
                </AvGroup>

                <UncontrolledTooltip target="logoLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.logo" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="signatureAndStampLabel" for="signatureAndStamp">
                    <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.signatureAndStamp">Signature And Stamp</Translate>
                  </Label>
                  <br />
                  {signatureAndStamp ? (
                    <div>
                      {signatureAndStampContentType ? (
                        <a onClick={openFile(signatureAndStampContentType, signatureAndStamp)}>
                          <img src={`data:${signatureAndStampContentType};base64,${signatureAndStamp}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {signatureAndStampContentType}, {byteSize(signatureAndStamp)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('signatureAndStamp')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_signatureAndStamp" type="file" onChange={onBlobChange(true, 'signatureAndStamp')} accept="image/*" />
                  <AvInput type="hidden" name="signatureAndStamp" value={signatureAndStamp} />
                </AvGroup>

                <UncontrolledTooltip target="signatureAndStampLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.signatureAndStamp" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-design-settings-createdDate">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="invoice-design-settings-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceDesignSettingsEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.createdDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="invoice-design-settings-updatedDate">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="invoice-design-settings-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceDesignSettingsEntity.updatedDate)}
                />
                <UncontrolledTooltip target="updatedDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.updatedDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-design-settings-template">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.template">Template</Translate>
                </Label>
                <AvInput id="invoice-design-settings-template" type="select" className="form-control" name="template.id">
                  <option value="" key="0" />
                  {invoiceDesignTemplates
                    ? invoiceDesignTemplates.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invoice-design-settings" replace color="info">
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
  invoiceDesignTemplates: storeState.invoiceDesignTemplate.entities,
  invoiceDesignSettingsEntity: storeState.invoiceDesignSettings.entity,
  loading: storeState.invoiceDesignSettings.loading,
  updating: storeState.invoiceDesignSettings.updating,
  updateSuccess: storeState.invoiceDesignSettings.updateSuccess,
});

const mapDispatchToProps = {
  getInvoiceDesignTemplates,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignSettingsUpdate);
