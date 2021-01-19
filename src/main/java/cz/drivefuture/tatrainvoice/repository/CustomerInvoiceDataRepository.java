package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.CustomerInvoiceData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CustomerInvoiceData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerInvoiceDataRepository extends JpaRepository<CustomerInvoiceData, Long> {
}
