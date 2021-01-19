import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-design-settings.reducer';
import { IInvoiceDesignSettings } from 'app/shared/model/invoice-design-settings.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDesignSettingsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDesignSettingsDetail = (props: IInvoiceDesignSettingsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceDesignSettingsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.detail.title">InvoiceDesignSettings</Translate> [
          <b>{invoiceDesignSettingsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="logo">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.logo">Logo</Translate>
            </span>
            <UncontrolledTooltip target="logo">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.logo" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceDesignSettingsEntity.logo ? (
              <div>
                {invoiceDesignSettingsEntity.logoContentType ? (
                  <a onClick={openFile(invoiceDesignSettingsEntity.logoContentType, invoiceDesignSettingsEntity.logo)}>
                    <img
                      src={`data:${invoiceDesignSettingsEntity.logoContentType};base64,${invoiceDesignSettingsEntity.logo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {invoiceDesignSettingsEntity.logoContentType}, {byteSize(invoiceDesignSettingsEntity.logo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="signatureAndStamp">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.signatureAndStamp">Signature And Stamp</Translate>
            </span>
            <UncontrolledTooltip target="signatureAndStamp">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.signatureAndStamp" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceDesignSettingsEntity.signatureAndStamp ? (
              <div>
                {invoiceDesignSettingsEntity.signatureAndStampContentType ? (
                  <a
                    onClick={openFile(
                      invoiceDesignSettingsEntity.signatureAndStampContentType,
                      invoiceDesignSettingsEntity.signatureAndStamp
                    )}
                  >
                    <img
                      src={`data:${invoiceDesignSettingsEntity.signatureAndStampContentType};base64,${invoiceDesignSettingsEntity.signatureAndStamp}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {invoiceDesignSettingsEntity.signatureAndStampContentType}, {byteSize(invoiceDesignSettingsEntity.signatureAndStamp)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.createdDate">Created Date</Translate>
            </span>
            <UncontrolledTooltip target="createdDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.createdDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceDesignSettingsEntity.createdDate ? (
              <TextFormat value={invoiceDesignSettingsEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceDesignSettingsEntity.updatedDate ? (
              <TextFormat value={invoiceDesignSettingsEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.invoiceDesignSettings.template">Template</Translate>
          </dt>
          <dd>{invoiceDesignSettingsEntity.template ? invoiceDesignSettingsEntity.template.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice-design-settings" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice-design-settings/${invoiceDesignSettingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoiceDesignSettings }: IRootState) => ({
  invoiceDesignSettingsEntity: invoiceDesignSettings.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignSettingsDetail);
