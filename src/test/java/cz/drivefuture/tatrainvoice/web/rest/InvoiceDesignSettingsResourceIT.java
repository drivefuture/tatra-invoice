package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.TatraInvoiceApp;
import cz.drivefuture.tatrainvoice.domain.InvoiceDesignSettings;
import cz.drivefuture.tatrainvoice.domain.InvoiceDesignTemplate;
import cz.drivefuture.tatrainvoice.repository.InvoiceDesignSettingsRepository;

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
 * Integration tests for the {@link InvoiceDesignSettingsResource} REST controller.
 */
@SpringBootTest(classes = TatraInvoiceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InvoiceDesignSettingsResourceIT {

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_SIGNATURE_AND_STAMP = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_SIGNATURE_AND_STAMP = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_SIGNATURE_AND_STAMP_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_SIGNATURE_AND_STAMP_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private InvoiceDesignSettingsRepository invoiceDesignSettingsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvoiceDesignSettingsMockMvc;

    private InvoiceDesignSettings invoiceDesignSettings;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvoiceDesignSettings createEntity(EntityManager em) {
        InvoiceDesignSettings invoiceDesignSettings = new InvoiceDesignSettings()
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .signatureAndStamp(DEFAULT_SIGNATURE_AND_STAMP)
            .signatureAndStampContentType(DEFAULT_SIGNATURE_AND_STAMP_CONTENT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        // Add required entity
        InvoiceDesignTemplate invoiceDesignTemplate;
        if (TestUtil.findAll(em, InvoiceDesignTemplate.class).isEmpty()) {
            invoiceDesignTemplate = InvoiceDesignTemplateResourceIT.createEntity(em);
            em.persist(invoiceDesignTemplate);
            em.flush();
        } else {
            invoiceDesignTemplate = TestUtil.findAll(em, InvoiceDesignTemplate.class).get(0);
        }
        invoiceDesignSettings.setTemplate(invoiceDesignTemplate);
        return invoiceDesignSettings;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvoiceDesignSettings createUpdatedEntity(EntityManager em) {
        InvoiceDesignSettings invoiceDesignSettings = new InvoiceDesignSettings()
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .signatureAndStamp(UPDATED_SIGNATURE_AND_STAMP)
            .signatureAndStampContentType(UPDATED_SIGNATURE_AND_STAMP_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        // Add required entity
        InvoiceDesignTemplate invoiceDesignTemplate;
        if (TestUtil.findAll(em, InvoiceDesignTemplate.class).isEmpty()) {
            invoiceDesignTemplate = InvoiceDesignTemplateResourceIT.createUpdatedEntity(em);
            em.persist(invoiceDesignTemplate);
            em.flush();
        } else {
            invoiceDesignTemplate = TestUtil.findAll(em, InvoiceDesignTemplate.class).get(0);
        }
        invoiceDesignSettings.setTemplate(invoiceDesignTemplate);
        return invoiceDesignSettings;
    }

    @BeforeEach
    public void initTest() {
        invoiceDesignSettings = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoiceDesignSettings() throws Exception {
        int databaseSizeBeforeCreate = invoiceDesignSettingsRepository.findAll().size();
        // Create the InvoiceDesignSettings
        restInvoiceDesignSettingsMockMvc.perform(post("/api/invoice-design-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignSettings)))
            .andExpect(status().isCreated());

        // Validate the InvoiceDesignSettings in the database
        List<InvoiceDesignSettings> invoiceDesignSettingsList = invoiceDesignSettingsRepository.findAll();
        assertThat(invoiceDesignSettingsList).hasSize(databaseSizeBeforeCreate + 1);
        InvoiceDesignSettings testInvoiceDesignSettings = invoiceDesignSettingsList.get(invoiceDesignSettingsList.size() - 1);
        assertThat(testInvoiceDesignSettings.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testInvoiceDesignSettings.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testInvoiceDesignSettings.getSignatureAndStamp()).isEqualTo(DEFAULT_SIGNATURE_AND_STAMP);
        assertThat(testInvoiceDesignSettings.getSignatureAndStampContentType()).isEqualTo(DEFAULT_SIGNATURE_AND_STAMP_CONTENT_TYPE);
        assertThat(testInvoiceDesignSettings.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testInvoiceDesignSettings.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void createInvoiceDesignSettingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceDesignSettingsRepository.findAll().size();

        // Create the InvoiceDesignSettings with an existing ID
        invoiceDesignSettings.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceDesignSettingsMockMvc.perform(post("/api/invoice-design-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignSettings)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceDesignSettings in the database
        List<InvoiceDesignSettings> invoiceDesignSettingsList = invoiceDesignSettingsRepository.findAll();
        assertThat(invoiceDesignSettingsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInvoiceDesignSettings() throws Exception {
        // Initialize the database
        invoiceDesignSettingsRepository.saveAndFlush(invoiceDesignSettings);

        // Get all the invoiceDesignSettingsList
        restInvoiceDesignSettingsMockMvc.perform(get("/api/invoice-design-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoiceDesignSettings.getId().intValue())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].signatureAndStampContentType").value(hasItem(DEFAULT_SIGNATURE_AND_STAMP_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].signatureAndStamp").value(hasItem(Base64Utils.encodeToString(DEFAULT_SIGNATURE_AND_STAMP))))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getInvoiceDesignSettings() throws Exception {
        // Initialize the database
        invoiceDesignSettingsRepository.saveAndFlush(invoiceDesignSettings);

        // Get the invoiceDesignSettings
        restInvoiceDesignSettingsMockMvc.perform(get("/api/invoice-design-settings/{id}", invoiceDesignSettings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(invoiceDesignSettings.getId().intValue()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.signatureAndStampContentType").value(DEFAULT_SIGNATURE_AND_STAMP_CONTENT_TYPE))
            .andExpect(jsonPath("$.signatureAndStamp").value(Base64Utils.encodeToString(DEFAULT_SIGNATURE_AND_STAMP)))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInvoiceDesignSettings() throws Exception {
        // Get the invoiceDesignSettings
        restInvoiceDesignSettingsMockMvc.perform(get("/api/invoice-design-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoiceDesignSettings() throws Exception {
        // Initialize the database
        invoiceDesignSettingsRepository.saveAndFlush(invoiceDesignSettings);

        int databaseSizeBeforeUpdate = invoiceDesignSettingsRepository.findAll().size();

        // Update the invoiceDesignSettings
        InvoiceDesignSettings updatedInvoiceDesignSettings = invoiceDesignSettingsRepository.findById(invoiceDesignSettings.getId()).get();
        // Disconnect from session so that the updates on updatedInvoiceDesignSettings are not directly saved in db
        em.detach(updatedInvoiceDesignSettings);
        updatedInvoiceDesignSettings
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .signatureAndStamp(UPDATED_SIGNATURE_AND_STAMP)
            .signatureAndStampContentType(UPDATED_SIGNATURE_AND_STAMP_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restInvoiceDesignSettingsMockMvc.perform(put("/api/invoice-design-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvoiceDesignSettings)))
            .andExpect(status().isOk());

        // Validate the InvoiceDesignSettings in the database
        List<InvoiceDesignSettings> invoiceDesignSettingsList = invoiceDesignSettingsRepository.findAll();
        assertThat(invoiceDesignSettingsList).hasSize(databaseSizeBeforeUpdate);
        InvoiceDesignSettings testInvoiceDesignSettings = invoiceDesignSettingsList.get(invoiceDesignSettingsList.size() - 1);
        assertThat(testInvoiceDesignSettings.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testInvoiceDesignSettings.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testInvoiceDesignSettings.getSignatureAndStamp()).isEqualTo(UPDATED_SIGNATURE_AND_STAMP);
        assertThat(testInvoiceDesignSettings.getSignatureAndStampContentType()).isEqualTo(UPDATED_SIGNATURE_AND_STAMP_CONTENT_TYPE);
        assertThat(testInvoiceDesignSettings.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testInvoiceDesignSettings.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoiceDesignSettings() throws Exception {
        int databaseSizeBeforeUpdate = invoiceDesignSettingsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoiceDesignSettingsMockMvc.perform(put("/api/invoice-design-settings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoiceDesignSettings)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceDesignSettings in the database
        List<InvoiceDesignSettings> invoiceDesignSettingsList = invoiceDesignSettingsRepository.findAll();
        assertThat(invoiceDesignSettingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoiceDesignSettings() throws Exception {
        // Initialize the database
        invoiceDesignSettingsRepository.saveAndFlush(invoiceDesignSettings);

        int databaseSizeBeforeDelete = invoiceDesignSettingsRepository.findAll().size();

        // Delete the invoiceDesignSettings
        restInvoiceDesignSettingsMockMvc.perform(delete("/api/invoice-design-settings/{id}", invoiceDesignSettings.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InvoiceDesignSettings> invoiceDesignSettingsList = invoiceDesignSettingsRepository.findAll();
        assertThat(invoiceDesignSettingsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
