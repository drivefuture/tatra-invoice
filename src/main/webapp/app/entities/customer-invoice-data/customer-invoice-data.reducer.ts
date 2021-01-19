import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerInvoiceData, defaultValue } from 'app/shared/model/customer-invoice-data.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMERINVOICEDATA_LIST: 'customerInvoiceData/FETCH_CUSTOMERINVOICEDATA_LIST',
  FETCH_CUSTOMERINVOICEDATA: 'customerInvoiceData/FETCH_CUSTOMERINVOICEDATA',
  CREATE_CUSTOMERINVOICEDATA: 'customerInvoiceData/CREATE_CUSTOMERINVOICEDATA',
  UPDATE_CUSTOMERINVOICEDATA: 'customerInvoiceData/UPDATE_CUSTOMERINVOICEDATA',
  DELETE_CUSTOMERINVOICEDATA: 'customerInvoiceData/DELETE_CUSTOMERINVOICEDATA',
  RESET: 'customerInvoiceData/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomerInvoiceData>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CustomerInvoiceDataState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerInvoiceDataState = initialState, action): CustomerInvoiceDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERINVOICEDATA):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERINVOICEDATA):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERINVOICEDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERINVOICEDATA):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERINVOICEDATA):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERINVOICEDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERINVOICEDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERINVOICEDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERINVOICEDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/customer-invoice-data';

// Actions

export const getEntities: ICrudGetAllAction<ICustomerInvoiceData> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA_LIST,
  payload: axios.get<ICustomerInvoiceData>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICustomerInvoiceData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERINVOICEDATA,
    payload: axios.get<ICustomerInvoiceData>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICustomerInvoiceData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERINVOICEDATA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerInvoiceData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERINVOICEDATA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomerInvoiceData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERINVOICEDATA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
