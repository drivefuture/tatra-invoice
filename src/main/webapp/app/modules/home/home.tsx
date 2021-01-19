import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Row, Col, Table } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const companyList = account.companies;
  return (
    <Row>
      <Col md="12">
      {account && account.firstName && account.lastName ? (
        <div>
        <h2>
          <Translate contentKey="home.title" interpolate={{ accountFullName: account.firstName + " " + account.lastName }}>Welcome, {account.firstName + " " + account.lastName}!</Translate>
        </h2>
        <div>
      <h2 id="company-heading">
        <Translate contentKey="tatraInvoiceApp.company.home.title">Companies</Translate>
        <Link to={`company/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tatraInvoiceApp.company.home.createLabel">Create new Company</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {companyList && companyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand">
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand">
                  <Translate contentKey="tatraInvoiceApp.company.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
              </tr>
            </thead>
            <tbody>
              {companyList.map((company, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${"company"}/${company.id}`} color="link" size="sm">
                      {company.id}
                    </Button>
                  </td>
                  <td>{company.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
            <div className="alert alert-warning">
              <Translate contentKey="tatraInvoiceApp.company.home.notFound">No Companies found</Translate>
            </div>
        )}
      </div>
    </div>
        </div>
      ) : (
        <h2>
        <Translate contentKey="home.title" interpolate={{ accountFullName: "Java Hipster" }}>Welcome, Java Hipster!</Translate>
        </h2>
      )}
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
