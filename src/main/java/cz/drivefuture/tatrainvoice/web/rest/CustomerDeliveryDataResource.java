package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.domain.CustomerDeliveryData;
import cz.drivefuture.tatrainvoice.repository.CustomerDeliveryDataRepository;
import cz.drivefuture.tatrainvoice.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link cz.drivefuture.tatrainvoice.domain.CustomerDeliveryData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CustomerDeliveryDataResource {

    private final Logger log = LoggerFactory.getLogger(CustomerDeliveryDataResource.class);

    private static final String ENTITY_NAME = "customerDeliveryData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerDeliveryDataRepository customerDeliveryDataRepository;

    public CustomerDeliveryDataResource(CustomerDeliveryDataRepository customerDeliveryDataRepository) {
        this.customerDeliveryDataRepository = customerDeliveryDataRepository;
    }

    /**
     * {@code POST  /customer-delivery-data} : Create a new customerDeliveryData.
     *
     * @param customerDeliveryData the customerDeliveryData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerDeliveryData, or with status {@code 400 (Bad Request)} if the customerDeliveryData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customer-delivery-data")
    public ResponseEntity<CustomerDeliveryData> createCustomerDeliveryData(@RequestBody CustomerDeliveryData customerDeliveryData) throws URISyntaxException {
        log.debug("REST request to save CustomerDeliveryData : {}", customerDeliveryData);
        if (customerDeliveryData.getId() != null) {
            throw new BadRequestAlertException("A new customerDeliveryData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerDeliveryData result = customerDeliveryDataRepository.save(customerDeliveryData);
        return ResponseEntity.created(new URI("/api/customer-delivery-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /customer-delivery-data} : Updates an existing customerDeliveryData.
     *
     * @param customerDeliveryData the customerDeliveryData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerDeliveryData,
     * or with status {@code 400 (Bad Request)} if the customerDeliveryData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerDeliveryData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customer-delivery-data")
    public ResponseEntity<CustomerDeliveryData> updateCustomerDeliveryData(@RequestBody CustomerDeliveryData customerDeliveryData) throws URISyntaxException {
        log.debug("REST request to update CustomerDeliveryData : {}", customerDeliveryData);
        if (customerDeliveryData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerDeliveryData result = customerDeliveryDataRepository.save(customerDeliveryData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerDeliveryData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customer-delivery-data} : get all the customerDeliveryData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerDeliveryData in body.
     */
    @GetMapping("/customer-delivery-data")
    public List<CustomerDeliveryData> getAllCustomerDeliveryData() {
        log.debug("REST request to get all CustomerDeliveryData");
        return customerDeliveryDataRepository.findAll();
    }

    /**
     * {@code GET  /customer-delivery-data/:id} : get the "id" customerDeliveryData.
     *
     * @param id the id of the customerDeliveryData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerDeliveryData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customer-delivery-data/{id}")
    public ResponseEntity<CustomerDeliveryData> getCustomerDeliveryData(@PathVariable Long id) {
        log.debug("REST request to get CustomerDeliveryData : {}", id);
        Optional<CustomerDeliveryData> customerDeliveryData = customerDeliveryDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerDeliveryData);
    }

    /**
     * {@code DELETE  /customer-delivery-data/:id} : delete the "id" customerDeliveryData.
     *
     * @param id the id of the customerDeliveryData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customer-delivery-data/{id}")
    public ResponseEntity<Void> deleteCustomerDeliveryData(@PathVariable Long id) {
        log.debug("REST request to delete CustomerDeliveryData : {}", id);
        customerDeliveryDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
