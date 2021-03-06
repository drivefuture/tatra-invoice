package cz.drivefuture.tatrainvoice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import cz.drivefuture.tatrainvoice.domain.enumeration.Plan;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * UserAccount entity.\nUživatelský účet\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "UserAccount entity.\nUživatelský účet\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "user_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserAccount implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    /**
     * Plán
     */
    @NotNull
    @ApiModelProperty(value = "Plán", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "plan", nullable = false)
    private Plan plan;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    //@JsonIgnoreProperties(value = "userAccounts", allowSetters = true)
    private Company currentCompany;

    @ManyToMany(mappedBy = "userAccounts", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    //@JsonIgnore
    private Set<Company> companies = new HashSet<>();

    /*@ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "company_user_account",
               joinColumns = @JoinColumn(name = "user_account_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"))
    private Set<Company> companies = new HashSet<>();*/

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Plan getPlan() {
        return plan;
    }

    public UserAccount plan(Plan plan) {
        this.plan = plan;
        return this;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public User getUser() {
        return user;
    }

    public UserAccount user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Company getCurrentCompany() {
        return currentCompany;
    }

    public UserAccount currentCompany(Company company) {
        this.currentCompany = company;
        return this;
    }

    public void setCurrentCompany(Company company) {
        this.currentCompany = company;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public UserAccount companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public UserAccount addCompany(Company company) {
        this.companies.add(company);
        company.getUserAccounts().add(this);
        return this;
    }

    public UserAccount removeCompany(Company company) {
        this.companies.remove(company);
        company.getUserAccounts().remove(this);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAccount)) {
            return false;
        }
        return id != null && id.equals(((UserAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserAccount{" +
            "id=" + getId() +
            ", plan='" + getPlan() + "'" +
            "}";
    }
}
