import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceItemDetail = (props: IInvoiceItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.invoiceItem.detail.title">InvoiceItem</Translate> [<b>{invoiceItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sequence">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.sequence">Sequence</Translate>
            </span>
          </dt>
          <dd>{invoiceItemEntity.sequence}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.quantity">Quantity</Translate>
            </span>
            <UncontrolledTooltip target="quantity">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.help.quantity" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceItemEntity.quantity}</dd>
          <dt>
            <span id="measureUnit">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.measureUnit">Measure Unit</Translate>
            </span>
            <UncontrolledTooltip target="measureUnit">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.help.measureUnit" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceItemEntity.measureUnit}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.description">Description</Translate>
            </span>
            <UncontrolledTooltip target="description">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.help.description" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceItemEntity.description}</dd>
          <dt>
            <span id="measureUnitPrice">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.measureUnitPrice">Measure Unit Price</Translate>
            </span>
            <UncontrolledTooltip target="measureUnitPrice">
              <Translate contentKey="tatraInvoiceApp.invoiceItem.help.measureUnitPrice" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceItemEntity.measureUnitPrice}</dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.invoiceItem.invoice">Invoice</Translate>
          </dt>
          <dd>{invoiceItemEntity.invoice ? invoiceItemEntity.invoice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice-item/${invoiceItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoiceItem }: IRootState) => ({
  invoiceItemEntity: invoiceItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItemDetail);
