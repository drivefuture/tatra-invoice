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

/**
 * InvoiceDesignTemplate entity.\nŠablona vzhledu faktury\n@author DriveFuture s.r.o. team
 */
@ApiModel(description = "InvoiceDesignTemplate entity.\nŠablona vzhledu faktury\n@author DriveFuture s.r.o. team")
@Entity
@Table(name = "invoice_design_template")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InvoiceDesignTemplate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    
    @Lob
    @Column(name = "jrxml_template_file", nullable = false)
    private byte[] jrxmlTemplateFile;

    @Column(name = "jrxml_template_file_content_type", nullable = false)
    private String jrxmlTemplateFileContentType;

    @Column(name = "created_date")
    private Instant createdDate;

    /**
     * Datum vytvoření
     */
    @ApiModelProperty(value = "Datum vytvoření")
    @Column(name = "updated_date")
    private Instant updatedDate;

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

    public InvoiceDesignTemplate name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public InvoiceDesignTemplate description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public InvoiceDesignTemplate image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public InvoiceDesignTemplate imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public byte[] getJrxmlTemplateFile() {
        return jrxmlTemplateFile;
    }

    public InvoiceDesignTemplate jrxmlTemplateFile(byte[] jrxmlTemplateFile) {
        this.jrxmlTemplateFile = jrxmlTemplateFile;
        return this;
    }

    public void setJrxmlTemplateFile(byte[] jrxmlTemplateFile) {
        this.jrxmlTemplateFile = jrxmlTemplateFile;
    }

    public String getJrxmlTemplateFileContentType() {
        return jrxmlTemplateFileContentType;
    }

    public InvoiceDesignTemplate jrxmlTemplateFileContentType(String jrxmlTemplateFileContentType) {
        this.jrxmlTemplateFileContentType = jrxmlTemplateFileContentType;
        return this;
    }

    public void setJrxmlTemplateFileContentType(String jrxmlTemplateFileContentType) {
        this.jrxmlTemplateFileContentType = jrxmlTemplateFileContentType;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public InvoiceDesignTemplate createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return updatedDate;
    }

    public InvoiceDesignTemplate updatedDate(Instant updatedDate) {
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
        if (!(o instanceof InvoiceDesignTemplate)) {
            return false;
        }
        return id != null && id.equals(((InvoiceDesignTemplate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceDesignTemplate{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", jrxmlTemplateFile='" + getJrxmlTemplateFile() + "'" +
            ", jrxmlTemplateFileContentType='" + getJrxmlTemplateFileContentType() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
