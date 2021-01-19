package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.InvoiceDesignTemplate;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InvoiceDesignTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceDesignTemplateRepository extends JpaRepository<InvoiceDesignTemplate, Long> {
}
