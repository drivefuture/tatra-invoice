import { IUser } from 'app/shared/model/user.model';
import { ICompany } from 'app/shared/model/company.model';
import { Plan } from 'app/shared/model/enumerations/plan.model';

export interface IUserAccount {
  id?: number;
  plan?: Plan;
  user?: IUser;
  currentCompanies?: ICompany[];
  companies?: ICompany[];
}

export const defaultValue: Readonly<IUserAccount> = {};
