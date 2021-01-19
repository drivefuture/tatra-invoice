package cz.drivefuture.tatrainvoice.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import cz.drivefuture.tatrainvoice.web.rest.TestUtil;

public class InvoiceDesignTemplateTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceDesignTemplate.class);
        InvoiceDesignTemplate invoiceDesignTemplate1 = new InvoiceDesignTemplate();
        invoiceDesignTemplate1.setId(1L);
        InvoiceDesignTemplate invoiceDesignTemplate2 = new InvoiceDesignTemplate();
        invoiceDesignTemplate2.setId(invoiceDesignTemplate1.getId());
        assertThat(invoiceDesignTemplate1).isEqualTo(invoiceDesignTemplate2);
        invoiceDesignTemplate2.setId(2L);
        assertThat(invoiceDesignTemplate1).isNotEqualTo(invoiceDesignTemplate2);
        invoiceDesignTemplate1.setId(null);
        assertThat(invoiceDesignTemplate1).isNotEqualTo(invoiceDesignTemplate2);
    }
}
