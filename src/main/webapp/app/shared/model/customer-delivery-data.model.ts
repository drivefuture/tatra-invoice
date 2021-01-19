import { Moment } from 'moment';

export interface ICustomerDeliveryData {
  id?: number;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  telephone?: string;
  createdDate?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<ICustomerDeliveryData> = {};
