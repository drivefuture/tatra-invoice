package cz.drivefuture.tatrainvoice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * CustomerInvoiceData entity.\nFakturační údaje zákazníka\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "CustomerInvoiceData entity.\nFakturační údaje zákazníka\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "customer_invoice_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CustomerInvoiceData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    /**
     * Název společnosti
     */
    @NotNull
    @ApiModelProperty(value = "Název společnosti", required = true)
    @Column(name = "own_name", nullable = false)
    private String ownName;

    /**
     * Vlastní název
     */
    @ApiModelProperty(value = "Vlastní název")
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

    /**
     * IČ
     */
    @ApiModelProperty(value = "IČ")
    @Column(name = "vat_number")
    private String vatNumber;

    /**
     * DIČ
     */
    @ApiModelProperty(value = "DIČ")
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
    @ApiModelProperty(value = "IBAN")
    @Column(name = "web_url")
    private String webUrl;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public CustomerInvoiceData companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getOwnName() {
        return ownName;
    }

    public CustomerInvoiceData ownName(String ownName) {
        this.ownName = ownName;
        return this;
    }

    public void setOwnName(String ownName) {
        this.ownName = ownName;
    }

    public String getFirstName() {
        return firstName;
    }

    public CustomerInvoiceData firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public CustomerInvoiceData lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreet() {
        return street;
    }

    public CustomerInvoiceData street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public CustomerInvoiceData city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public CustomerInvoiceData postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public CustomerInvoiceData country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public CustomerInvoiceData registrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getVatNumber() {
        return vatNumber;
    }

    public CustomerInvoiceData vatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
        return this;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public CustomerInvoiceData bankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
        return this;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public String getIban() {
        return iban;
    }

    public CustomerInvoiceData iban(String iban) {
        this.iban = iban;
        return this;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getWebUrl() {
        return webUrl;
    }

    public CustomerInvoiceData webUrl(String webUrl) {
        this.webUrl = webUrl;
        return this;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerInvoiceData)) {
            return false;
        }
        return id != null && id.equals(((CustomerInvoiceData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerInvoiceData{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", ownName='" + getOwnName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", country='" + getCountry() + "'" +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", vatNumber='" + getVatNumber() + "'" +
            ", bankAccountNumber='" + getBankAccountNumber() + "'" +
            ", iban='" + getIban() + "'" +
            ", webUrl='" + getWebUrl() + "'" +
            "}";
    }
}
