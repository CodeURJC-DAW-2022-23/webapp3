package es.webapp3.movieframe.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class webController {

    @GetMapping("/")
    public String home(){
        return "initial_screen.html";
    }

    @GetMapping("/log_in")
    public String login(){
        return "login_screen.html";
    }

    @GetMapping("/log_error")
    public String loginerror(){
        return "404.html";
    }

    @GetMapping("/show_reviews")
    public String showReviews(){
        return "modification_reviews_screen.html";
    }

    @GetMapping("/sign_up")
    public String signup(){
        return "signup_screen.html";
    }
    
}
