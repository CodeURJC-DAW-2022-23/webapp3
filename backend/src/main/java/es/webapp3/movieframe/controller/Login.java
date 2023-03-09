package es.webapp3.movieframe.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ch.qos.logback.core.model.Model;
import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.service.UserService;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class Login {

    @Autowired
    private UserService userService;

    User currentUser;

    @ModelAttribute
    public void addAttributes(Model model, HttpServletRequest request) {

    }

    @RequestMapping("/login_screen")
    public String login() {
        return "login_screen";
    }

    @GetMapping("/login_screen.html")
    public String login(Model model) {
        return "login_screen";

    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String registerProcess(Model model, User user) throws IOException {
        ResponseEntity<User> newUser = userService.register(user);
        if (newUser.getStatusCode().is2xxSuccessful()) {
            return "redirect:/login";
        } else {
            model.addAttribute("error", true);
            return "register";
        }
    }
}
