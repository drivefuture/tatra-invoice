import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-account.reducer';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserAccountDetail = (props: IUserAccountDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userAccountEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tatraInvoiceApp.userAccount.detail.title">UserAccount</Translate> [<b>{userAccountEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="plan">
              <Translate contentKey="tatraInvoiceApp.userAccount.plan">Plan</Translate>
            </span>
            <UncontrolledTooltip target="plan">
              <Translate contentKey="tatraInvoiceApp.userAccount.help.plan" />
            </UncontrolledTooltip>
          </dt>
          <dd>{userAccountEntity.plan}</dd>
          <dt>
            <Translate contentKey="tatraInvoiceApp.userAccount.user">User</Translate>
          </dt>
          <dd>{userAccountEntity.user ? userAccountEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-account" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-account/${userAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userAccount }: IRootState) => ({
  userAccountEntity: userAccount.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountDetail);
