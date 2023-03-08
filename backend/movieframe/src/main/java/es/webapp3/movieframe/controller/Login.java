package es.webapp3.movieframe.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ch.qos.logback.core.model.Model;
import es.webapp3.movieframe.service.UserService;

@Controller
public class Login {

    // @Autowired
    // private Password password;

    // @ModelAttribute

    @RequestMapping("/login_screen")
    public String login() {
        return "login_screen";
    }

    @GetMapping("/login_screen.html")
    public String login(Model model) {
        return "login_screen";
    }
}
