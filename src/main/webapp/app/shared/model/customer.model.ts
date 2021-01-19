import { Moment } from 'moment';
import { ICustomerInvoiceData } from 'app/shared/model/customer-invoice-data.model';
import { ICustomerDeliveryData } from 'app/shared/model/customer-delivery-data.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ICustomer {
  id?: number;
  email?: string;
  emailCopy?: string;
  emailBlindCopy?: string;
  telephone?: string;
  invoiceDuePeriod?: number;
  invoiceLanguage?: Language;
  comment?: any;
  supplementaryText?: any;
  beforeInvoiceItemsText?: any;
  invoiceFooterText?: any;
  createdDate?: string;
  updatedDate?: string;
  customerInvoiceData?: ICustomerInvoiceData;
  deliveryData?: ICustomerDeliveryData;
}

export const defaultValue: Readonly<ICustomer> = {};
