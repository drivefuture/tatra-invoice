package cz.drivefuture.tatrainvoice.web.rest.errors;

public class CompanyNotExistsException extends BadRequestAlertException {
    private static final long serialVersionUID = 1L;

    public CompanyNotExistsException() {
        super(ErrorConstants.COMPANY_NOT_EXISTS, "Company id not exists!", "userManagement", "companynotexists");
    }
}
