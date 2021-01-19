package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.CustomerDeliveryData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CustomerDeliveryData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerDeliveryDataRepository extends JpaRepository<CustomerDeliveryData, Long> {
}
