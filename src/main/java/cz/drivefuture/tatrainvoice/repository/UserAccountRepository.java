package cz.drivefuture.tatrainvoice.repository;

import cz.drivefuture.tatrainvoice.domain.User;
import cz.drivefuture.tatrainvoice.domain.UserAccount;
import java.util.Optional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    String USERS_ACCOUNTS_BY_LOGIN_CACHE = "usersAccountsByLogin";

    @EntityGraph(attributePaths = { "currentCompany", "companies", "user", "user.authorities" })
    //@Cacheable(cacheNames = USERS_ACCOUNTS_BY_LOGIN_CACHE)
    Optional<UserAccount> findOneWithCompaniesAndUserWithUserAuthoritiesByUserLogin(String login);
}
