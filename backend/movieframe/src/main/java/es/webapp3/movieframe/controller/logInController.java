package es.webapp3.movieframe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.repository.UserRepository;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.Optional;

@Controller
public class logInController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/log_in")
    public String showLogInForm(Model model) {
        model.addAttribute("user", new User());
        return "login_screen";
    }

    @PostMapping("/log_in")
    public String submitLogInForm(@ModelAttribute @Valid User user, BindingResult bindingResult, Model model) {

        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (!existingUser.isPresent() || !existingUser.get().getPassword().equals(user.getPassword())) {
            bindingResult.addError(new ObjectError("username", "Invalid username or password."));
            model.addAttribute("log_in_error", bindingResult.getAllErrors().get(0).getDefaultMessage());
            return "login_screen";
        }

        return "redirect:/";
    }
}