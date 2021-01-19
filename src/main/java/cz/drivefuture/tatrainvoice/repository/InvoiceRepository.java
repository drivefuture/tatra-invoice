package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.Invoice;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Invoice entity.
 */
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findAllByCompanyId(Long companyId);
}
