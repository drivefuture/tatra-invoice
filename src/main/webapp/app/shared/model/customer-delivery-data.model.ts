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
}

export const defaultValue: Readonly<ICustomerDeliveryData> = {};
