import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="email">
              <Translate contentKey="tatraInvoiceApp.customer.email">Email</Translate>
            </span>
            <UncontrolledTooltip target="email">
              <Translate contentKey="tatraInvoiceApp.customer.help.email" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.email}</dd>
          <dt>
            <span id="emailCopy">
              <Translate contentKey="tatraInvoiceApp.customer.emailCopy">Email Copy</Translate>
            </span>
            <UncontrolledTooltip target="emailCopy">
              <Translate contentKey="tatraInvoiceApp.customer.help.emailCopy" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.emailCopy}</dd>
          <dt>
            <span id="emailBlindCopy">
              <Translate contentKey="tatraInvoiceApp.customer.emailBlindCopy">Email Blind Copy</Translate>
            </span>
            <UncontrolledTooltip target="emailBlindCopy">
              <Translate contentKey="tatraInvoiceApp.customer.help.emailBlindCopy" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.emailBlindCopy}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="tatraInvoiceApp.customer.telephone">Telephone</Translate>
            </span>
            <UncontrolledTooltip target="telephone">
              <Translate contentKey="tatraInvoiceApp.customer.help.telephone" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.telephone}</dd>
          <dt>
            <span id="invoiceDuePeriod">
              <Translate contentKey="tatraInvoiceApp.customer.invoiceDuePeriod">Invoice Due Period</Translate>
            </span>
            <UncontrolledTooltip target="invoiceDuePeriod">
              <Translate contentKey="tatraInvoiceApp.customer.help.invoiceDuePeriod" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.invoiceDuePeriod}</dd>
          <dt>
            <span id="invoiceLanguage">
              <Translate contentKey="tatraInvoiceApp.customer.invoiceLanguage">Invoice Language</Translate>
            </span>
            <UncontrolledTooltip target="invoiceLanguage">
              <Translate contentKey="tatraInvoiceApp.customer.help.invoiceLanguage" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.invoiceLanguage}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="tatraInvoiceApp.customer.comment">Comment</Translate>
            </span>
            <UncontrolledTooltip target="comment">
              <Translate contentKey="tatraInvoiceApp.customer.help.comment" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.comment}</dd>
          <dt>
            <span id="supplementaryText">
              <Translate contentKey="tatraInvoiceApp.customer.supplementaryText">Supplementary Text</Translate>
            </span>
            <UncontrolledTooltip target="supplementaryText">
              <Translate contentKey="tatraInvoiceApp.customer.help.supplementaryText" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.supplementaryText}</dd>
          <dt>
            <span id="beforeInvoiceItemsText">
              <Translate contentKey="tatraInvoiceApp.customer.beforeInvoiceItemsText">Before Invoice Items Text</Translate>
            </span>
            <UncontrolledTooltip target="beforeInvoiceItemsText">
              <Translate contentKey="tatraInvoiceApp.customer.help.beforeInvoiceItemsText" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.beforeInvoiceItemsText}</dd>
          <dt>
            <span id="invoiceFooterText">
              <Translate contentKey="tatraInvoiceApp.customer.invoiceFooterText">Invoice Footer Text</Translate>
            </span>
            <UncontrolledTooltip target="invoiceFooterText">
              <Translate contentKey="tatraInvoiceApp.customer.help.invoiceFooterText" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.invoiceFooterText}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.customer.createdDate">Created Date</Translate>
            </span>
            <UncontrolledTooltip target="createdDate">
              <Translate contentKey="tatraInvoiceApp.customer.help.createdDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {customerEntity.createdDate ? <TextFormat value={customerEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.customer.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.customer.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {customerEntity.updatedDate ? <TextFormat value={customerEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.customer.customerInvoiceData">Customer Invoice Data</Translate>
          </dt>
          <dd>{customerEntity.customerInvoiceData ? customerEntity.customerInvoiceData.ownName : ''}</dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.customer.deliveryData">Delivery Data</Translate>
          </dt>
          <dd>{customerEntity.deliveryData ? customerEntity.deliveryData.companyName : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
