import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-account.reducer';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserAccountUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserAccountUpdate = (props: IUserAccountUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [currentCompanyId, setCurrentCompanyId] = useState('0');
  const [companyId, setCompanyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userAccountEntity, users, companies, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-account');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getCompanies();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userAccountEntity,
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
          <h2 id="tatraInvoiceApp.userAccount.home.createOrEditLabel">
            <Translate contentKey="tatraInvoiceApp.userAccount.home.createOrEditLabel">Create or edit a UserAccount</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userAccountEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-account-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-account-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="planLabel" for="user-account-plan">
                  <Translate contentKey="tatraInvoiceApp.userAccount.plan">Plan</Translate>
                </Label>
                <AvInput
                  id="user-account-plan"
                  type="select"
                  className="form-control"
                  name="plan"
                  value={(!isNew && userAccountEntity.plan) || 'BASIC'}
                >
                  <option value="BASIC">{translate('tatraInvoiceApp.Plan.BASIC')}</option>
                  <option value="PRO">{translate('tatraInvoiceApp.Plan.PRO')}</option>
                </AvInput>
                <UncontrolledTooltip target="planLabel">
                  <Translate contentKey="tatraInvoiceApp.userAccount.help.plan" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="user-account-user">
                  <Translate contentKey="tatraInvoiceApp.userAccount.user">User</Translate>
                </Label>
                <AvInput id="user-account-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="user-account-currentCompany">
                  <Translate contentKey="tatraInvoiceApp.userAccount.currentCompany">Current Company</Translate>
                </Label>
                <AvInput id="user-account-currentCompany" type="select" className="form-control" name="currentCompany.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-account" replace color="info">
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
  users: storeState.userManagement.users,
  companies: storeState.company.entities,
  userAccountEntity: storeState.userAccount.entity,
  loading: storeState.userAccount.loading,
  updating: storeState.userAccount.updating,
  updateSuccess: storeState.userAccount.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountUpdate);
