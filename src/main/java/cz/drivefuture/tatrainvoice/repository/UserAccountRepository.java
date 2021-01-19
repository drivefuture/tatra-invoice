package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.UserAccount;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserAccount entity.
 */
@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
}
