package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.TatraInvoiceApp;
import cz.drivefuture.tatrainvoice.domain.CustomerInvoiceData;
import cz.drivefuture.tatrainvoice.repository.CustomerInvoiceDataRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CustomerInvoiceDataResource} REST controller.
 */
@SpringBootTest(classes = TatraInvoiceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerInvoiceDataResourceIT {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_OWN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_OWN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTRATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_VAT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_VAT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BANK_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_IBAN = "AAAAAAAAAA";
    private static final String UPDATED_IBAN = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_URL = "AAAAAAAAAA";
    private static final String UPDATED_WEB_URL = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CustomerInvoiceDataRepository customerInvoiceDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerInvoiceDataMockMvc;

    private CustomerInvoiceData customerInvoiceData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerInvoiceData createEntity(EntityManager em) {
        CustomerInvoiceData customerInvoiceData = new CustomerInvoiceData()
            .companyName(DEFAULT_COMPANY_NAME)
            .ownName(DEFAULT_OWN_NAME)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .street(DEFAULT_STREET)
            .city(DEFAULT_CITY)
            .postalCode(DEFAULT_POSTAL_CODE)
            .country(DEFAULT_COUNTRY)
            .registrationNumber(DEFAULT_REGISTRATION_NUMBER)
            .vatNumber(DEFAULT_VAT_NUMBER)
            .bankAccountNumber(DEFAULT_BANK_ACCOUNT_NUMBER)
            .iban(DEFAULT_IBAN)
            .webUrl(DEFAULT_WEB_URL)
            .createdDate(DEFAULT_CREATED_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        return customerInvoiceData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerInvoiceData createUpdatedEntity(EntityManager em) {
        CustomerInvoiceData customerInvoiceData = new CustomerInvoiceData()
            .companyName(UPDATED_COMPANY_NAME)
            .ownName(UPDATED_OWN_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .postalCode(UPDATED_POSTAL_CODE)
            .country(UPDATED_COUNTRY)
            .registrationNumber(UPDATED_REGISTRATION_NUMBER)
            .vatNumber(UPDATED_VAT_NUMBER)
            .bankAccountNumber(UPDATED_BANK_ACCOUNT_NUMBER)
            .iban(UPDATED_IBAN)
            .webUrl(UPDATED_WEB_URL)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        return customerInvoiceData;
    }

    @BeforeEach
    public void initTest() {
        customerInvoiceData = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerInvoiceData() throws Exception {
        int databaseSizeBeforeCreate = customerInvoiceDataRepository.findAll().size();
        // Create the CustomerInvoiceData
        restCustomerInvoiceDataMockMvc.perform(post("/api/customer-invoice-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerInvoiceData)))
            .andExpect(status().isCreated());

        // Validate the CustomerInvoiceData in the database
        List<CustomerInvoiceData> customerInvoiceDataList = customerInvoiceDataRepository.findAll();
        assertThat(customerInvoiceDataList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerInvoiceData testCustomerInvoiceData = customerInvoiceDataList.get(customerInvoiceDataList.size() - 1);
        assertThat(testCustomerInvoiceData.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testCustomerInvoiceData.getOwnName()).isEqualTo(DEFAULT_OWN_NAME);
        assertThat(testCustomerInvoiceData.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCustomerInvoiceData.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testCustomerInvoiceData.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testCustomerInvoiceData.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testCustomerInvoiceData.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testCustomerInvoiceData.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testCustomerInvoiceData.getRegistrationNumber()).isEqualTo(DEFAULT_REGISTRATION_NUMBER);
        assertThat(testCustomerInvoiceData.getVatNumber()).isEqualTo(DEFAULT_VAT_NUMBER);
        assertThat(testCustomerInvoiceData.getBankAccountNumber()).isEqualTo(DEFAULT_BANK_ACCOUNT_NUMBER);
        assertThat(testCustomerInvoiceData.getIban()).isEqualTo(DEFAULT_IBAN);
        assertThat(testCustomerInvoiceData.getWebUrl()).isEqualTo(DEFAULT_WEB_URL);
        assertThat(testCustomerInvoiceData.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCustomerInvoiceData.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void createCustomerInvoiceDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerInvoiceDataRepository.findAll().size();

        // Create the CustomerInvoiceData with an existing ID
        customerInvoiceData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerInvoiceDataMockMvc.perform(post("/api/customer-invoice-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerInvoiceData)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerInvoiceData in the database
        List<CustomerInvoiceData> customerInvoiceDataList = customerInvoiceDataRepository.findAll();
        assertThat(customerInvoiceDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkOwnNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerInvoiceDataRepository.findAll().size();
        // set the field null
        customerInvoiceData.setOwnName(null);

        // Create the CustomerInvoiceData, which fails.


        restCustomerInvoiceDataMockMvc.perform(post("/api/customer-invoice-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerInvoiceData)))
            .andExpect(status().isBadRequest());

        List<CustomerInvoiceData> customerInvoiceDataList = customerInvoiceDataRepository.findAll();
        assertThat(customerInvoiceDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerInvoiceData() throws Exception {
        // Initialize the database
        customerInvoiceDataRepository.saveAndFlush(customerInvoiceData);

        // Get all the customerInvoiceDataList
        restCustomerInvoiceDataMockMvc.perform(get("/api/customer-invoice-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerInvoiceData.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].ownName").value(hasItem(DEFAULT_OWN_NAME)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].registrationNumber").value(hasItem(DEFAULT_REGISTRATION_NUMBER)))
            .andExpect(jsonPath("$.[*].vatNumber").value(hasItem(DEFAULT_VAT_NUMBER)))
            .andExpect(jsonPath("$.[*].bankAccountNumber").value(hasItem(DEFAULT_BANK_ACCOUNT_NUMBER)))
            .andExpect(jsonPath("$.[*].iban").value(hasItem(DEFAULT_IBAN)))
            .andExpect(jsonPath("$.[*].webUrl").value(hasItem(DEFAULT_WEB_URL)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomerInvoiceData() throws Exception {
        // Initialize the database
        customerInvoiceDataRepository.saveAndFlush(customerInvoiceData);

        // Get the customerInvoiceData
        restCustomerInvoiceDataMockMvc.perform(get("/api/customer-invoice-data/{id}", customerInvoiceData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerInvoiceData.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.ownName").value(DEFAULT_OWN_NAME))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.registrationNumber").value(DEFAULT_REGISTRATION_NUMBER))
            .andExpect(jsonPath("$.vatNumber").value(DEFAULT_VAT_NUMBER))
            .andExpect(jsonPath("$.bankAccountNumber").value(DEFAULT_BANK_ACCOUNT_NUMBER))
            .andExpect(jsonPath("$.iban").value(DEFAULT_IBAN))
            .andExpect(jsonPath("$.webUrl").value(DEFAULT_WEB_URL))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomerInvoiceData() throws Exception {
        // Get the customerInvoiceData
        restCustomerInvoiceDataMockMvc.perform(get("/api/customer-invoice-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerInvoiceData() throws Exception {
        // Initialize the database
        customerInvoiceDataRepository.saveAndFlush(customerInvoiceData);

        int databaseSizeBeforeUpdate = customerInvoiceDataRepository.findAll().size();

        // Update the customerInvoiceData
        CustomerInvoiceData updatedCustomerInvoiceData = customerInvoiceDataRepository.findById(customerInvoiceData.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerInvoiceData are not directly saved in db
        em.detach(updatedCustomerInvoiceData);
        updatedCustomerInvoiceData
            .companyName(UPDATED_COMPANY_NAME)
            .ownName(UPDATED_OWN_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .postalCode(UPDATED_POSTAL_CODE)
            .country(UPDATED_COUNTRY)
            .registrationNumber(UPDATED_REGISTRATION_NUMBER)
            .vatNumber(UPDATED_VAT_NUMBER)
            .bankAccountNumber(UPDATED_BANK_ACCOUNT_NUMBER)
            .iban(UPDATED_IBAN)
            .webUrl(UPDATED_WEB_URL)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restCustomerInvoiceDataMockMvc.perform(put("/api/customer-invoice-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerInvoiceData)))
            .andExpect(status().isOk());

        // Validate the CustomerInvoiceData in the database
        List<CustomerInvoiceData> customerInvoiceDataList = customerInvoiceDataRepository.findAll();
        assertThat(customerInvoiceDataList).hasSize(databaseSizeBeforeUpdate);
        CustomerInvoiceData testCustomerInvoiceData = customerInvoiceDataList.get(customerInvoiceDataList.size() - 1);
        assertThat(testCustomerInvoiceData.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testCustomerInvoiceData.getOwnName()).isEqualTo(UPDATED_OWN_NAME);
        assertThat(testCustomerInvoiceData.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCustomerInvoiceData.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testCustomerInvoiceData.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testCustomerInvoiceData.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCustomerInvoiceData.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testCustomerInvoiceData.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testCustomerInvoiceData.getRegistrationNumber()).isEqualTo(UPDATED_REGISTRATION_NUMBER);
        assertThat(testCustomerInvoiceData.getVatNumber()).isEqualTo(UPDATED_VAT_NUMBER);
        assertThat(testCustomerInvoiceData.getBankAccountNumber()).isEqualTo(UPDATED_BANK_ACCOUNT_NUMBER);
        assertThat(testCustomerInvoiceData.getIban()).isEqualTo(UPDATED_IBAN);
        assertThat(testCustomerInvoiceData.getWebUrl()).isEqualTo(UPDATED_WEB_URL);
        assertThat(testCustomerInvoiceData.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCustomerInvoiceData.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerInvoiceData() throws Exception {
        int databaseSizeBeforeUpdate = customerInvoiceDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerInvoiceDataMockMvc.perform(put("/api/customer-invoice-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerInvoiceData)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerInvoiceData in the database
        List<CustomerInvoiceData> customerInvoiceDataList = customerInvoiceDataRepository.findAll();
        assertThat(customerInvoiceDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerInvoiceData() throws Exception {
        // Initialize the database
        customerInvoiceDataRepository.saveAndFlush(customerInvoiceData);

        int databaseSizeBeforeDelete = customerInvoiceDataRepository.findAll().size();

        // Delete the customerInvoiceData
        restCustomerInvoiceDataMockMvc.perform(delete("/api/customer-invoice-data/{id}", customerInvoiceData.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerInvoiceData> customerInvoiceDataList = customerInvoiceDataRepository.findAll();
        assertThat(customerInvoiceDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
