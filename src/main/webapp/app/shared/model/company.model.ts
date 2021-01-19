import { Moment } from 'moment';
import { IInvoiceDesignSettings } from 'app/shared/model/invoice-design-settings.model';
import { IUserAccount } from 'app/shared/model/user-account.model';

export interface ICompany {
  id?: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  registrationNumber?: string;
  vatNumber?: string;
  registeredMark?: string;
  supplementaryText?: any;
  bankAccountNumber?: string;
  iban?: string;
  email?: string;
  telephone?: string;
  webUrl?: string;
  createdDate?: string;
  updatedDate?: string;
  invoiceDesignSettings?: IInvoiceDesignSettings;
  userAccounts?: IUserAccount[];
}

export const defaultValue: Readonly<ICompany> = {};
