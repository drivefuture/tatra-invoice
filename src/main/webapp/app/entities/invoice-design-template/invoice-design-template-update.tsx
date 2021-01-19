import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './invoice-design-template.reducer';
import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceDesignTemplateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDesignTemplateUpdate = (props: IInvoiceDesignTemplateUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceDesignTemplateEntity, loading, updating } = props;

  const { description, image, imageContentType, jrxmlTemplateFile, jrxmlTemplateFileContentType } = invoiceDesignTemplateEntity;

  const handleClose = () => {
    props.history.push('/invoice-design-template');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
        ...invoiceDesignTemplateEntity,
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
          <h2 id="tatraInvoiceApp.invoiceDesignTemplate.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.home.createOrEditLabel">
              Create or edit a InvoiceDesignTemplate
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceDesignTemplateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-design-template-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="invoice-design-template-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="invoice-design-template-name">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.name">Name</Translate>
                </Label>
                <AvField
                  id="invoice-design-template-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="nameLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.name" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="invoice-design-template-description">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.description">Description</Translate>
                </Label>
                <AvInput id="invoice-design-template-description" type="textarea" name="description" />
                <UncontrolledTooltip target="descriptionLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.description" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imageLabel" for="image">
                    <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.image">Image</Translate>
                  </Label>
                  <br />
                  {image ? (
                    <div>
                      {imageContentType ? (
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imageContentType}, {byteSize(image)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('image')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_image" type="file" onChange={onBlobChange(true, 'image')} accept="image/*" />
                  <AvInput type="hidden" name="image" value={image} />
                </AvGroup>

                <UncontrolledTooltip target="imageLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.image" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="jrxmlTemplateFileLabel" for="jrxmlTemplateFile">
                    <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.jrxmlTemplateFile">Jrxml Template File</Translate>
                  </Label>
                  <br />
                  {jrxmlTemplateFile ? (
                    <div>
                      {jrxmlTemplateFileContentType ? (
                        <a onClick={openFile(jrxmlTemplateFileContentType, jrxmlTemplateFile)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {jrxmlTemplateFileContentType}, {byteSize(jrxmlTemplateFile)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('jrxmlTemplateFile')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_jrxmlTemplateFile" type="file" onChange={onBlobChange(false, 'jrxmlTemplateFile')} />
                  <AvInput
                    type="hidden"
                    name="jrxmlTemplateFile"
                    value={jrxmlTemplateFile}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>

                <UncontrolledTooltip target="jrxmlTemplateFileLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.jrxmlTemplateFile" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-design-template-createdDate">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="invoice-design-template-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceDesignTemplateEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.createdDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="updatedDateLabel" for="invoice-design-template-updatedDate">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.updatedDate">Updated Date</Translate>
                </Label>
                <AvInput
                  id="invoice-design-template-updatedDate"
                  type="datetime-local"
                  className="form-control"
                  name="updatedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceDesignTemplateEntity.updatedDate)}
                />
                <UncontrolledTooltip target="updatedDateLabel">
                  <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.updatedDate" />
                </UncontrolledTooltip>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invoice-design-template" replace color="info">
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
  invoiceDesignTemplateEntity: storeState.invoiceDesignTemplate.entity,
  loading: storeState.invoiceDesignTemplate.loading,
  updating: storeState.invoiceDesignTemplate.updating,
  updateSuccess: storeState.invoiceDesignTemplate.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignTemplateUpdate);
