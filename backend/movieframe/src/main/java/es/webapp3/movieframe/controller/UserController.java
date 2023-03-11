package es.webapp3.movieframe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ch.qos.logback.core.model.Model;
import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.service.UserService;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public String listUsers(Model model) {
        List<User> userList = userService.findAll();
        model.addAttribute("userList", userList);
        return "user_list";
    }

    @GetMapping("/create")
    public String createUser(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "user_form";
    }

    @PostMapping("/save")
    public String saveUser(@ModelAttribute("user") User user) {
        userService.saveOrUpdateUser(user);
        return "redirect:/users/list";
    }

    @GetMapping("/edit/{id}")
    public String editUser(@PathVariable("id") long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "user_form";
    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/users/list";
    }

    // Cambiar la contraseña del usuario
    // @GetMapping("/{id}/change-password")
    // public String showChangePasswordForm(@PathVariable Long id, Model model) {
    // User user = userService.findById(id);
    // if (user != null) {
    // model.addAttribute("user", user);
    // model.addAttribute("changePasswordForm", new ChangePasswordForm());
    // return "user/change_password";
    // } else {
    // return "redirect:/error";
    // }
    // }

    // @PostMapping("/{id}/change-password")
    // public String changePassword(@PathVariable Long id, @ModelAttribute @Valid
    // ChangePasswordForm form, BindingResult bindingResult) {
    // User user = userService.findById(id);
    // if (user == null) {
    // return "redirect:/error";
    // }

    // if (!userService.checkPassword(user, form.getOldPassword())) {
    // bindingResult.rejectValue("oldPassword",
    // "error.changePasswordForm.oldPassword", "Incorrect old password");
    // }

    // if (!form.getNewPassword().equals(form.getConfirmNewPassword())) {
    // bindingResult.rejectValue("confirmNewPassword",
    // "error.changePasswordForm.confirmNewPassword", "New passwords do not match");
    // }

    // if (bindingResult.hasErrors()) {
    // return "user/change_password";
    // }

    // userService.changePassword(user, form.getNewPassword());
    // return "redirect:/users/" + id;
    // }
}
