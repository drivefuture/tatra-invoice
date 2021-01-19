import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice.reducer';
// prettier-ignore
import invoiceItem, {
  InvoiceItemState
} from 'app/entities/invoice-item/invoice-item.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import invoiceDesignSettings, {
  InvoiceDesignSettingsState
} from 'app/entities/invoice-design-settings/invoice-design-settings.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import customerInvoiceData, {
  CustomerInvoiceDataState
} from 'app/entities/customer-invoice-data/customer-invoice-data.reducer';
// prettier-ignore
import customerDeliveryData, {
  CustomerDeliveryDataState
} from 'app/entities/customer-delivery-data/customer-delivery-data.reducer';
// prettier-ignore
import invoiceDesignTemplate, {
  InvoiceDesignTemplateState
} from 'app/entities/invoice-design-template/invoice-design-template.reducer';
// prettier-ignore
import userAccount, {
  UserAccountState
} from 'app/entities/user-account/user-account.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly invoice: InvoiceState;
  readonly invoiceItem: InvoiceItemState;
  readonly company: CompanyState;
  readonly invoiceDesignSettings: InvoiceDesignSettingsState;
  readonly customer: CustomerState;
  readonly customerInvoiceData: CustomerInvoiceDataState;
  readonly customerDeliveryData: CustomerDeliveryDataState;
  readonly invoiceDesignTemplate: InvoiceDesignTemplateState;
  readonly userAccount: UserAccountState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  invoice,
  invoiceItem,
  company,
  invoiceDesignSettings,
  customer,
  customerInvoiceData,
  customerDeliveryData,
  invoiceDesignTemplate,
  userAccount,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
