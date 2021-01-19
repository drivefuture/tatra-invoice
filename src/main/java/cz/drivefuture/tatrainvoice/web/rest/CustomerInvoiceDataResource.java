package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.domain.CustomerInvoiceData;
import cz.drivefuture.tatrainvoice.repository.CustomerInvoiceDataRepository;
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
 * REST controller for managing {@link cz.drivefuture.tatrainvoice.domain.CustomerInvoiceData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CustomerInvoiceDataResource {

    private final Logger log = LoggerFactory.getLogger(CustomerInvoiceDataResource.class);

    private static final String ENTITY_NAME = "customerInvoiceData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerInvoiceDataRepository customerInvoiceDataRepository;

    public CustomerInvoiceDataResource(CustomerInvoiceDataRepository customerInvoiceDataRepository) {
        this.customerInvoiceDataRepository = customerInvoiceDataRepository;
    }

    /**
     * {@code POST  /customer-invoice-data} : Create a new customerInvoiceData.
     *
     * @param customerInvoiceData the customerInvoiceData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerInvoiceData, or with status {@code 400 (Bad Request)} if the customerInvoiceData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customer-invoice-data")
    public ResponseEntity<CustomerInvoiceData> createCustomerInvoiceData(@Valid @RequestBody CustomerInvoiceData customerInvoiceData) throws URISyntaxException {
        log.debug("REST request to save CustomerInvoiceData : {}", customerInvoiceData);
        if (customerInvoiceData.getId() != null) {
            throw new BadRequestAlertException("A new customerInvoiceData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerInvoiceData result = customerInvoiceDataRepository.save(customerInvoiceData);
        return ResponseEntity.created(new URI("/api/customer-invoice-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /customer-invoice-data} : Updates an existing customerInvoiceData.
     *
     * @param customerInvoiceData the customerInvoiceData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerInvoiceData,
     * or with status {@code 400 (Bad Request)} if the customerInvoiceData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerInvoiceData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customer-invoice-data")
    public ResponseEntity<CustomerInvoiceData> updateCustomerInvoiceData(@Valid @RequestBody CustomerInvoiceData customerInvoiceData) throws URISyntaxException {
        log.debug("REST request to update CustomerInvoiceData : {}", customerInvoiceData);
        if (customerInvoiceData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerInvoiceData result = customerInvoiceDataRepository.save(customerInvoiceData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerInvoiceData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customer-invoice-data} : get all the customerInvoiceData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerInvoiceData in body.
     */
    @GetMapping("/customer-invoice-data")
    public List<CustomerInvoiceData> getAllCustomerInvoiceData() {
        log.debug("REST request to get all CustomerInvoiceData");
        return customerInvoiceDataRepository.findAll();
    }

    /**
     * {@code GET  /customer-invoice-data/:id} : get the "id" customerInvoiceData.
     *
     * @param id the id of the customerInvoiceData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerInvoiceData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customer-invoice-data/{id}")
    public ResponseEntity<CustomerInvoiceData> getCustomerInvoiceData(@PathVariable Long id) {
        log.debug("REST request to get CustomerInvoiceData : {}", id);
        Optional<CustomerInvoiceData> customerInvoiceData = customerInvoiceDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerInvoiceData);
    }

    /**
     * {@code DELETE  /customer-invoice-data/:id} : delete the "id" customerInvoiceData.
     *
     * @param id the id of the customerInvoiceData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customer-invoice-data/{id}")
    public ResponseEntity<Void> deleteCustomerInvoiceData(@PathVariable Long id) {
        log.debug("REST request to delete CustomerInvoiceData : {}", id);
        customerInvoiceDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
