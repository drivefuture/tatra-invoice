import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerDeliveryData, defaultValue } from 'app/shared/model/customer-delivery-data.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMERDELIVERYDATA_LIST: 'customerDeliveryData/FETCH_CUSTOMERDELIVERYDATA_LIST',
  FETCH_CUSTOMERDELIVERYDATA: 'customerDeliveryData/FETCH_CUSTOMERDELIVERYDATA',
  CREATE_CUSTOMERDELIVERYDATA: 'customerDeliveryData/CREATE_CUSTOMERDELIVERYDATA',
  UPDATE_CUSTOMERDELIVERYDATA: 'customerDeliveryData/UPDATE_CUSTOMERDELIVERYDATA',
  DELETE_CUSTOMERDELIVERYDATA: 'customerDeliveryData/DELETE_CUSTOMERDELIVERYDATA',
  RESET: 'customerDeliveryData/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomerDeliveryData>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CustomerDeliveryDataState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerDeliveryDataState = initialState, action): CustomerDeliveryDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERDELIVERYDATA):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERDELIVERYDATA):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERDELIVERYDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERDELIVERYDATA):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERDELIVERYDATA):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERDELIVERYDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERDELIVERYDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERDELIVERYDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERDELIVERYDATA):
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

const apiUrl = 'api/customer-delivery-data';

// Actions

export const getEntities: ICrudGetAllAction<ICustomerDeliveryData> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA_LIST,
  payload: axios.get<ICustomerDeliveryData>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICustomerDeliveryData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERDELIVERYDATA,
    payload: axios.get<ICustomerDeliveryData>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICustomerDeliveryData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERDELIVERYDATA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerDeliveryData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERDELIVERYDATA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomerDeliveryData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERDELIVERYDATA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
