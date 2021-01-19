package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.InvoiceDesignSettings;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InvoiceDesignSettings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceDesignSettingsRepository extends JpaRepository<InvoiceDesignSettings, Long> {
}
