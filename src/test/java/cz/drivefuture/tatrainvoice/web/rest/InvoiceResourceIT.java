package cz.drivefuture.tatrainvoice.web.rest;

import cz.drivefuture.tatrainvoice.TatraInvoiceApp;
import cz.drivefuture.tatrainvoice.domain.Invoice;
import cz.drivefuture.tatrainvoice.domain.Company;
import cz.drivefuture.tatrainvoice.domain.Customer;
import cz.drivefuture.tatrainvoice.repository.InvoiceRepository;

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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import cz.drivefuture.tatrainvoice.domain.enumeration.PaymentMethod;
import cz.drivefuture.tatrainvoice.domain.enumeration.Language;
/**
 * Integration tests for the {@link InvoiceResource} REST controller.
 */
@SpringBootTest(classes = TatraInvoiceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InvoiceResourceIT {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_ISSUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ISSUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final PaymentMethod DEFAULT_PAYMENT_METHOD = PaymentMethod.BANK_TRANSFER;
    private static final PaymentMethod UPDATED_PAYMENT_METHOD = PaymentMethod.CASH;

    private static final Integer DEFAULT_DUE_PERIOD = 1;
    private static final Integer UPDATED_DUE_PERIOD = 2;

    private static final Instant DEFAULT_DUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PAYMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAYMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_TAX_POINT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TAX_POINT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_TOTAL_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final String DEFAULT_VARIABLE_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_VARIABLE_SYMBOL = "BBBBBBBBBB";

    private static final String DEFAULT_CONSTANT_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_CONSTANT_SYMBOL = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIAL_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_SPECIAL_SYMBOL = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_NUMBER = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.CZECH;
    private static final Language UPDATED_LANGUAGE = Language.SLOVAK;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String DEFAULT_BEFORE_INVOICE_ITEMS_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_BEFORE_INVOICE_ITEMS_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_INVOICE_FOOTER_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_FOOTER_TEXT = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PDF_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PDF_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PDF_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PDF_FILE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInvoiceMockMvc;

    private Invoice invoice;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invoice createEntity(EntityManager em) {
        Invoice invoice = new Invoice()
            .number(DEFAULT_NUMBER)
            .issueDate(DEFAULT_ISSUE_DATE)
            .paymentMethod(DEFAULT_PAYMENT_METHOD)
            .duePeriod(DEFAULT_DUE_PERIOD)
            .dueDate(DEFAULT_DUE_DATE)
            .paymentDate(DEFAULT_PAYMENT_DATE)
            .taxPoint(DEFAULT_TAX_POINT)
            .totalAmount(DEFAULT_TOTAL_AMOUNT)
            .currency(DEFAULT_CURRENCY)
            .variableSymbol(DEFAULT_VARIABLE_SYMBOL)
            .constantSymbol(DEFAULT_CONSTANT_SYMBOL)
            .specialSymbol(DEFAULT_SPECIAL_SYMBOL)
            .orderNumber(DEFAULT_ORDER_NUMBER)
            .language(DEFAULT_LANGUAGE)
            .comment(DEFAULT_COMMENT)
            .beforeInvoiceItemsText(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT)
            .invoiceFooterText(DEFAULT_INVOICE_FOOTER_TEXT)
            .pdfFile(DEFAULT_PDF_FILE)
            .pdfFileContentType(DEFAULT_PDF_FILE_CONTENT_TYPE)
            .createdDate(DEFAULT_CREATED_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        // Add required entity
        Company company;
        if (TestUtil.findAll(em, Company.class).isEmpty()) {
            company = CompanyResourceIT.createEntity(em);
            em.persist(company);
            em.flush();
        } else {
            company = TestUtil.findAll(em, Company.class).get(0);
        }
        invoice.setCompany(company);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        invoice.setCustomer(customer);
        return invoice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invoice createUpdatedEntity(EntityManager em) {
        Invoice invoice = new Invoice()
            .number(UPDATED_NUMBER)
            .issueDate(UPDATED_ISSUE_DATE)
            .paymentMethod(UPDATED_PAYMENT_METHOD)
            .duePeriod(UPDATED_DUE_PERIOD)
            .dueDate(UPDATED_DUE_DATE)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .taxPoint(UPDATED_TAX_POINT)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .currency(UPDATED_CURRENCY)
            .variableSymbol(UPDATED_VARIABLE_SYMBOL)
            .constantSymbol(UPDATED_CONSTANT_SYMBOL)
            .specialSymbol(UPDATED_SPECIAL_SYMBOL)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .language(UPDATED_LANGUAGE)
            .comment(UPDATED_COMMENT)
            .beforeInvoiceItemsText(UPDATED_BEFORE_INVOICE_ITEMS_TEXT)
            .invoiceFooterText(UPDATED_INVOICE_FOOTER_TEXT)
            .pdfFile(UPDATED_PDF_FILE)
            .pdfFileContentType(UPDATED_PDF_FILE_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        // Add required entity
        Company company;
        if (TestUtil.findAll(em, Company.class).isEmpty()) {
            company = CompanyResourceIT.createUpdatedEntity(em);
            em.persist(company);
            em.flush();
        } else {
            company = TestUtil.findAll(em, Company.class).get(0);
        }
        invoice.setCompany(company);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createUpdatedEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        invoice.setCustomer(customer);
        return invoice;
    }

    @BeforeEach
    public void initTest() {
        invoice = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoice() throws Exception {
        int databaseSizeBeforeCreate = invoiceRepository.findAll().size();
        // Create the Invoice
        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isCreated());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeCreate + 1);
        Invoice testInvoice = invoiceList.get(invoiceList.size() - 1);
        assertThat(testInvoice.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testInvoice.getIssueDate()).isEqualTo(DEFAULT_ISSUE_DATE);
        assertThat(testInvoice.getPaymentMethod()).isEqualTo(DEFAULT_PAYMENT_METHOD);
        assertThat(testInvoice.getDuePeriod()).isEqualTo(DEFAULT_DUE_PERIOD);
        assertThat(testInvoice.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testInvoice.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testInvoice.getTaxPoint()).isEqualTo(DEFAULT_TAX_POINT);
        assertThat(testInvoice.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testInvoice.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testInvoice.getVariableSymbol()).isEqualTo(DEFAULT_VARIABLE_SYMBOL);
        assertThat(testInvoice.getConstantSymbol()).isEqualTo(DEFAULT_CONSTANT_SYMBOL);
        assertThat(testInvoice.getSpecialSymbol()).isEqualTo(DEFAULT_SPECIAL_SYMBOL);
        assertThat(testInvoice.getOrderNumber()).isEqualTo(DEFAULT_ORDER_NUMBER);
        assertThat(testInvoice.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testInvoice.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testInvoice.getBeforeInvoiceItemsText()).isEqualTo(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT);
        assertThat(testInvoice.getInvoiceFooterText()).isEqualTo(DEFAULT_INVOICE_FOOTER_TEXT);
        assertThat(testInvoice.getPdfFile()).isEqualTo(DEFAULT_PDF_FILE);
        assertThat(testInvoice.getPdfFileContentType()).isEqualTo(DEFAULT_PDF_FILE_CONTENT_TYPE);
        assertThat(testInvoice.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testInvoice.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void createInvoiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceRepository.findAll().size();

        // Create the Invoice with an existing ID
        invoice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIssueDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setIssueDate(null);

        // Create the Invoice, which fails.


        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaymentMethodIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setPaymentMethod(null);

        // Create the Invoice, which fails.


        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDuePeriodIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setDuePeriod(null);

        // Create the Invoice, which fails.


        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDueDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setDueDate(null);

        // Create the Invoice, which fails.


        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurrencyIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setCurrency(null);

        // Create the Invoice, which fails.


        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLanguageIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceRepository.findAll().size();
        // set the field null
        invoice.setLanguage(null);

        // Create the Invoice, which fails.


        restInvoiceMockMvc.perform(post("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInvoices() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        // Get all the invoiceList
        restInvoiceMockMvc.perform(get("/api/invoices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoice.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].issueDate").value(hasItem(DEFAULT_ISSUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentMethod").value(hasItem(DEFAULT_PAYMENT_METHOD.toString())))
            .andExpect(jsonPath("$.[*].duePeriod").value(hasItem(DEFAULT_DUE_PERIOD)))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(DEFAULT_PAYMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].taxPoint").value(hasItem(DEFAULT_TAX_POINT.toString())))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY)))
            .andExpect(jsonPath("$.[*].variableSymbol").value(hasItem(DEFAULT_VARIABLE_SYMBOL)))
            .andExpect(jsonPath("$.[*].constantSymbol").value(hasItem(DEFAULT_CONSTANT_SYMBOL)))
            .andExpect(jsonPath("$.[*].specialSymbol").value(hasItem(DEFAULT_SPECIAL_SYMBOL)))
            .andExpect(jsonPath("$.[*].orderNumber").value(hasItem(DEFAULT_ORDER_NUMBER)))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].beforeInvoiceItemsText").value(hasItem(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT.toString())))
            .andExpect(jsonPath("$.[*].invoiceFooterText").value(hasItem(DEFAULT_INVOICE_FOOTER_TEXT.toString())))
            .andExpect(jsonPath("$.[*].pdfFileContentType").value(hasItem(DEFAULT_PDF_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pdfFile").value(hasItem(Base64Utils.encodeToString(DEFAULT_PDF_FILE))))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getInvoice() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        // Get the invoice
        restInvoiceMockMvc.perform(get("/api/invoices/{id}", invoice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(invoice.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.issueDate").value(DEFAULT_ISSUE_DATE.toString()))
            .andExpect(jsonPath("$.paymentMethod").value(DEFAULT_PAYMENT_METHOD.toString()))
            .andExpect(jsonPath("$.duePeriod").value(DEFAULT_DUE_PERIOD))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.paymentDate").value(DEFAULT_PAYMENT_DATE.toString()))
            .andExpect(jsonPath("$.taxPoint").value(DEFAULT_TAX_POINT.toString()))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.intValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY))
            .andExpect(jsonPath("$.variableSymbol").value(DEFAULT_VARIABLE_SYMBOL))
            .andExpect(jsonPath("$.constantSymbol").value(DEFAULT_CONSTANT_SYMBOL))
            .andExpect(jsonPath("$.specialSymbol").value(DEFAULT_SPECIAL_SYMBOL))
            .andExpect(jsonPath("$.orderNumber").value(DEFAULT_ORDER_NUMBER))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.beforeInvoiceItemsText").value(DEFAULT_BEFORE_INVOICE_ITEMS_TEXT.toString()))
            .andExpect(jsonPath("$.invoiceFooterText").value(DEFAULT_INVOICE_FOOTER_TEXT.toString()))
            .andExpect(jsonPath("$.pdfFileContentType").value(DEFAULT_PDF_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.pdfFile").value(Base64Utils.encodeToString(DEFAULT_PDF_FILE)))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInvoice() throws Exception {
        // Get the invoice
        restInvoiceMockMvc.perform(get("/api/invoices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoice() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        int databaseSizeBeforeUpdate = invoiceRepository.findAll().size();

        // Update the invoice
        Invoice updatedInvoice = invoiceRepository.findById(invoice.getId()).get();
        // Disconnect from session so that the updates on updatedInvoice are not directly saved in db
        em.detach(updatedInvoice);
        updatedInvoice
            .number(UPDATED_NUMBER)
            .issueDate(UPDATED_ISSUE_DATE)
            .paymentMethod(UPDATED_PAYMENT_METHOD)
            .duePeriod(UPDATED_DUE_PERIOD)
            .dueDate(UPDATED_DUE_DATE)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .taxPoint(UPDATED_TAX_POINT)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .currency(UPDATED_CURRENCY)
            .variableSymbol(UPDATED_VARIABLE_SYMBOL)
            .constantSymbol(UPDATED_CONSTANT_SYMBOL)
            .specialSymbol(UPDATED_SPECIAL_SYMBOL)
            .orderNumber(UPDATED_ORDER_NUMBER)
            .language(UPDATED_LANGUAGE)
            .comment(UPDATED_COMMENT)
            .beforeInvoiceItemsText(UPDATED_BEFORE_INVOICE_ITEMS_TEXT)
            .invoiceFooterText(UPDATED_INVOICE_FOOTER_TEXT)
            .pdfFile(UPDATED_PDF_FILE)
            .pdfFileContentType(UPDATED_PDF_FILE_CONTENT_TYPE)
            .createdDate(UPDATED_CREATED_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restInvoiceMockMvc.perform(put("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvoice)))
            .andExpect(status().isOk());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeUpdate);
        Invoice testInvoice = invoiceList.get(invoiceList.size() - 1);
        assertThat(testInvoice.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testInvoice.getIssueDate()).isEqualTo(UPDATED_ISSUE_DATE);
        assertThat(testInvoice.getPaymentMethod()).isEqualTo(UPDATED_PAYMENT_METHOD);
        assertThat(testInvoice.getDuePeriod()).isEqualTo(UPDATED_DUE_PERIOD);
        assertThat(testInvoice.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testInvoice.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testInvoice.getTaxPoint()).isEqualTo(UPDATED_TAX_POINT);
        assertThat(testInvoice.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testInvoice.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testInvoice.getVariableSymbol()).isEqualTo(UPDATED_VARIABLE_SYMBOL);
        assertThat(testInvoice.getConstantSymbol()).isEqualTo(UPDATED_CONSTANT_SYMBOL);
        assertThat(testInvoice.getSpecialSymbol()).isEqualTo(UPDATED_SPECIAL_SYMBOL);
        assertThat(testInvoice.getOrderNumber()).isEqualTo(UPDATED_ORDER_NUMBER);
        assertThat(testInvoice.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testInvoice.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testInvoice.getBeforeInvoiceItemsText()).isEqualTo(UPDATED_BEFORE_INVOICE_ITEMS_TEXT);
        assertThat(testInvoice.getInvoiceFooterText()).isEqualTo(UPDATED_INVOICE_FOOTER_TEXT);
        assertThat(testInvoice.getPdfFile()).isEqualTo(UPDATED_PDF_FILE);
        assertThat(testInvoice.getPdfFileContentType()).isEqualTo(UPDATED_PDF_FILE_CONTENT_TYPE);
        assertThat(testInvoice.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testInvoice.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoice() throws Exception {
        int databaseSizeBeforeUpdate = invoiceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInvoiceMockMvc.perform(put("/api/invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(invoice)))
            .andExpect(status().isBadRequest());

        // Validate the Invoice in the database
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvoice() throws Exception {
        // Initialize the database
        invoiceRepository.saveAndFlush(invoice);

        int databaseSizeBeforeDelete = invoiceRepository.findAll().size();

        // Delete the invoice
        restInvoiceMockMvc.perform(delete("/api/invoices/{id}", invoice.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Invoice> invoiceList = invoiceRepository.findAll();
        assertThat(invoiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
