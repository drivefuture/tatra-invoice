package cz.drivefuture.tatrainvoice.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import cz.drivefuture.tatrainvoice.web.rest.TestUtil;

public class CustomerInvoiceDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerInvoiceData.class);
        CustomerInvoiceData customerInvoiceData1 = new CustomerInvoiceData();
        customerInvoiceData1.setId(1L);
        CustomerInvoiceData customerInvoiceData2 = new CustomerInvoiceData();
        customerInvoiceData2.setId(customerInvoiceData1.getId());
        assertThat(customerInvoiceData1).isEqualTo(customerInvoiceData2);
        customerInvoiceData2.setId(2L);
        assertThat(customerInvoiceData1).isNotEqualTo(customerInvoiceData2);
        customerInvoiceData1.setId(null);
        assertThat(customerInvoiceData1).isNotEqualTo(customerInvoiceData2);
    }
}
