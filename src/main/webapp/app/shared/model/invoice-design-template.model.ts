import { Moment } from 'moment';

export interface IInvoiceDesignTemplate {
  id?: number;
  name?: string;
  description?: any;
  imageContentType?: string;
  image?: any;
  jrxmlTemplateFileContentType?: string;
  jrxmlTemplateFile?: any;
  createdDate?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<IInvoiceDesignTemplate> = {};
