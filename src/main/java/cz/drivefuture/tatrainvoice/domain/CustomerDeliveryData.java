package cz.drivefuture.tatrainvoice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * CustomerDeliveryData entity.\nDodací údaje zákazníka\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "CustomerDeliveryData entity.\nDodací údaje zákazníka\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "customer_delivery_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CustomerDeliveryData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Název společnosti
     */
    @ApiModelProperty(value = "Název společnosti")
    @Column(name = "company_name")
    private String companyName;

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
     * Telefon
     */
    @ApiModelProperty(value = "Telefon")
    @Column(name = "telephone")
    private String telephone;

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

    public CustomerDeliveryData companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getFirstName() {
        return firstName;
    }

    public CustomerDeliveryData firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public CustomerDeliveryData lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreet() {
        return street;
    }

    public CustomerDeliveryData street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public CustomerDeliveryData city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public CustomerDeliveryData postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public CustomerDeliveryData country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTelephone() {
        return telephone;
    }

    public CustomerDeliveryData telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public CustomerDeliveryData createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }

    public CustomerDeliveryData updatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerDeliveryData)) {
            return false;
        }
        return id != null && id.equals(((CustomerDeliveryData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerDeliveryData{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", country='" + getCountry() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
