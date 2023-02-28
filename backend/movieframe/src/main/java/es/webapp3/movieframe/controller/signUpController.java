package es.webapp3.movieframe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;

import java.util.Optional;

@Controller
public class signUpController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/sign_up")
    public String showSignUpForm(Model model) {
        model.addAttribute("user", new User());
        return "signup_screen";
    }

    @PostMapping("/sign_up")
    public String submitSignUpForm(@Valid @ModelAttribute User user, BindingResult bindingResult) {
        // Check if user already exists
        System.out.println("submitSignUpForm() called.");
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            bindingResult.rejectValue("email", "error.user", "User with this email already exists.");
            return "signup_screen";
        }

        existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            bindingResult.rejectValue("username", "error.user", "Username already exists.");
            return "signup_screen";
        }

        // Save user if valid
        userRepository.save(user);
        return "redirect:/log_in";
    }

}
