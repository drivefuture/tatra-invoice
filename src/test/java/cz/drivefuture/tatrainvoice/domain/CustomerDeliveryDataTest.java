package cz.drivefuture.tatrainvoice.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import cz.drivefuture.tatrainvoice.web.rest.TestUtil;

public class CustomerDeliveryDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerDeliveryData.class);
        CustomerDeliveryData customerDeliveryData1 = new CustomerDeliveryData();
        customerDeliveryData1.setId(1L);
        CustomerDeliveryData customerDeliveryData2 = new CustomerDeliveryData();
        customerDeliveryData2.setId(customerDeliveryData1.getId());
        assertThat(customerDeliveryData1).isEqualTo(customerDeliveryData2);
        customerDeliveryData2.setId(2L);
        assertThat(customerDeliveryData1).isNotEqualTo(customerDeliveryData2);
        customerDeliveryData1.setId(null);
        assertThat(customerDeliveryData1).isNotEqualTo(customerDeliveryData2);
    }
}
