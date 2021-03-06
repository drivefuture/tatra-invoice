import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICustomerDeliveryData } from 'app/shared/model/customer-delivery-data.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './customer-delivery-data.reducer';

export interface ICustomerDeliveryDataDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDeliveryDataDeleteDialog = (props: ICustomerDeliveryDataDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/customer-delivery-data');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.customerDeliveryDataEntity.id);
  };

  const { customerDeliveryDataEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="tatraInvoiceApp.customerDeliveryData.delete.question">
        <Translate contentKey="tatraInvoiceApp.customerDeliveryData.delete.question" interpolate={{ id: customerDeliveryDataEntity.id }}>
          Are you sure you want to delete this CustomerDeliveryData?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-customerDeliveryData" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ customerDeliveryData }: IRootState) => ({
  customerDeliveryDataEntity: customerDeliveryData.entity,
  updateSuccess: customerDeliveryData.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDeliveryDataDeleteDialog);
