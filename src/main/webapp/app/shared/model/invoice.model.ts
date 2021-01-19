import { Moment } from 'moment';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { ICompany } from 'app/shared/model/company.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IInvoice {
  id?: number;
  number?: string;
  issueDate?: string;
  paymentMethod?: PaymentMethod;
  duePeriod?: number;
  dueDate?: string;
  paymentDate?: string;
  taxPoint?: string;
  totalAmount?: number;
  currency?: string;
  variableSymbol?: string;
  constantSymbol?: string;
  specialSymbol?: string;
  orderNumber?: string;
  language?: Language;
  comment?: any;
  beforeInvoiceItemsText?: any;
  invoiceFooterText?: any;
  pdfFileContentType?: string;
  pdfFile?: any;
  createdDate?: string;
  updatedDate?: string;
  items?: IInvoiceItem[];
  company?: ICompany;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IInvoice> = {};
