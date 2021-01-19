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
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import cz.drivefuture.tatrainvoice.domain.enumeration.PaymentMethod;

import cz.drivefuture.tatrainvoice.domain.enumeration.Language;

/**
 * Invoice entity.\nFaktura\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "Invoice entity.\nFaktura\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "invoice")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number")
    private String number;

    /**
     * Číslo dokumentu
     */
    @NotNull
    @ApiModelProperty(value = "Číslo dokumentu", required = true)
    @Column(name = "issue_date", nullable = false)
    private Instant issueDate;

    /**
     * Datum vystavení
     */
    @NotNull
    @ApiModelProperty(value = "Datum vystavení", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    /**
     * Způsob platby
     */
    @NotNull
    @ApiModelProperty(value = "Způsob platby", required = true)
    @Column(name = "due_period", nullable = false)
    private Integer duePeriod;

    /**
     * Splatnost ve dnech
     */
    @NotNull
    @ApiModelProperty(value = "Splatnost ve dnech", required = true)
    @Column(name = "due_date", nullable = false)
    private Instant dueDate;

    /**
     * Datum splatnosti
     */
    @ApiModelProperty(value = "Datum splatnosti")
    @Column(name = "payment_date")
    private Instant paymentDate;

    /**
     * Datum úhrady
     */
    @ApiModelProperty(value = "Datum úhrady")
    @Column(name = "tax_point")
    private Instant taxPoint;

    /**
     * Datum zdanitelného plnění
     */
    @ApiModelProperty(value = "Datum zdanitelného plnění")
    @Column(name = "total_amount", precision = 21, scale = 2)
    private BigDecimal totalAmount;

    /**
     * Celková částka
     */
    @NotNull
    @ApiModelProperty(value = "Celková částka", required = true)
    @Column(name = "currency", nullable = false)
    private String currency;

    /**
     * Měna
     */
    @ApiModelProperty(value = "Měna")
    @Column(name = "variable_symbol")
    private String variableSymbol;

    /**
     * VS
     */
    @ApiModelProperty(value = "VS")
    @Column(name = "constant_symbol")
    private String constantSymbol;

    /**
     * KS
     */
    @ApiModelProperty(value = "KS")
    @Column(name = "special_symbol")
    private String specialSymbol;

    @Column(name = "order_number")
    private String orderNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;

    /**
     * Jazyk faktury
     */
    @ApiModelProperty(value = "Jazyk faktury")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "comment")
    private String comment;

    /**
     * Netisknutelná poznámka
     */
    @ApiModelProperty(value = "Netisknutelná poznámka")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "before_invoice_items_text")
    private String beforeInvoiceItemsText;

    /**
     * Text před položkami na faktuře
     */
    @ApiModelProperty(value = "Text před položkami na faktuře")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "invoice_footer_text")
    private String invoiceFooterText;

    /**
     * Text v patičce faktury
     */
    @ApiModelProperty(value = "Text v patičce faktury")
    @Lob
    @Column(name = "pdf_file")
    private byte[] pdfFile;

    @Column(name = "pdf_file_content_type")
    private String pdfFileContentType;

    /**
     * Pdf soubor
     */
    @ApiModelProperty(value = "Pdf soubor")
    @Column(name = "created_date")
    private Instant createdDate;

    /**
     * Datum vytvoření
     */
    @ApiModelProperty(value = "Datum vytvoření")
    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToMany(mappedBy = "invoice")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<InvoiceItem> items = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "invoices", allowSetters = true)
    private Company company;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "invoices", allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public Invoice number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Instant getIssueDate() {
        return issueDate;
    }

    public Invoice issueDate(Instant issueDate) {
        this.issueDate = issueDate;
        return this;
    }

    public void setIssueDate(Instant issueDate) {
        this.issueDate = issueDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public Invoice paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Integer getDuePeriod() {
        return duePeriod;
    }

    public Invoice duePeriod(Integer duePeriod) {
        this.duePeriod = duePeriod;
        return this;
    }

    public void setDuePeriod(Integer duePeriod) {
        this.duePeriod = duePeriod;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public Invoice dueDate(Instant dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public Instant getPaymentDate() {
        return paymentDate;
    }

    public Invoice paymentDate(Instant paymentDate) {
        this.paymentDate = paymentDate;
        return this;
    }

    public void setPaymentDate(Instant paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Instant getTaxPoint() {
        return taxPoint;
    }

    public Invoice taxPoint(Instant taxPoint) {
        this.taxPoint = taxPoint;
        return this;
    }

    public void setTaxPoint(Instant taxPoint) {
        this.taxPoint = taxPoint;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public Invoice totalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public Invoice currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getVariableSymbol() {
        return variableSymbol;
    }

    public Invoice variableSymbol(String variableSymbol) {
        this.variableSymbol = variableSymbol;
        return this;
    }

    public void setVariableSymbol(String variableSymbol) {
        this.variableSymbol = variableSymbol;
    }

    public String getConstantSymbol() {
        return constantSymbol;
    }

    public Invoice constantSymbol(String constantSymbol) {
        this.constantSymbol = constantSymbol;
        return this;
    }

    public void setConstantSymbol(String constantSymbol) {
        this.constantSymbol = constantSymbol;
    }

    public String getSpecialSymbol() {
        return specialSymbol;
    }

    public Invoice specialSymbol(String specialSymbol) {
        this.specialSymbol = specialSymbol;
        return this;
    }

    public void setSpecialSymbol(String specialSymbol) {
        this.specialSymbol = specialSymbol;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public Invoice orderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Language getLanguage() {
        return language;
    }

    public Invoice language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getComment() {
        return comment;
    }

    public Invoice comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getBeforeInvoiceItemsText() {
        return beforeInvoiceItemsText;
    }

    public Invoice beforeInvoiceItemsText(String beforeInvoiceItemsText) {
        this.beforeInvoiceItemsText = beforeInvoiceItemsText;
        return this;
    }

    public void setBeforeInvoiceItemsText(String beforeInvoiceItemsText) {
        this.beforeInvoiceItemsText = beforeInvoiceItemsText;
    }

    public String getInvoiceFooterText() {
        return invoiceFooterText;
    }

    public Invoice invoiceFooterText(String invoiceFooterText) {
        this.invoiceFooterText = invoiceFooterText;
        return this;
    }

    public void setInvoiceFooterText(String invoiceFooterText) {
        this.invoiceFooterText = invoiceFooterText;
    }

    public byte[] getPdfFile() {
        return pdfFile;
    }

    public Invoice pdfFile(byte[] pdfFile) {
        this.pdfFile = pdfFile;
        return this;
    }

    public void setPdfFile(byte[] pdfFile) {
        this.pdfFile = pdfFile;
    }

    public String getPdfFileContentType() {
        return pdfFileContentType;
    }

    public Invoice pdfFileContentType(String pdfFileContentType) {
        this.pdfFileContentType = pdfFileContentType;
        return this;
    }

    public void setPdfFileContentType(String pdfFileContentType) {
        this.pdfFileContentType = pdfFileContentType;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Invoice createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }

    public Invoice updatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Set<InvoiceItem> getItems() {
        return items;
    }

    public Invoice items(Set<InvoiceItem> invoiceItems) {
        this.items = invoiceItems;
        return this;
    }

    public Invoice addItem(InvoiceItem invoiceItem) {
        this.items.add(invoiceItem);
        invoiceItem.setInvoice(this);
        return this;
    }

    public Invoice removeItem(InvoiceItem invoiceItem) {
        this.items.remove(invoiceItem);
        invoiceItem.setInvoice(null);
        return this;
    }

    public void setItems(Set<InvoiceItem> invoiceItems) {
        this.items = invoiceItems;
    }

    public Company getCompany() {
        return company;
    }

    public Invoice company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Invoice customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", issueDate='" + getIssueDate() + "'" +
            ", paymentMethod='" + getPaymentMethod() + "'" +
            ", duePeriod=" + getDuePeriod() +
            ", dueDate='" + getDueDate() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", taxPoint='" + getTaxPoint() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", currency='" + getCurrency() + "'" +
            ", variableSymbol='" + getVariableSymbol() + "'" +
            ", constantSymbol='" + getConstantSymbol() + "'" +
            ", specialSymbol='" + getSpecialSymbol() + "'" +
            ", orderNumber='" + getOrderNumber() + "'" +
            ", language='" + getLanguage() + "'" +
            ", comment='" + getComment() + "'" +
            ", beforeInvoiceItemsText='" + getBeforeInvoiceItemsText() + "'" +
            ", invoiceFooterText='" + getInvoiceFooterText() + "'" +
            ", pdfFile='" + getPdfFile() + "'" +
            ", pdfFileContentType='" + getPdfFileContentType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
