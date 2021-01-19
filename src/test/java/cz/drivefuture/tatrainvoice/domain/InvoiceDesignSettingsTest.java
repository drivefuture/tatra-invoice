package cz.drivefuture.tatrainvoice.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import cz.drivefuture.tatrainvoice.web.rest.TestUtil;

public class InvoiceDesignSettingsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceDesignSettings.class);
        InvoiceDesignSettings invoiceDesignSettings1 = new InvoiceDesignSettings();
        invoiceDesignSettings1.setId(1L);
        InvoiceDesignSettings invoiceDesignSettings2 = new InvoiceDesignSettings();
        invoiceDesignSettings2.setId(invoiceDesignSettings1.getId());
        assertThat(invoiceDesignSettings1).isEqualTo(invoiceDesignSettings2);
        invoiceDesignSettings2.setId(2L);
        assertThat(invoiceDesignSettings1).isNotEqualTo(invoiceDesignSettings2);
        invoiceDesignSettings1.setId(null);
        assertThat(invoiceDesignSettings1).isNotEqualTo(invoiceDesignSettings2);
    }
}
