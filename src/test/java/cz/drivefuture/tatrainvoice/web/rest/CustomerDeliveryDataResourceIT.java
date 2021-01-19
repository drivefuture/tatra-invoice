package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.TatraInvoiceApp;
import cz.drivefuture.tatrainvoice.domain.CustomerDeliveryData;
import cz.drivefuture.tatrainvoice.repository.CustomerDeliveryDataRepository;

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
 * Integration tests for the {@link CustomerDeliveryDataResource} REST controller.
 */
@SpringBootTest(classes = TatraInvoiceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerDeliveryDataResourceIT {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

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

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CustomerDeliveryDataRepository customerDeliveryDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerDeliveryDataMockMvc;

    private CustomerDeliveryData customerDeliveryData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerDeliveryData createEntity(EntityManager em) {
        CustomerDeliveryData customerDeliveryData = new CustomerDeliveryData()
            .companyName(DEFAULT_COMPANY_NAME)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .street(DEFAULT_STREET)
            .city(DEFAULT_CITY)
            .postalCode(DEFAULT_POSTAL_CODE)
            .country(DEFAULT_COUNTRY)
            .telephone(DEFAULT_TELEPHONE)
            .createdDate(DEFAULT_CREATED_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        return customerDeliveryData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerDeliveryData createUpdatedEntity(EntityManager em) {
        CustomerDeliveryData customerDeliveryData = new CustomerDeliveryData()
            .companyName(UPDATED_COMPANY_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .postalCode(UPDATED_POSTAL_CODE)
            .country(UPDATED_COUNTRY)
            .telephone(UPDATED_TELEPHONE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        return customerDeliveryData;
    }

    @BeforeEach
    public void initTest() {
        customerDeliveryData = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerDeliveryData() throws Exception {
        int databaseSizeBeforeCreate = customerDeliveryDataRepository.findAll().size();
        // Create the CustomerDeliveryData
        restCustomerDeliveryDataMockMvc.perform(post("/api/customer-delivery-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDeliveryData)))
            .andExpect(status().isCreated());

        // Validate the CustomerDeliveryData in the database
        List<CustomerDeliveryData> customerDeliveryDataList = customerDeliveryDataRepository.findAll();
        assertThat(customerDeliveryDataList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerDeliveryData testCustomerDeliveryData = customerDeliveryDataList.get(customerDeliveryDataList.size() - 1);
        assertThat(testCustomerDeliveryData.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testCustomerDeliveryData.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCustomerDeliveryData.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testCustomerDeliveryData.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testCustomerDeliveryData.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testCustomerDeliveryData.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testCustomerDeliveryData.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testCustomerDeliveryData.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testCustomerDeliveryData.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCustomerDeliveryData.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void createCustomerDeliveryDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerDeliveryDataRepository.findAll().size();

        // Create the CustomerDeliveryData with an existing ID
        customerDeliveryData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerDeliveryDataMockMvc.perform(post("/api/customer-delivery-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDeliveryData)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerDeliveryData in the database
        List<CustomerDeliveryData> customerDeliveryDataList = customerDeliveryDataRepository.findAll();
        assertThat(customerDeliveryDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCustomerDeliveryData() throws Exception {
        // Initialize the database
        customerDeliveryDataRepository.saveAndFlush(customerDeliveryData);

        // Get all the customerDeliveryDataList
        restCustomerDeliveryDataMockMvc.perform(get("/api/customer-delivery-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerDeliveryData.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomerDeliveryData() throws Exception {
        // Initialize the database
        customerDeliveryDataRepository.saveAndFlush(customerDeliveryData);

        // Get the customerDeliveryData
        restCustomerDeliveryDataMockMvc.perform(get("/api/customer-delivery-data/{id}", customerDeliveryData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerDeliveryData.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomerDeliveryData() throws Exception {
        // Get the customerDeliveryData
        restCustomerDeliveryDataMockMvc.perform(get("/api/customer-delivery-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerDeliveryData() throws Exception {
        // Initialize the database
        customerDeliveryDataRepository.saveAndFlush(customerDeliveryData);

        int databaseSizeBeforeUpdate = customerDeliveryDataRepository.findAll().size();

        // Update the customerDeliveryData
        CustomerDeliveryData updatedCustomerDeliveryData = customerDeliveryDataRepository.findById(customerDeliveryData.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerDeliveryData are not directly saved in db
        em.detach(updatedCustomerDeliveryData);
        updatedCustomerDeliveryData
            .companyName(UPDATED_COMPANY_NAME)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .postalCode(UPDATED_POSTAL_CODE)
            .country(UPDATED_COUNTRY)
            .telephone(UPDATED_TELEPHONE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restCustomerDeliveryDataMockMvc.perform(put("/api/customer-delivery-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerDeliveryData)))
            .andExpect(status().isOk());

        // Validate the CustomerDeliveryData in the database
        List<CustomerDeliveryData> customerDeliveryDataList = customerDeliveryDataRepository.findAll();
        assertThat(customerDeliveryDataList).hasSize(databaseSizeBeforeUpdate);
        CustomerDeliveryData testCustomerDeliveryData = customerDeliveryDataList.get(customerDeliveryDataList.size() - 1);
        assertThat(testCustomerDeliveryData.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testCustomerDeliveryData.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCustomerDeliveryData.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testCustomerDeliveryData.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testCustomerDeliveryData.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCustomerDeliveryData.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testCustomerDeliveryData.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testCustomerDeliveryData.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testCustomerDeliveryData.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCustomerDeliveryData.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerDeliveryData() throws Exception {
        int databaseSizeBeforeUpdate = customerDeliveryDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerDeliveryDataMockMvc.perform(put("/api/customer-delivery-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDeliveryData)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerDeliveryData in the database
        List<CustomerDeliveryData> customerDeliveryDataList = customerDeliveryDataRepository.findAll();
        assertThat(customerDeliveryDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerDeliveryData() throws Exception {
        // Initialize the database
        customerDeliveryDataRepository.saveAndFlush(customerDeliveryData);

        int databaseSizeBeforeDelete = customerDeliveryDataRepository.findAll().size();

        // Delete the customerDeliveryData
        restCustomerDeliveryDataMockMvc.perform(delete("/api/customer-delivery-data/{id}", customerDeliveryData.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerDeliveryData> customerDeliveryDataList = customerDeliveryDataRepository.findAll();
        assertThat(customerDeliveryDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
