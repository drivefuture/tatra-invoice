import { Moment } from 'moment';

export interface ICustomerInvoiceData {
  id?: number;
  companyName?: string;
  ownName?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  registrationNumber?: string;
  vatNumber?: string;
  bankAccountNumber?: string;
  iban?: string;
  webUrl?: string;
  createdDate?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<ICustomerInvoiceData> = {};
