package cz.drivefuture.tatrainvoice.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * InvoiceDesignSettings entity.\nNastavení vzhledu faktury\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "InvoiceDesignSettings entity.\nNastavení vzhledu faktury\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "invoice_design_settings")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InvoiceDesignSettings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Logo
     */
    @ApiModelProperty(value = "Logo")
    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    /**
     * Podpis a razítko
     */
    @ApiModelProperty(value = "Podpis a razítko")
    @Lob
    @Column(name = "signature_and_stamp")
    private byte[] signatureAndStamp;

    @Column(name = "signature_and_stamp_content_type")
    private String signatureAndStampContentType;

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
    private InvoiceDesignTemplate template;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getLogo() {
        return logo;
    }

    public InvoiceDesignSettings logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public InvoiceDesignSettings logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public byte[] getSignatureAndStamp() {
        return signatureAndStamp;
    }

    public InvoiceDesignSettings signatureAndStamp(byte[] signatureAndStamp) {
        this.signatureAndStamp = signatureAndStamp;
        return this;
    }

    public void setSignatureAndStamp(byte[] signatureAndStamp) {
        this.signatureAndStamp = signatureAndStamp;
    }

    public String getSignatureAndStampContentType() {
        return signatureAndStampContentType;
    }

    public InvoiceDesignSettings signatureAndStampContentType(String signatureAndStampContentType) {
        this.signatureAndStampContentType = signatureAndStampContentType;
        return this;
    }

    public void setSignatureAndStampContentType(String signatureAndStampContentType) {
        this.signatureAndStampContentType = signatureAndStampContentType;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public InvoiceDesignSettings createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }

    public InvoiceDesignSettings updatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public InvoiceDesignTemplate getTemplate() {
        return template;
    }

    public InvoiceDesignSettings template(InvoiceDesignTemplate invoiceDesignTemplate) {
        this.template = invoiceDesignTemplate;
        return this;
    }

    public void setTemplate(InvoiceDesignTemplate invoiceDesignTemplate) {
        this.template = invoiceDesignTemplate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvoiceDesignSettings)) {
            return false;
        }
        return id != null && id.equals(((InvoiceDesignSettings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceDesignSettings{" +
            "id=" + getId() +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", signatureAndStamp='" + getSignatureAndStamp() + "'" +
            ", signatureAndStampContentType='" + getSignatureAndStampContentType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
