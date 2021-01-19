package cz.drivefuture.tatrainvoice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import cz.drivefuture.tatrainvoice.domain.enumeration.Language;

/**
 * Customer entity.\nZákazník\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "Customer entity.\nZákazník\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * E-mail
     */
    @NotNull
    @ApiModelProperty(value = "E-mail", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * Kopie E-mailu
     */
    @ApiModelProperty(value = "Kopie E-mailu")
    @Column(name = "email_copy")
    private String emailCopy;

    /**
     * Slepá kopie E-mailu
     */
    @ApiModelProperty(value = "Slepá kopie E-mailu")
    @Column(name = "email_blind_copy")
    private String emailBlindCopy;

    /**
     * Telefon
     */
    @ApiModelProperty(value = "Telefon")
    @Column(name = "telephone")
    private String telephone;

    /**
     * Splatnost faktury ve dnech
     */
    @NotNull
    @ApiModelProperty(value = "Splatnost faktury ve dnech", required = true)
    @Column(name = "invoice_due_period", nullable = false)
    private Integer invoiceDuePeriod;

    /**
     * Jazyk faktury
     */
    @ApiModelProperty(value = "Jazyk faktury")
    @Enumerated(EnumType.STRING)
    @Column(name = "invoice_language")
    private Language invoiceLanguage;

    /**
     * Netisknutelná poznámka
     */
    @ApiModelProperty(value = "Netisknutelná poznámka")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "comment")
    private String comment;

    /**
     * Doplňkový text
     */
    @ApiModelProperty(value = "Doplňkový text")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "supplementary_text")
    private String supplementaryText;

    /**
     * Text před položkami na faktuře
     */
    @ApiModelProperty(value = "Text před položkami na faktuře")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "before_invoice_items_text")
    private String beforeInvoiceItemsText;

    /**
     * Text v patičce faktury
     */
    @ApiModelProperty(value = "Text v patičce faktury")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "invoice_footer_text")
    private String invoiceFooterText;

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

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private CustomerInvoiceData customerInvoiceData;

    @OneToOne
    @JoinColumn(unique = true)
    private CustomerDeliveryData deliveryData;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmailCopy() {
        return emailCopy;
    }

    public Customer emailCopy(String emailCopy) {
        this.emailCopy = emailCopy;
        return this;
    }

    public void setEmailCopy(String emailCopy) {
        this.emailCopy = emailCopy;
    }

    public String getEmailBlindCopy() {
        return emailBlindCopy;
    }

    public Customer emailBlindCopy(String emailBlindCopy) {
        this.emailBlindCopy = emailBlindCopy;
        return this;
    }

    public void setEmailBlindCopy(String emailBlindCopy) {
        this.emailBlindCopy = emailBlindCopy;
    }

    public String getTelephone() {
        return telephone;
    }

    public Customer telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Integer getInvoiceDuePeriod() {
        return invoiceDuePeriod;
    }

    public Customer invoiceDuePeriod(Integer invoiceDuePeriod) {
        this.invoiceDuePeriod = invoiceDuePeriod;
        return this;
    }

    public void setInvoiceDuePeriod(Integer invoiceDuePeriod) {
        this.invoiceDuePeriod = invoiceDuePeriod;
    }

    public Language getInvoiceLanguage() {
        return invoiceLanguage;
    }

    public Customer invoiceLanguage(Language invoiceLanguage) {
        this.invoiceLanguage = invoiceLanguage;
        return this;
    }

    public void setInvoiceLanguage(Language invoiceLanguage) {
        this.invoiceLanguage = invoiceLanguage;
    }

    public String getComment() {
        return comment;
    }

    public Customer comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getSupplementaryText() {
        return supplementaryText;
    }

    public Customer supplementaryText(String supplementaryText) {
        this.supplementaryText = supplementaryText;
        return this;
    }

    public void setSupplementaryText(String supplementaryText) {
        this.supplementaryText = supplementaryText;
    }

    public String getBeforeInvoiceItemsText() {
        return beforeInvoiceItemsText;
    }

    public Customer beforeInvoiceItemsText(String beforeInvoiceItemsText) {
        this.beforeInvoiceItemsText = beforeInvoiceItemsText;
        return this;
    }

    public void setBeforeInvoiceItemsText(String beforeInvoiceItemsText) {
        this.beforeInvoiceItemsText = beforeInvoiceItemsText;
    }

    public String getInvoiceFooterText() {
        return invoiceFooterText;
    }

    public Customer invoiceFooterText(String invoiceFooterText) {
        this.invoiceFooterText = invoiceFooterText;
        return this;
    }

    public void setInvoiceFooterText(String invoiceFooterText) {
        this.invoiceFooterText = invoiceFooterText;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Customer createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }

    public Customer updatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public CustomerInvoiceData getCustomerInvoiceData() {
        return customerInvoiceData;
    }

    public Customer customerInvoiceData(CustomerInvoiceData customerInvoiceData) {
        this.customerInvoiceData = customerInvoiceData;
        return this;
    }

    public void setCustomerInvoiceData(CustomerInvoiceData customerInvoiceData) {
        this.customerInvoiceData = customerInvoiceData;
    }

    public CustomerDeliveryData getDeliveryData() {
        return deliveryData;
    }

    public Customer deliveryData(CustomerDeliveryData customerDeliveryData) {
        this.deliveryData = customerDeliveryData;
        return this;
    }

    public void setDeliveryData(CustomerDeliveryData customerDeliveryData) {
        this.deliveryData = customerDeliveryData;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", emailCopy='" + getEmailCopy() + "'" +
            ", emailBlindCopy='" + getEmailBlindCopy() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", invoiceDuePeriod=" + getInvoiceDuePeriod() +
            ", invoiceLanguage='" + getInvoiceLanguage() + "'" +
            ", comment='" + getComment() + "'" +
            ", supplementaryText='" + getSupplementaryText() + "'" +
            ", beforeInvoiceItemsText='" + getBeforeInvoiceItemsText() + "'" +
            ", invoiceFooterText='" + getInvoiceFooterText() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
