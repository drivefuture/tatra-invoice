package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.TatraInvoiceApp;
import cz.drivefuture.tatrainvoice.domain.Customer;
import cz.drivefuture.tatrainvoice.domain.CustomerInvoiceData;
import cz.drivefuture.tatrainvoice.repository.CustomerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import cz.drivefuture.tatrainvoice.domain.enumeration.Language;
/**
 * Integration tests for the {@link CustomerResource} REST controller.
 */
@SpringBootTest(classes = TatraInvoiceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_COPY = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_COPY = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_BLIND_COPY = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_BLIND_COPY = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_INVOICE_DUE_PERIOD = 1;
    private static final Integer UPDATED_INVOICE_DUE_PERIOD = 2;

    private static final Language DEFAULT_INVOICE_LANGUAGE = Language.CZECH;
    private static final Language UPDATED_INVOICE_LANGUAGE = Language.SLOVAK;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLEMENTARY_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLEMENTARY_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_BEFORE_INVOICE_ITEMS_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_BEFORE_INVOICE_ITEMS_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_INVOICE_FOOTER_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_FOOTER_TEXT = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerMockMvc;

    private Customer customer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createEntity(EntityManager em) {
        Customer customer = new Customer()
            .email(DEFAULT_EMAIL)
            .emailCopy(DEFAULT_EMAIL_COPY)
            .emailBlindCopy(DEFAULT_EMAIL_BLIND_COPY)
            .telephone(DEFAULT_TELEPHONE)
            .invoiceDuePeriod(DEFAULT_INVOICE_DUE_PERIOD)
            .invoiceLanguage(DEFAULT_INVOICE_LANGUAGE)
            .comment(DEFAULT_COMMENT)
            .supplementaryText(DEFAULT_SUPPLEMENTARY_TEXT)
            .beforeInvoiceItemsText(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT)
            .invoiceFooterText(DEFAULT_INVOICE_FOOTER_TEXT)
            .createdDate(DEFAULT_CREATED_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        // Add required entity
        CustomerInvoiceData customerInvoiceData;
        if (TestUtil.findAll(em, CustomerInvoiceData.class).isEmpty()) {
            customerInvoiceData = CustomerInvoiceDataResourceIT.createEntity(em);
            em.persist(customerInvoiceData);
            em.flush();
        } else {
            customerInvoiceData = TestUtil.findAll(em, CustomerInvoiceData.class).get(0);
        }
        customer.setCustomerInvoiceData(customerInvoiceData);
        return customer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createUpdatedEntity(EntityManager em) {
        Customer customer = new Customer()
            .email(UPDATED_EMAIL)
            .emailCopy(UPDATED_EMAIL_COPY)
            .emailBlindCopy(UPDATED_EMAIL_BLIND_COPY)
            .telephone(UPDATED_TELEPHONE)
            .invoiceDuePeriod(UPDATED_INVOICE_DUE_PERIOD)
            .invoiceLanguage(UPDATED_INVOICE_LANGUAGE)
            .comment(UPDATED_COMMENT)
            .supplementaryText(UPDATED_SUPPLEMENTARY_TEXT)
            .beforeInvoiceItemsText(UPDATED_BEFORE_INVOICE_ITEMS_TEXT)
            .invoiceFooterText(UPDATED_INVOICE_FOOTER_TEXT)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        // Add required entity
        CustomerInvoiceData customerInvoiceData;
        if (TestUtil.findAll(em, CustomerInvoiceData.class).isEmpty()) {
            customerInvoiceData = CustomerInvoiceDataResourceIT.createUpdatedEntity(em);
            em.persist(customerInvoiceData);
            em.flush();
        } else {
            customerInvoiceData = TestUtil.findAll(em, CustomerInvoiceData.class).get(0);
        }
        customer.setCustomerInvoiceData(customerInvoiceData);
        return customer;
    }

    @BeforeEach
    public void initTest() {
        customer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomer() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();
        // Create the Customer
        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isCreated());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate + 1);
        Customer testCustomer = customerList.get(customerList.size() - 1);
        assertThat(testCustomer.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCustomer.getEmailCopy()).isEqualTo(DEFAULT_EMAIL_COPY);
        assertThat(testCustomer.getEmailBlindCopy()).isEqualTo(DEFAULT_EMAIL_BLIND_COPY);
        assertThat(testCustomer.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testCustomer.getInvoiceDuePeriod()).isEqualTo(DEFAULT_INVOICE_DUE_PERIOD);
        assertThat(testCustomer.getInvoiceLanguage()).isEqualTo(DEFAULT_INVOICE_LANGUAGE);
        assertThat(testCustomer.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testCustomer.getSupplementaryText()).isEqualTo(DEFAULT_SUPPLEMENTARY_TEXT);
        assertThat(testCustomer.getBeforeInvoiceItemsText()).isEqualTo(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT);
        assertThat(testCustomer.getInvoiceFooterText()).isEqualTo(DEFAULT_INVOICE_FOOTER_TEXT);
        assertThat(testCustomer.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCustomer.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void createCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();

        // Create the Customer with an existing ID
        customer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRepository.findAll().size();
        // set the field null
        customer.setEmail(null);

        // Create the Customer, which fails.


        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInvoiceDuePeriodIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRepository.findAll().size();
        // set the field null
        customer.setInvoiceDuePeriod(null);

        // Create the Customer, which fails.


        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomers() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get all the customerList
        restCustomerMockMvc.perform(get("/api/customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customer.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].emailCopy").value(hasItem(DEFAULT_EMAIL_COPY)))
            .andExpect(jsonPath("$.[*].emailBlindCopy").value(hasItem(DEFAULT_EMAIL_BLIND_COPY)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].invoiceDuePeriod").value(hasItem(DEFAULT_INVOICE_DUE_PERIOD)))
            .andExpect(jsonPath("$.[*].invoiceLanguage").value(hasItem(DEFAULT_INVOICE_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].supplementaryText").value(hasItem(DEFAULT_SUPPLEMENTARY_TEXT.toString())))
            .andExpect(jsonPath("$.[*].beforeInvoiceItemsText").value(hasItem(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT.toString())))
            .andExpect(jsonPath("$.[*].invoiceFooterText").value(hasItem(DEFAULT_INVOICE_FOOTER_TEXT.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", customer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customer.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.emailCopy").value(DEFAULT_EMAIL_COPY))
            .andExpect(jsonPath("$.emailBlindCopy").value(DEFAULT_EMAIL_BLIND_COPY))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.invoiceDuePeriod").value(DEFAULT_INVOICE_DUE_PERIOD))
            .andExpect(jsonPath("$.invoiceLanguage").value(DEFAULT_INVOICE_LANGUAGE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.supplementaryText").value(DEFAULT_SUPPLEMENTARY_TEXT.toString()))
            .andExpect(jsonPath("$.beforeInvoiceItemsText").value(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT.toString()))
            .andExpect(jsonPath("$.invoiceFooterText").value(DEFAULT_INVOICE_FOOTER_TEXT.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomer() throws Exception {
        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // Update the customer
        Customer updatedCustomer = customerRepository.findById(customer.getId()).get();
        // Disconnect from session so that the updates on updatedCustomer are not directly saved in db
        em.detach(updatedCustomer);
        updatedCustomer
            .email(UPDATED_EMAIL)
            .emailCopy(UPDATED_EMAIL_COPY)
            .emailBlindCopy(UPDATED_EMAIL_BLIND_COPY)
            .telephone(UPDATED_TELEPHONE)
            .invoiceDuePeriod(UPDATED_INVOICE_DUE_PERIOD)
            .invoiceLanguage(UPDATED_INVOICE_LANGUAGE)
            .comment(UPDATED_COMMENT)
            .supplementaryText(UPDATED_SUPPLEMENTARY_TEXT)
            .beforeInvoiceItemsText(UPDATED_BEFORE_INVOICE_ITEMS_TEXT)
            .invoiceFooterText(UPDATED_INVOICE_FOOTER_TEXT)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restCustomerMockMvc.perform(put("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomer)))
            .andExpect(status().isOk());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
        Customer testCustomer = customerList.get(customerList.size() - 1);
        assertThat(testCustomer.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCustomer.getEmailCopy()).isEqualTo(UPDATED_EMAIL_COPY);
        assertThat(testCustomer.getEmailBlindCopy()).isEqualTo(UPDATED_EMAIL_BLIND_COPY);
        assertThat(testCustomer.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testCustomer.getInvoiceDuePeriod()).isEqualTo(UPDATED_INVOICE_DUE_PERIOD);
        assertThat(testCustomer.getInvoiceLanguage()).isEqualTo(UPDATED_INVOICE_LANGUAGE);
        assertThat(testCustomer.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testCustomer.getSupplementaryText()).isEqualTo(UPDATED_SUPPLEMENTARY_TEXT);
        assertThat(testCustomer.getBeforeInvoiceItemsText()).isEqualTo(UPDATED_BEFORE_INVOICE_ITEMS_TEXT);
        assertThat(testCustomer.getInvoiceFooterText()).isEqualTo(UPDATED_INVOICE_FOOTER_TEXT);
        assertThat(testCustomer.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCustomer.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomer() throws Exception {
        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerMockMvc.perform(put("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeDelete = customerRepository.findAll().size();

        // Delete the customer
        restCustomerMockMvc.perform(delete("/api/customers/{id}", customer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
