package com.example.lab.projects.component;

import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

@Component
public class AuditorAwareComponent implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("<unknown>");

        /*
        FIXME No SecurityContextHolder (org.springframework.security.*)
        return Optional.ofNullable(SecurityContextHolder.getContext())
            .map(SecurityContext::getAuthentication)
            .map(Authentication::getPrincipal)
            .map(Jwt.class::cast)
            .map(jwt -> jwt.getClaimAsString("preferred_username"))
            .or(() -> Optional.of("<unknown>"));
         */
    }
}