package cz.drivefuture.tatrainvoice.service.dto;

import cz.drivefuture.tatrainvoice.domain.UserAccount;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user account extending built in user.
 */
public class UserAccountDTO extends UserDTO {
    private String plan;
    private CompanyDTO currentCompany;
    private Set<CompanyDTO> companies;

    public UserAccountDTO() {
        super();
        // Empty constructor needed for Jackson.
    }

    public UserAccountDTO(UserAccount userAccount) {
        super(userAccount.getUser());
        this.plan = userAccount.getPlan().name();
        this.currentCompany = new CompanyDTO(userAccount.getCurrentCompany());
        this.companies = userAccount.getCompanies().stream().map(CompanyDTO::new).collect(Collectors.toSet());
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public CompanyDTO getCurrentCompany() {
        return currentCompany;
    }

    public void setCurrentCompany(CompanyDTO currentCompany) {
        this.currentCompany = currentCompany;
    }

    public Set<CompanyDTO> getCompanies() {
        return companies;
    }

    public void setCompanies(Set<CompanyDTO> companies) {
        this.companies = companies;
    }

    // prettier-ignore
	@Override
	public String toString() {
		return "UserAccountDTO{" + "plan='" + plan + '\'' + ", currentCompany='" + currentCompany + '\'' + ", user='"
				+ this.getLastName() + '\'' + ", email='" + this.getEmail() + '\'' + ", imageUrl='" + this.getImageUrl()
				+ '\'' + ", activated=" + this.isActivated() + ", langKey='" + this.getLangKey() + '\'' + ", createdBy="
				+ this.getCreatedBy() + ", createdDate=" + this.getCreatedDate() + ", lastModifiedBy='"
				+ this.getLastModifiedBy() + '\'' + ", lastModifiedDate=" + this.getLastModifiedDate()
				+ ", authorities=" + this.getAuthorities() + ", companies=" + companies + "}";
	}
}
