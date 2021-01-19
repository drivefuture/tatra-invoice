import { Moment } from 'moment';
import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';

export interface IInvoiceDesignSettings {
  id?: number;
  logoContentType?: string;
  logo?: any;
  signatureAndStampContentType?: string;
  signatureAndStamp?: any;
  createdDate?: string;
  updatedDate?: string;
  template?: IInvoiceDesignTemplate;
}

export const defaultValue: Readonly<IInvoiceDesignSettings> = {};
