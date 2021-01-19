import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDetail = (props: IInvoiceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.invoice.detail.title">Invoice</Translate> [<b>{invoiceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="tatraInvoiceApp.invoice.number">Number</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.number}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="tatraInvoiceApp.invoice.issueDate">Issue Date</Translate>
            </span>
            <UncontrolledTooltip target="issueDate">
              <Translate contentKey="tatraInvoiceApp.invoice.help.issueDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.issueDate ? <TextFormat value={invoiceEntity.issueDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="paymentMethod">
              <Translate contentKey="tatraInvoiceApp.invoice.paymentMethod">Payment Method</Translate>
            </span>
            <UncontrolledTooltip target="paymentMethod">
              <Translate contentKey="tatraInvoiceApp.invoice.help.paymentMethod" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.paymentMethod}</dd>
          <dt>
            <span id="duePeriod">
              <Translate contentKey="tatraInvoiceApp.invoice.duePeriod">Due Period</Translate>
            </span>
            <UncontrolledTooltip target="duePeriod">
              <Translate contentKey="tatraInvoiceApp.invoice.help.duePeriod" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.duePeriod}</dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="tatraInvoiceApp.invoice.dueDate">Due Date</Translate>
            </span>
            <UncontrolledTooltip target="dueDate">
              <Translate contentKey="tatraInvoiceApp.invoice.help.dueDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.dueDate ? <TextFormat value={invoiceEntity.dueDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="paymentDate">
              <Translate contentKey="tatraInvoiceApp.invoice.paymentDate">Payment Date</Translate>
            </span>
            <UncontrolledTooltip target="paymentDate">
              <Translate contentKey="tatraInvoiceApp.invoice.help.paymentDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceEntity.paymentDate ? <TextFormat value={invoiceEntity.paymentDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="taxPoint">
              <Translate contentKey="tatraInvoiceApp.invoice.taxPoint">Tax Point</Translate>
            </span>
            <UncontrolledTooltip target="taxPoint">
              <Translate contentKey="tatraInvoiceApp.invoice.help.taxPoint" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.taxPoint ? <TextFormat value={invoiceEntity.taxPoint} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="totalAmount">
              <Translate contentKey="tatraInvoiceApp.invoice.totalAmount">Total Amount</Translate>
            </span>
            <UncontrolledTooltip target="totalAmount">
              <Translate contentKey="tatraInvoiceApp.invoice.help.totalAmount" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.totalAmount}</dd>
          <dt>
            <span id="currency">
              <Translate contentKey="tatraInvoiceApp.invoice.currency">Currency</Translate>
            </span>
            <UncontrolledTooltip target="currency">
              <Translate contentKey="tatraInvoiceApp.invoice.help.currency" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.currency}</dd>
          <dt>
            <span id="variableSymbol">
              <Translate contentKey="tatraInvoiceApp.invoice.variableSymbol">Variable Symbol</Translate>
            </span>
            <UncontrolledTooltip target="variableSymbol">
              <Translate contentKey="tatraInvoiceApp.invoice.help.variableSymbol" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.variableSymbol}</dd>
          <dt>
            <span id="constantSymbol">
              <Translate contentKey="tatraInvoiceApp.invoice.constantSymbol">Constant Symbol</Translate>
            </span>
            <UncontrolledTooltip target="constantSymbol">
              <Translate contentKey="tatraInvoiceApp.invoice.help.constantSymbol" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.constantSymbol}</dd>
          <dt>
            <span id="specialSymbol">
              <Translate contentKey="tatraInvoiceApp.invoice.specialSymbol">Special Symbol</Translate>
            </span>
            <UncontrolledTooltip target="specialSymbol">
              <Translate contentKey="tatraInvoiceApp.invoice.help.specialSymbol" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.specialSymbol}</dd>
          <dt>
            <span id="orderNumber">
              <Translate contentKey="tatraInvoiceApp.invoice.orderNumber">Order Number</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.orderNumber}</dd>
          <dt>
            <span id="language">
              <Translate contentKey="tatraInvoiceApp.invoice.language">Language</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.language}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="tatraInvoiceApp.invoice.comment">Comment</Translate>
            </span>
            <UncontrolledTooltip target="comment">
              <Translate contentKey="tatraInvoiceApp.invoice.help.comment" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.comment}</dd>
          <dt>
            <span id="beforeInvoiceItemsText">
              <Translate contentKey="tatraInvoiceApp.invoice.beforeInvoiceItemsText">Before Invoice Items Text</Translate>
            </span>
            <UncontrolledTooltip target="beforeInvoiceItemsText">
              <Translate contentKey="tatraInvoiceApp.invoice.help.beforeInvoiceItemsText" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.beforeInvoiceItemsText}</dd>
          <dt>
            <span id="invoiceFooterText">
              <Translate contentKey="tatraInvoiceApp.invoice.invoiceFooterText">Invoice Footer Text</Translate>
            </span>
            <UncontrolledTooltip target="invoiceFooterText">
              <Translate contentKey="tatraInvoiceApp.invoice.help.invoiceFooterText" />
            </UncontrolledTooltip>
          </dt>
          <dd>{invoiceEntity.invoiceFooterText}</dd>
          <dt>
            <span id="pdfFile">
              <Translate contentKey="tatraInvoiceApp.invoice.pdfFile">Pdf File</Translate>
            </span>
            <UncontrolledTooltip target="pdfFile">
              <Translate contentKey="tatraInvoiceApp.invoice.help.pdfFile" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceEntity.pdfFile ? (
              <div>
                {invoiceEntity.pdfFileContentType ? (
                  <a onClick={openFile(invoiceEntity.pdfFileContentType, invoiceEntity.pdfFile)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {invoiceEntity.pdfFileContentType}, {byteSize(invoiceEntity.pdfFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.invoice.createdDate">Created Date</Translate>
            </span>
            <UncontrolledTooltip target="createdDate">
              <Translate contentKey="tatraInvoiceApp.invoice.help.createdDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceEntity.createdDate ? <TextFormat value={invoiceEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.invoice.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.invoice.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {invoiceEntity.updatedDate ? <TextFormat value={invoiceEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.invoice.company">Company</Translate>
          </dt>
          <dd>{invoiceEntity.company ? invoiceEntity.company.id : ''}</dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.invoice.customer">Customer</Translate>
          </dt>
          <dd>{invoiceEntity.customer ? invoiceEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceEntity: invoice.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
