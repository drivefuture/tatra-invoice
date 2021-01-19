package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.domain.InvoiceDesignTemplate;
import cz.drivefuture.tatrainvoice.repository.InvoiceDesignTemplateRepository;
import cz.drivefuture.tatrainvoice.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link cz.drivefuture.tatrainvoice.domain.InvoiceDesignTemplate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InvoiceDesignTemplateResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceDesignTemplateResource.class);

    private static final String ENTITY_NAME = "invoiceDesignTemplate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvoiceDesignTemplateRepository invoiceDesignTemplateRepository;

    public InvoiceDesignTemplateResource(InvoiceDesignTemplateRepository invoiceDesignTemplateRepository) {
        this.invoiceDesignTemplateRepository = invoiceDesignTemplateRepository;
    }

    /**
     * {@code POST  /invoice-design-templates} : Create a new invoiceDesignTemplate.
     *
     * @param invoiceDesignTemplate the invoiceDesignTemplate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invoiceDesignTemplate, or with status {@code 400 (Bad Request)} if the invoiceDesignTemplate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invoice-design-templates")
    public ResponseEntity<InvoiceDesignTemplate> createInvoiceDesignTemplate(@Valid @RequestBody InvoiceDesignTemplate invoiceDesignTemplate) throws URISyntaxException {
        log.debug("REST request to save InvoiceDesignTemplate : {}", invoiceDesignTemplate);
        if (invoiceDesignTemplate.getId() != null) {
            throw new BadRequestAlertException("A new invoiceDesignTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoiceDesignTemplate result = invoiceDesignTemplateRepository.save(invoiceDesignTemplate);
        return ResponseEntity.created(new URI("/api/invoice-design-templates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invoice-design-templates} : Updates an existing invoiceDesignTemplate.
     *
     * @param invoiceDesignTemplate the invoiceDesignTemplate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceDesignTemplate,
     * or with status {@code 400 (Bad Request)} if the invoiceDesignTemplate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoiceDesignTemplate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invoice-design-templates")
    public ResponseEntity<InvoiceDesignTemplate> updateInvoiceDesignTemplate(@Valid @RequestBody InvoiceDesignTemplate invoiceDesignTemplate) throws URISyntaxException {
        log.debug("REST request to update InvoiceDesignTemplate : {}", invoiceDesignTemplate);
        if (invoiceDesignTemplate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InvoiceDesignTemplate result = invoiceDesignTemplateRepository.save(invoiceDesignTemplate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, invoiceDesignTemplate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invoice-design-templates} : get all the invoiceDesignTemplates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoiceDesignTemplates in body.
     */
    @GetMapping("/invoice-design-templates")
    public List<InvoiceDesignTemplate> getAllInvoiceDesignTemplates() {
        log.debug("REST request to get all InvoiceDesignTemplates");
        return invoiceDesignTemplateRepository.findAll();
    }

    /**
     * {@code GET  /invoice-design-templates/:id} : get the "id" invoiceDesignTemplate.
     *
     * @param id the id of the invoiceDesignTemplate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoiceDesignTemplate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invoice-design-templates/{id}")
    public ResponseEntity<InvoiceDesignTemplate> getInvoiceDesignTemplate(@PathVariable Long id) {
        log.debug("REST request to get InvoiceDesignTemplate : {}", id);
        Optional<InvoiceDesignTemplate> invoiceDesignTemplate = invoiceDesignTemplateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(invoiceDesignTemplate);
    }

    /**
     * {@code DELETE  /invoice-design-templates/:id} : delete the "id" invoiceDesignTemplate.
     *
     * @param id the id of the invoiceDesignTemplate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invoice-design-templates/{id}")
    public ResponseEntity<Void> deleteInvoiceDesignTemplate(@PathVariable Long id) {
        log.debug("REST request to delete InvoiceDesignTemplate : {}", id);
        invoiceDesignTemplateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
