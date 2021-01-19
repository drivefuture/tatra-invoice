import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IInvoiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Invoice = (props: IInvoiceProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [sorting, setSorting] = useState(false);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const resetAll = () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      resetAll();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
    setSorting(true);
  };

  const { invoiceList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-heading">
        <Translate contentKey="tatraInvoiceApp.invoice.home.title">Invoices</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.invoice.home.createLabel">Create new Invoice</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          pageStart={paginationState.activePage}
          loadMore={handleLoadMore}
          hasMore={paginationState.activePage - 1 < props.links.next}
          loader={<div className="loader">Loading ...</div>}
          threshold={0}
          initialLoad={false}
        >
          {invoiceList && invoiceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('number')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.number">Number</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('issueDate')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.issueDate">Issue Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('paymentMethod')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.paymentMethod">Payment Method</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('duePeriod')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.duePeriod">Due Period</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dueDate')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.dueDate">Due Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('paymentDate')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.paymentDate">Payment Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('taxPoint')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.taxPoint">Tax Point</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('totalAmount')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.totalAmount">Total Amount</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('currency')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.currency">Currency</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('variableSymbol')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.variableSymbol">Variable Symbol</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('constantSymbol')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.constantSymbol">Constant Symbol</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('specialSymbol')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.specialSymbol">Special Symbol</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('orderNumber')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.orderNumber">Order Number</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('language')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.language">Language</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('comment')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.comment">Comment</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('beforeInvoiceItemsText')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.beforeInvoiceItemsText">Before Invoice Items Text</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('invoiceFooterText')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.invoiceFooterText">Invoice Footer Text</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('pdfFile')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.pdfFile">Pdf File</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('createdDate')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.createdDate">Created Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('updatedDate')}>
                    <Translate contentKey="tatraInvoiceApp.invoice.updatedDate">Updated Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="tatraInvoiceApp.invoice.company">Company</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="tatraInvoiceApp.invoice.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoiceList.map((invoice, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${invoice.id}`} color="link" size="sm">
                        {invoice.id}
                      </Button>
                    </td>
                    <td>{invoice.number}</td>
                    <td>{invoice.issueDate ? <TextFormat type="date" value={invoice.issueDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>
                      <Translate contentKey={`tatraInvoiceApp.PaymentMethod.${invoice.paymentMethod}`} />
                    </td>
                    <td>{invoice.duePeriod}</td>
                    <td>{invoice.dueDate ? <TextFormat type="date" value={invoice.dueDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{invoice.paymentDate ? <TextFormat type="date" value={invoice.paymentDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{invoice.taxPoint ? <TextFormat type="date" value={invoice.taxPoint} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{invoice.totalAmount}</td>
                    <td>{invoice.currency}</td>
                    <td>{invoice.variableSymbol}</td>
                    <td>{invoice.constantSymbol}</td>
                    <td>{invoice.specialSymbol}</td>
                    <td>{invoice.orderNumber}</td>
                    <td>
                      <Translate contentKey={`tatraInvoiceApp.Language.${invoice.language}`} />
                    </td>
                    <td>{invoice.comment}</td>
                    <td>{invoice.beforeInvoiceItemsText}</td>
                    <td>{invoice.invoiceFooterText}</td>
                    <td>
                      {invoice.pdfFile ? (
                        <div>
                          {invoice.pdfFileContentType ? (
                            <a onClick={openFile(invoice.pdfFileContentType, invoice.pdfFile)}>
                              <Translate contentKey="entity.action.open">Open</Translate>
                              &nbsp;
                            </a>
                          ) : null}
                          <span>
                            {invoice.pdfFileContentType}, {byteSize(invoice.pdfFile)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{invoice.createdDate ? <TextFormat type="date" value={invoice.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{invoice.updatedDate ? <TextFormat type="date" value={invoice.updatedDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{invoice.company ? <Link to={`company/${invoice.company.id}`}>{invoice.company.id}</Link> : ''}</td>
                    <td>{invoice.customer ? <Link to={`customer/${invoice.customer.id}`}>{invoice.customer.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${invoice.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${invoice.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${invoice.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="tatraInvoiceApp.invoice.home.notFound">No Invoices found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceList: invoice.entities,
  loading: invoice.loading,
  totalItems: invoice.totalItems,
  links: invoice.links,
  entity: invoice.entity,
  updateSuccess: invoice.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
