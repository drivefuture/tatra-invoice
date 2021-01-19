import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyDetail = (props: ICompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="tatraInvoiceApp.company.name">Name</Translate>
            </span>
            <UncontrolledTooltip target="name">
              <Translate contentKey="tatraInvoiceApp.company.help.name" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.name}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="tatraInvoiceApp.company.firstName">First Name</Translate>
            </span>
            <UncontrolledTooltip target="firstName">
              <Translate contentKey="tatraInvoiceApp.company.help.firstName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="tatraInvoiceApp.company.lastName">Last Name</Translate>
            </span>
            <UncontrolledTooltip target="lastName">
              <Translate contentKey="tatraInvoiceApp.company.help.lastName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.lastName}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="tatraInvoiceApp.company.street">Street</Translate>
            </span>
            <UncontrolledTooltip target="street">
              <Translate contentKey="tatraInvoiceApp.company.help.street" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.street}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="tatraInvoiceApp.company.city">City</Translate>
            </span>
            <UncontrolledTooltip target="city">
              <Translate contentKey="tatraInvoiceApp.company.help.city" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.city}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="tatraInvoiceApp.company.postalCode">Postal Code</Translate>
            </span>
            <UncontrolledTooltip target="postalCode">
              <Translate contentKey="tatraInvoiceApp.company.help.postalCode" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.postalCode}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="tatraInvoiceApp.company.country">Country</Translate>
            </span>
            <UncontrolledTooltip target="country">
              <Translate contentKey="tatraInvoiceApp.company.help.country" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.country}</dd>
          <dt>
            <span id="registrationNumber">
              <Translate contentKey="tatraInvoiceApp.company.registrationNumber">Registration Number</Translate>
            </span>
            <UncontrolledTooltip target="registrationNumber">
              <Translate contentKey="tatraInvoiceApp.company.help.registrationNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.registrationNumber}</dd>
          <dt>
            <span id="vatNumber">
              <Translate contentKey="tatraInvoiceApp.company.vatNumber">Vat Number</Translate>
            </span>
            <UncontrolledTooltip target="vatNumber">
              <Translate contentKey="tatraInvoiceApp.company.help.vatNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.vatNumber}</dd>
          <dt>
            <span id="registeredMark">
              <Translate contentKey="tatraInvoiceApp.company.registeredMark">Registered Mark</Translate>
            </span>
            <UncontrolledTooltip target="registeredMark">
              <Translate contentKey="tatraInvoiceApp.company.help.registeredMark" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.registeredMark}</dd>
          <dt>
            <span id="supplementaryText">
              <Translate contentKey="tatraInvoiceApp.company.supplementaryText">Supplementary Text</Translate>
            </span>
            <UncontrolledTooltip target="supplementaryText">
              <Translate contentKey="tatraInvoiceApp.company.help.supplementaryText" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.supplementaryText}</dd>
          <dt>
            <span id="bankAccountNumber">
              <Translate contentKey="tatraInvoiceApp.company.bankAccountNumber">Bank Account Number</Translate>
            </span>
            <UncontrolledTooltip target="bankAccountNumber">
              <Translate contentKey="tatraInvoiceApp.company.help.bankAccountNumber" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.bankAccountNumber}</dd>
          <dt>
            <span id="iban">
              <Translate contentKey="tatraInvoiceApp.company.iban">Iban</Translate>
            </span>
            <UncontrolledTooltip target="iban">
              <Translate contentKey="tatraInvoiceApp.company.help.iban" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.iban}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="tatraInvoiceApp.company.email">Email</Translate>
            </span>
            <UncontrolledTooltip target="email">
              <Translate contentKey="tatraInvoiceApp.company.help.email" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.email}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="tatraInvoiceApp.company.telephone">Telephone</Translate>
            </span>
            <UncontrolledTooltip target="telephone">
              <Translate contentKey="tatraInvoiceApp.company.help.telephone" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.telephone}</dd>
          <dt>
            <span id="webUrl">
              <Translate contentKey="tatraInvoiceApp.company.webUrl">Web Url</Translate>
            </span>
            <UncontrolledTooltip target="webUrl">
              <Translate contentKey="tatraInvoiceApp.company.help.webUrl" />
            </UncontrolledTooltip>
          </dt>
          <dd>{companyEntity.webUrl}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="tatraInvoiceApp.company.createdDate">Created Date</Translate>
            </span>
            <UncontrolledTooltip target="createdDate">
              <Translate contentKey="tatraInvoiceApp.company.help.createdDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {companyEntity.createdDate ? <TextFormat value={companyEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedDate">
              <Translate contentKey="tatraInvoiceApp.company.updatedDate">Updated Date</Translate>
            </span>
            <UncontrolledTooltip target="updatedDate">
              <Translate contentKey="tatraInvoiceApp.company.help.updatedDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {companyEntity.updatedDate ? <TextFormat value={companyEntity.updatedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.company.invoiceDesignSettings">Invoice Design Settings</Translate>
          </dt>
          <dd>{companyEntity.invoiceDesignSettings ? companyEntity.invoiceDesignSettings.id : ''}</dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.company.userAccount">User Account</Translate>
          </dt>
          <dd>
            {companyEntity.userAccounts
              ? companyEntity.userAccounts.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {companyEntity.userAccounts && i === companyEntity.userAccounts.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.company.userAccount">User Account</Translate>
          </dt>
          <dd>{companyEntity.userAccount ? companyEntity.userAccount.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/company" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company/${companyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
