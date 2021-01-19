package cz.drivefuture.tatrainvoice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Invoice entity.\nPoložka faktury\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "Invoice entity.\nPoložka faktury\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "invoice_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InvoiceItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sequence", nullable = false)
    private Integer sequence;

    /**
     * Pořadí
     */
    @NotNull
    @ApiModelProperty(value = "Pořadí", required = true)
    @Column(name = "quantity", nullable = false)
    private Double quantity;

    /**
     * Počet
     */
    @NotNull
    @ApiModelProperty(value = "Počet", required = true)
    @Column(name = "measure_unit", nullable = false)
    private String measureUnit;

    /**
     * Měrná jednotka
     */
    @NotNull
    @ApiModelProperty(value = "Měrná jednotka", required = true)
    @Column(name = "description", nullable = false)
    private String description;

    /**
     * Popis
     */
    @NotNull
    @ApiModelProperty(value = "Popis", required = true)
    @Column(name = "measure_unit_price", precision = 21, scale = 2, nullable = false)
    private BigDecimal measureUnitPrice;

    @ManyToOne
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    private Invoice invoice;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSequence() {
        return sequence;
    }

    public InvoiceItem sequence(Integer sequence) {
        this.sequence = sequence;
        return this;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Double getQuantity() {
        return quantity;
    }

    public InvoiceItem quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getMeasureUnit() {
        return measureUnit;
    }

    public InvoiceItem measureUnit(String measureUnit) {
        this.measureUnit = measureUnit;
        return this;
    }

    public void setMeasureUnit(String measureUnit) {
        this.measureUnit = measureUnit;
    }

    public String getDescription() {
        return description;
    }

    public InvoiceItem description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getMeasureUnitPrice() {
        return measureUnitPrice;
    }

    public InvoiceItem measureUnitPrice(BigDecimal measureUnitPrice) {
        this.measureUnitPrice = measureUnitPrice;
        return this;
    }

    public void setMeasureUnitPrice(BigDecimal measureUnitPrice) {
        this.measureUnitPrice = measureUnitPrice;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public InvoiceItem invoice(Invoice invoice) {
        this.invoice = invoice;
        return this;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvoiceItem)) {
            return false;
        }
        return id != null && id.equals(((InvoiceItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceItem{" +
            "id=" + getId() +
            ", sequence=" + getSequence() +
            ", quantity=" + getQuantity() +
            ", measureUnit='" + getMeasureUnit() + "'" +
            ", description='" + getDescription() + "'" +
            ", measureUnitPrice=" + getMeasureUnitPrice() +
            "}";
    }
}
