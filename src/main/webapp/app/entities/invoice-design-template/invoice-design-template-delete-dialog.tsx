import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './invoice-design-template.reducer';

export interface IInvoiceDesignTemplateDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDesignTemplateDeleteDialog = (props: IInvoiceDesignTemplateDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/invoice-design-template');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.invoiceDesignTemplateEntity.id);
  };

  const { invoiceDesignTemplateEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="tatraInvoiceApp.invoiceDesignTemplate.delete.question">
        <Translate contentKey="tatraInvoiceApp.invoiceDesignTemplate.delete.question" interpolate={{ id: invoiceDesignTemplateEntity.id }}>
          Are you sure you want to delete this InvoiceDesignTemplate?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-invoiceDesignTemplate" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ invoiceDesignTemplate }: IRootState) => ({
  invoiceDesignTemplateEntity: invoiceDesignTemplate.entity,
  updateSuccess: invoiceDesignTemplate.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDesignTemplateDeleteDialog);
