package cz.drivefuture.tatrainvoice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * Company entity.\nSpolečnost\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "Company entity.\nSpolečnost\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Název společnosti
     */
    @ApiModelProperty(value = "Název společnosti")
    @Column(name = "name")
    private String name;

    /**
     * Jméno
     */
    @ApiModelProperty(value = "Jméno")
    @Column(name = "first_name")
    private String firstName;

    /**
     * Příjmení
     */
    @ApiModelProperty(value = "Příjmení")
    @Column(name = "last_name")
    private String lastName;

    /**
     * Ulice
     */
    @ApiModelProperty(value = "Ulice")
    @Column(name = "street")
    private String street;

    /**
     * Město
     */
    @ApiModelProperty(value = "Město")
    @Column(name = "city")
    private String city;

    /**
     * PSČ
     */
    @ApiModelProperty(value = "PSČ")
    @Column(name = "postal_code")
    private String postalCode;

    /**
     * Země
     */
    @ApiModelProperty(value = "Země")
    @Column(name = "country")
    private String country;

    /**
     * IČ
     */
    @ApiModelProperty(value = "IČ")
    @Column(name = "registration_number")
    private String registrationNumber;

    /**
     * DIČ
     */
    @ApiModelProperty(value = "DIČ")
    @Column(name = "vat_number")
    private String vatNumber;

    /**
     * Spisová značka
     */
    @ApiModelProperty(value = "Spisová značka")
    @Column(name = "registered_mark")
    private String registeredMark;

    /**
     * Doplňkový text
     */
    @ApiModelProperty(value = "Doplňkový text")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "supplementary_text")
    private String supplementaryText;

    /**
     * Číslo účtu
     */
    @ApiModelProperty(value = "Číslo účtu")
    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    /**
     * IBAN
     */
    @ApiModelProperty(value = "IBAN")
    @Column(name = "iban")
    private String iban;

    /**
     * E-mail
     */
    @NotNull
    @ApiModelProperty(value = "E-mail", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * Telefon
     */
    @ApiModelProperty(value = "Telefon")
    @Column(name = "telephone")
    private String telephone;

    /**
     * Url webu
     */
    @ApiModelProperty(value = "Url webu")
    @Column(name = "web_url")
    private String webUrl;

    /**
     * Datum vytvoření
     */
    @ApiModelProperty(value = "Datum vytvoření")
    @Column(name = "created_date")
    private Instant createdDate;

    /**
     * Datum úpravy
     */
    @ApiModelProperty(value = "Datum úpravy")
    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToOne
    @JoinColumn(unique = true)
    private InvoiceDesignSettings invoiceDesignSettings;

    @ManyToOne
    @JsonIgnoreProperties(value = "companies", allowSetters = true)
    private UserAccount userAccount;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "company_user_account",
               joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_account_id", referencedColumnName = "id"))
    private Set<UserAccount> userAccounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public Company firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Company lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreet() {
        return street;
    }

    public Company street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public Company city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Company postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public Company country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public Company registrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getVatNumber() {
        return vatNumber;
    }

    public Company vatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
        return this;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public String getRegisteredMark() {
        return registeredMark;
    }

    public Company registeredMark(String registeredMark) {
        this.registeredMark = registeredMark;
        return this;
    }

    public void setRegisteredMark(String registeredMark) {
        this.registeredMark = registeredMark;
    }

    public String getSupplementaryText() {
        return supplementaryText;
    }

    public Company supplementaryText(String supplementaryText) {
        this.supplementaryText = supplementaryText;
        return this;
    }

    public void setSupplementaryText(String supplementaryText) {
        this.supplementaryText = supplementaryText;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public Company bankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
        return this;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public String getIban() {
        return iban;
    }

    public Company iban(String iban) {
        this.iban = iban;
        return this;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getEmail() {
        return email;
    }

    public Company email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public Company telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getWebUrl() {
        return webUrl;
    }

    public Company webUrl(String webUrl) {
        this.webUrl = webUrl;
        return this;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Company createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }

    public Company updatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public InvoiceDesignSettings getInvoiceDesignSettings() {
        return invoiceDesignSettings;
    }

    public Company invoiceDesignSettings(InvoiceDesignSettings invoiceDesignSettings) {
        this.invoiceDesignSettings = invoiceDesignSettings;
        return this;
    }

    public void setInvoiceDesignSettings(InvoiceDesignSettings invoiceDesignSettings) {
        this.invoiceDesignSettings = invoiceDesignSettings;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public Company userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Set<UserAccount> getUserAccounts() {
        return userAccounts;
    }

    public Company userAccounts(Set<UserAccount> userAccounts) {
        this.userAccounts = userAccounts;
        return this;
    }

    public Company addUserAccount(UserAccount userAccount) {
        this.userAccounts.add(userAccount);
        userAccount.getCompanies().add(this);
        return this;
    }

    public Company removeUserAccount(UserAccount userAccount) {
        this.userAccounts.remove(userAccount);
        userAccount.getCompanies().remove(this);
        return this;
    }

    public void setUserAccounts(Set<UserAccount> userAccounts) {
        this.userAccounts = userAccounts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", country='" + getCountry() + "'" +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", vatNumber='" + getVatNumber() + "'" +
            ", registeredMark='" + getRegisteredMark() + "'" +
            ", supplementaryText='" + getSupplementaryText() + "'" +
            ", bankAccountNumber='" + getBankAccountNumber() + "'" +
            ", iban='" + getIban() + "'" +
            ", email='" + getEmail() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", webUrl='" + getWebUrl() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
