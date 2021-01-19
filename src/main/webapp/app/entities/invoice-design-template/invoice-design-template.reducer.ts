import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInvoiceDesignTemplate, defaultValue } from 'app/shared/model/invoice-design-template.model';

export const ACTION_TYPES = {
  FETCH_INVOICEDESIGNTEMPLATE_LIST: 'invoiceDesignTemplate/FETCH_INVOICEDESIGNTEMPLATE_LIST',
  FETCH_INVOICEDESIGNTEMPLATE: 'invoiceDesignTemplate/FETCH_INVOICEDESIGNTEMPLATE',
  CREATE_INVOICEDESIGNTEMPLATE: 'invoiceDesignTemplate/CREATE_INVOICEDESIGNTEMPLATE',
  UPDATE_INVOICEDESIGNTEMPLATE: 'invoiceDesignTemplate/UPDATE_INVOICEDESIGNTEMPLATE',
  DELETE_INVOICEDESIGNTEMPLATE: 'invoiceDesignTemplate/DELETE_INVOICEDESIGNTEMPLATE',
  SET_BLOB: 'invoiceDesignTemplate/SET_BLOB',
  RESET: 'invoiceDesignTemplate/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInvoiceDesignTemplate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type InvoiceDesignTemplateState = Readonly<typeof initialState>;

// Reducer

export default (state: InvoiceDesignTemplateState = initialState, action): InvoiceDesignTemplateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INVOICEDESIGNTEMPLATE):
    case REQUEST(ACTION_TYPES.UPDATE_INVOICEDESIGNTEMPLATE):
    case REQUEST(ACTION_TYPES.DELETE_INVOICEDESIGNTEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE):
    case FAILURE(ACTION_TYPES.CREATE_INVOICEDESIGNTEMPLATE):
    case FAILURE(ACTION_TYPES.UPDATE_INVOICEDESIGNTEMPLATE):
    case FAILURE(ACTION_TYPES.DELETE_INVOICEDESIGNTEMPLATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVOICEDESIGNTEMPLATE):
    case SUCCESS(ACTION_TYPES.UPDATE_INVOICEDESIGNTEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVOICEDESIGNTEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/invoice-design-templates';

// Actions

export const getEntities: ICrudGetAllAction<IInvoiceDesignTemplate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE_LIST,
  payload: axios.get<IInvoiceDesignTemplate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IInvoiceDesignTemplate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVOICEDESIGNTEMPLATE,
    payload: axios.get<IInvoiceDesignTemplate>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IInvoiceDesignTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVOICEDESIGNTEMPLATE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInvoiceDesignTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVOICEDESIGNTEMPLATE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInvoiceDesignTemplate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVOICEDESIGNTEMPLATE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
