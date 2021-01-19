package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.TatraInvoiceApp;
import cz.drivefuture.tatrainvoice.domain.InvoiceDesignTemplate;
import cz.drivefuture.tatrainvoice.repository.InvoiceDesignTemplateRepository;

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

/**
 * Integration tests for the {@link InvoiceDesignTemplateResource} REST controller.
 */
@SpringBootTest(classes = TatraInvoiceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InvoiceDesignTemplateResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_JRXML_TEMPLATE_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_JRXML_TEMPLATE_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_JRXML_TEMPLATE_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_JRXML_TEMPLATE_FILE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private InvoiceDesignTemplateRepository invoiceDesignTemplateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvoiceDesignTemplateMockMvc;

    private InvoiceDesignTemplate invoiceDesignTemplate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvoiceDesignTemplate createEntity(EntityManager em) {
        InvoiceDesignTemplate invoiceDesignTemplate = new InvoiceDesignTemplate()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .jrxmlTemplateFile(DEFAULT_JRXML_TEMPLATE_FILE)
            .jrxmlTemplateFileContentType(DEFAULT_JRXML_TEMPLATE_FILE_CONTENT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        return invoiceDesignTemplate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvoiceDesignTemplate createUpdatedEntity(EntityManager em) {
        InvoiceDesignTemplate invoiceDesignTemplate = new InvoiceDesignTemplate()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .jrxmlTemplateFile(UPDATED_JRXML_TEMPLATE_FILE)
            .jrxmlTemplateFileContentType(UPDATED_JRXML_TEMPLATE_FILE_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        return invoiceDesignTemplate;
    }

    @BeforeEach
    public void initTest() {
        invoiceDesignTemplate = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoiceDesignTemplate() throws Exception {
        int databaseSizeBeforeCreate = invoiceDesignTemplateRepository.findAll().size();
        // Create the InvoiceDesignTemplate
        restInvoiceDesignTemplateMockMvc.perform(post("/api/invoice-design-templates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignTemplate)))
            .andExpect(status().isCreated());

        // Validate the InvoiceDesignTemplate in the database
        List<InvoiceDesignTemplate> invoiceDesignTemplateList = invoiceDesignTemplateRepository.findAll();
        assertThat(invoiceDesignTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        InvoiceDesignTemplate testInvoiceDesignTemplate = invoiceDesignTemplateList.get(invoiceDesignTemplateList.size() - 1);
        assertThat(testInvoiceDesignTemplate.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testInvoiceDesignTemplate.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testInvoiceDesignTemplate.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testInvoiceDesignTemplate.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testInvoiceDesignTemplate.getJrxmlTemplateFile()).isEqualTo(DEFAULT_JRXML_TEMPLATE_FILE);
        assertThat(testInvoiceDesignTemplate.getJrxmlTemplateFileContentType()).isEqualTo(DEFAULT_JRXML_TEMPLATE_FILE_CONTENT_TYPE);
        assertThat(testInvoiceDesignTemplate.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testInvoiceDesignTemplate.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void createInvoiceDesignTemplateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceDesignTemplateRepository.findAll().size();

        // Create the InvoiceDesignTemplate with an existing ID
        invoiceDesignTemplate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceDesignTemplateMockMvc.perform(post("/api/invoice-design-templates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceDesignTemplate in the database
        List<InvoiceDesignTemplate> invoiceDesignTemplateList = invoiceDesignTemplateRepository.findAll();
        assertThat(invoiceDesignTemplateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceDesignTemplateRepository.findAll().size();
        // set the field null
        invoiceDesignTemplate.setName(null);

        // Create the InvoiceDesignTemplate, which fails.


        restInvoiceDesignTemplateMockMvc.perform(post("/api/invoice-design-templates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignTemplate)))
            .andExpect(status().isBadRequest());

        List<InvoiceDesignTemplate> invoiceDesignTemplateList = invoiceDesignTemplateRepository.findAll();
        assertThat(invoiceDesignTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInvoiceDesignTemplates() throws Exception {
        // Initialize the database
        invoiceDesignTemplateRepository.saveAndFlush(invoiceDesignTemplate);

        // Get all the invoiceDesignTemplateList
        restInvoiceDesignTemplateMockMvc.perform(get("/api/invoice-design-templates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoiceDesignTemplate.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].jrxmlTemplateFileContentType").value(hasItem(DEFAULT_JRXML_TEMPLATE_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].jrxmlTemplateFile").value(hasItem(Base64Utils.encodeToString(DEFAULT_JRXML_TEMPLATE_FILE))))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getInvoiceDesignTemplate() throws Exception {
        // Initialize the database
        invoiceDesignTemplateRepository.saveAndFlush(invoiceDesignTemplate);

        // Get the invoiceDesignTemplate
        restInvoiceDesignTemplateMockMvc.perform(get("/api/invoice-design-templates/{id}", invoiceDesignTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(invoiceDesignTemplate.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.jrxmlTemplateFileContentType").value(DEFAULT_JRXML_TEMPLATE_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.jrxmlTemplateFile").value(Base64Utils.encodeToString(DEFAULT_JRXML_TEMPLATE_FILE)))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInvoiceDesignTemplate() throws Exception {
        // Get the invoiceDesignTemplate
        restInvoiceDesignTemplateMockMvc.perform(get("/api/invoice-design-templates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoiceDesignTemplate() throws Exception {
        // Initialize the database
        invoiceDesignTemplateRepository.saveAndFlush(invoiceDesignTemplate);

        int databaseSizeBeforeUpdate = invoiceDesignTemplateRepository.findAll().size();

        // Update the invoiceDesignTemplate
        InvoiceDesignTemplate updatedInvoiceDesignTemplate = invoiceDesignTemplateRepository.findById(invoiceDesignTemplate.getId()).get();
        // Disconnect from session so that the updates on updatedInvoiceDesignTemplate are not directly saved in db
        em.detach(updatedInvoiceDesignTemplate);
        updatedInvoiceDesignTemplate
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .jrxmlTemplateFile(UPDATED_JRXML_TEMPLATE_FILE)
            .jrxmlTemplateFileContentType(UPDATED_JRXML_TEMPLATE_FILE_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restInvoiceDesignTemplateMockMvc.perform(put("/api/invoice-design-templates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvoiceDesignTemplate)))
            .andExpect(status().isOk());

        // Validate the InvoiceDesignTemplate in the database
        List<InvoiceDesignTemplate> invoiceDesignTemplateList = invoiceDesignTemplateRepository.findAll();
        assertThat(invoiceDesignTemplateList).hasSize(databaseSizeBeforeUpdate);
        InvoiceDesignTemplate testInvoiceDesignTemplate = invoiceDesignTemplateList.get(invoiceDesignTemplateList.size() - 1);
        assertThat(testInvoiceDesignTemplate.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testInvoiceDesignTemplate.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testInvoiceDesignTemplate.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testInvoiceDesignTemplate.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testInvoiceDesignTemplate.getJrxmlTemplateFile()).isEqualTo(UPDATED_JRXML_TEMPLATE_FILE);
        assertThat(testInvoiceDesignTemplate.getJrxmlTemplateFileContentType()).isEqualTo(UPDATED_JRXML_TEMPLATE_FILE_CONTENT_TYPE);
        assertThat(testInvoiceDesignTemplate.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testInvoiceDesignTemplate.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoiceDesignTemplate() throws Exception {
        int databaseSizeBeforeUpdate = invoiceDesignTemplateRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoiceDesignTemplateMockMvc.perform(put("/api/invoice-design-templates")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceDesignTemplate in the database
        List<InvoiceDesignTemplate> invoiceDesignTemplateList = invoiceDesignTemplateRepository.findAll();
        assertThat(invoiceDesignTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoiceDesignTemplate() throws Exception {
        // Initialize the database
        invoiceDesignTemplateRepository.saveAndFlush(invoiceDesignTemplate);

        int databaseSizeBeforeDelete = invoiceDesignTemplateRepository.findAll().size();

        // Delete the invoiceDesignTemplate
        restInvoiceDesignTemplateMockMvc.perform(delete("/api/invoice-design-templates/{id}", invoiceDesignTemplate.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InvoiceDesignTemplate> invoiceDesignTemplateList = invoiceDesignTemplateRepository.findAll();
        assertThat(invoiceDesignTemplateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
