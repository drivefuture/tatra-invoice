package cz.drivefuture.tatrainvoice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

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

    @Column(name = "name")
    private String name;

    /**
     * Název společnosti
     */
    @ApiModelProperty(value = "Název společnosti")
    @Column(name = "first_name")
    private String firstName;

    /**
     * Jméno
     */
    @ApiModelProperty(value = "Jméno")
    @Column(name = "last_name")
    private String lastName;

    /**
     * Příjmení
     */
    @ApiModelProperty(value = "Příjmení")
    @Column(name = "street")
    private String street;

    /**
     * Ulice
     */
    @ApiModelProperty(value = "Ulice")
    @Column(name = "city")
    private String city;

    /**
     * Město
     */
    @ApiModelProperty(value = "Město")
    @Column(name = "postal_code")
    private String postalCode;

    /**
     * PSČ
     */
    @ApiModelProperty(value = "PSČ")
    @Column(name = "country")
    private String country;

    /**
     * Země
     */
    @ApiModelProperty(value = "Země")
    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "vat_number")
    private String vatNumber;

    /**
     * DIČ
     */
    @ApiModelProperty(value = "DIČ")
    @Column(name = "registered_mark")
    private String registeredMark;

    /**
     * Spisová značka
     */
    @ApiModelProperty(value = "Spisová značka")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "supplementary_text")
    private String supplementaryText;

    /**
     * Doplňkový text
     */
    @ApiModelProperty(value = "Doplňkový text")
    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    /**
     * Číslo účtu
     */
    @ApiModelProperty(value = "Číslo účtu")
    @Column(name = "iban")
    private String iban;

    /**
     * IBAN
     */
    @NotNull
    @ApiModelProperty(value = "IBAN", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * E-mail
     */
    @ApiModelProperty(value = "E-mail")
    @Column(name = "telephone")
    private String telephone;

    /**
     * Telefon
     */
    @ApiModelProperty(value = "Telefon")
    @Column(name = "web_url")
    private String webUrl;

    /**
     * Url webu
     */
    @ApiModelProperty(value = "Url webu")
    @Column(name = "created_date")
    private Instant createdDate;

    /**
     * Datum vytvoření
     */
    @ApiModelProperty(value = "Datum vytvoření")
    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToOne
    @JoinColumn(unique = true)
    private InvoiceDesignSettings invoiceDesignSettings;

    @ManyToMany(cascade = { CascadeType.ALL })
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(
        name = "company_user_account",
        joinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "user_account_id", referencedColumnName = "id")
    )
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
