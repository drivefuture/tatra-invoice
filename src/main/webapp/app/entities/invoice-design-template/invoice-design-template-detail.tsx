import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-design-template.reducer';
import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDesignTemplateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDesignTemplateDetail = (props: IInvoiceDesignTemplateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceDesignTemplateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.detail.title">InvoiceDesignTemplate</Translate> [
          <b>{invoiceDesignTemplateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.name">Name</Translate>
            </span>
          </dt>
          <dd>{invoiceDesignTemplateEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.description">Description</Translate>
            </span>
          </dt>
          <dd>{invoiceDesignTemplateEntity.description}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {invoiceDesignTemplateEntity.image ? (
              <div>
                {invoiceDesignTemplateEntity.imageContentType ? (
                  <a onClick={openFile(invoiceDesignTemplateEntity.imageContentType, invoiceDesignTemplateEntity.image)}>
                    <img
                      src={`data:${invoiceDesignTemplateEntity.imageContentType};base64,${invoiceDesignTemplateEntity.image}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {invoiceDesignTemplateEntity.imageContentType}, {byteSize(invoiceDesignTemplateEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="jrxmlTemplateFile">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.jrxmlTemplateFile">Jrxml Template File</Translate>
            </span>
          </dt>
          <dd>
            {invoiceDesignTemplateEntity.jrxmlTemplateFile ? (
              <div>
                {invoiceDesignTemplateEntity.jrxmlTemplateFileContentType ? (
                  <a
                    onClick={openFile(
                      invoiceDesignTemplateEntity.jrxmlTemplateFileContentType,
                      invoiceDesignTemplateEntity.jrxmlTemplateFile
                    )}
                  >
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {invoiceDesignTemplateEntity.jrxmlTemplateFileContentType}, {byteSize(invoiceDesignTemplateEntity.jrxmlTemplateFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {invoiceDesignTemplateEntity.createdDate ? (
              <TextFormat value={invoiceDesignTemplateEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceDesignTemplateEntity.updatedDate ? (
              <TextFormat value={invoiceDesignTemplateEntity.updatedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/invoice-design-template" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice-design-template/${invoiceDesignTemplateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoiceDesignTemplate }: IRootState) => ({
  invoiceDesignTemplateEntity: invoiceDesignTemplate.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignTemplateDetail);
