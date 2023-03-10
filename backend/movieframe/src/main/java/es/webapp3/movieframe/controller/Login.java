package es.webapp3.movieframe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ch.qos.logback.core.model.Model;
import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.service.UserService;
import jakarta.servlet.http.HttpSession;

@Controller
public class Login {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String username, @RequestParam String password, HttpSession session,
            Model model) {
        User user = userService.authenticateUser(username, password);
        if (user == null) {
            model.addAttribute("error", "Nombre de usuario o contraseña incorrectos.");
            return "login";
        } else {
            session.setAttribute("user", user);
            return "redirect:/home";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
