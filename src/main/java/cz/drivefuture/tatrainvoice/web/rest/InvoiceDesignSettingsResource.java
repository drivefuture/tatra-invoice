package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.domain.InvoiceDesignSettings;
import cz.drivefuture.tatrainvoice.repository.InvoiceDesignSettingsRepository;
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
 * REST controller for managing {@link cz.drivefuture.tatrainvoice.domain.InvoiceDesignSettings}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InvoiceDesignSettingsResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceDesignSettingsResource.class);

    private static final String ENTITY_NAME = "invoiceDesignSettings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvoiceDesignSettingsRepository invoiceDesignSettingsRepository;

    public InvoiceDesignSettingsResource(InvoiceDesignSettingsRepository invoiceDesignSettingsRepository) {
        this.invoiceDesignSettingsRepository = invoiceDesignSettingsRepository;
    }

    /**
     * {@code POST  /invoice-design-settings} : Create a new invoiceDesignSettings.
     *
     * @param invoiceDesignSettings the invoiceDesignSettings to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invoiceDesignSettings, or with status {@code 400 (Bad Request)} if the invoiceDesignSettings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invoice-design-settings")
    public ResponseEntity<InvoiceDesignSettings> createInvoiceDesignSettings(@Valid @RequestBody InvoiceDesignSettings invoiceDesignSettings) throws URISyntaxException {
        log.debug("REST request to save InvoiceDesignSettings : {}", invoiceDesignSettings);
        if (invoiceDesignSettings.getId() != null) {
            throw new BadRequestAlertException("A new invoiceDesignSettings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoiceDesignSettings result = invoiceDesignSettingsRepository.save(invoiceDesignSettings);
        return ResponseEntity.created(new URI("/api/invoice-design-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invoice-design-settings} : Updates an existing invoiceDesignSettings.
     *
     * @param invoiceDesignSettings the invoiceDesignSettings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceDesignSettings,
     * or with status {@code 400 (Bad Request)} if the invoiceDesignSettings is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoiceDesignSettings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invoice-design-settings")
    public ResponseEntity<InvoiceDesignSettings> updateInvoiceDesignSettings(@Valid @RequestBody InvoiceDesignSettings invoiceDesignSettings) throws URISyntaxException {
        log.debug("REST request to update InvoiceDesignSettings : {}", invoiceDesignSettings);
        if (invoiceDesignSettings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InvoiceDesignSettings result = invoiceDesignSettingsRepository.save(invoiceDesignSettings);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, invoiceDesignSettings.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invoice-design-settings} : get all the invoiceDesignSettings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoiceDesignSettings in body.
     */
    @GetMapping("/invoice-design-settings")
    public List<InvoiceDesignSettings> getAllInvoiceDesignSettings() {
        log.debug("REST request to get all InvoiceDesignSettings");
        return invoiceDesignSettingsRepository.findAll();
    }

    /**
     * {@code GET  /invoice-design-settings/:id} : get the "id" invoiceDesignSettings.
     *
     * @param id the id of the invoiceDesignSettings to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoiceDesignSettings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invoice-design-settings/{id}")
    public ResponseEntity<InvoiceDesignSettings> getInvoiceDesignSettings(@PathVariable Long id) {
        log.debug("REST request to get InvoiceDesignSettings : {}", id);
        Optional<InvoiceDesignSettings> invoiceDesignSettings = invoiceDesignSettingsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(invoiceDesignSettings);
    }

    /**
     * {@code DELETE  /invoice-design-settings/:id} : delete the "id" invoiceDesignSettings.
     *
     * @param id the id of the invoiceDesignSettings to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invoice-design-settings/{id}")
    public ResponseEntity<Void> deleteInvoiceDesignSettings(@PathVariable Long id) {
        log.debug("REST request to delete InvoiceDesignSettings : {}", id);
        invoiceDesignSettingsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
