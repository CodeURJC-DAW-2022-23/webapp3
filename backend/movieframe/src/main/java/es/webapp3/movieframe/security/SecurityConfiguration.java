package es.webapp3.movieframe.security;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    RepositoryUserDetailsService userDetailsService;

    @Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10, new SecureRandom());
	}

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailsService userDetailsService) 
    throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userDetailsService)
        .passwordEncoder(bCryptPasswordEncoder)
        .and()
        .build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Public pages
        http.authorizeHttpRequests().requestMatchers("/").permitAll();
        http.authorizeHttpRequests().requestMatchers("/login").permitAll();
        http.authorizeHttpRequests().requestMatchers("/sign_up").permitAll();

        // Private pages (all other pages)
        http.authorizeHttpRequests().requestMatchers("/show_user_reviews").hasAnyRole("USER");
        http.authorizeHttpRequests().requestMatchers("/show_reviews").hasAnyRole("ADMIN");
        http.authorizeHttpRequests().requestMatchers("/send_recommendations").hasAnyRole("ADMIN");
        http.authorizeHttpRequests().anyRequest().authenticated();

        // Login form
        http.formLogin().loginPage("/login");
        http.formLogin().usernameParameter("username");
        http.formLogin().passwordParameter("password");

        // Disable CSRF at the moment
        http.csrf().disable();
        return http.build();
    }

}

