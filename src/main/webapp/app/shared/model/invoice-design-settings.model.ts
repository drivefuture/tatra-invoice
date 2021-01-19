import { IInvoiceDesignTemplate } from 'app/shared/model/invoice-design-template.model';

export interface IInvoiceDesignSettings {
  id?: number;
  logoContentType?: string;
  logo?: any;
  signatureAndStampContentType?: string;
  signatureAndStamp?: any;
  template?: IInvoiceDesignTemplate;
}

export const defaultValue: Readonly<IInvoiceDesignSettings> = {};
