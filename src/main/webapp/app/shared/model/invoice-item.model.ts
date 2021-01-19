import { IInvoice } from 'app/shared/model/invoice.model';

export interface IInvoiceItem {
  id?: number;
  sequence?: number;
  quantity?: number;
  measureUnit?: string;
  description?: string;
  measureUnitPrice?: number;
  invoice?: IInvoice;
}

export const defaultValue: Readonly<IInvoiceItem> = {};
