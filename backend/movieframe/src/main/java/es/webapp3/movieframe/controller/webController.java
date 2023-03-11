package es.webapp3.movieframe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class webController {

    @GetMapping("/log_in")
    public String login(){
        return "login_screen";
    }

    @GetMapping("/log_error")
    public String loginerror(){
        return "404";
    }

    @GetMapping("/show_reviews")
    public String showReviews(){
        return "modification_reviews_screen";
    }

    @GetMapping("/sign_up")
    public String signup(){
        return "signup_screen";
    }
    
}
