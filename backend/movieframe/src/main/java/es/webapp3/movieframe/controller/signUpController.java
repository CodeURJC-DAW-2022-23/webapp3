package es.webapp3.movieframe.controller;

import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.repository.UserRepository;
import jakarta.validation.Valid;

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
    public String submitSignUpForm(@ModelAttribute @Valid User user, BindingResult bindingResult, Model model)
            throws MessagingException {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            bindingResult.rejectValue("email", "error.user.email", "Email already exists.");
        }

        existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            bindingResult.rejectValue("username", "error.user.username", "Username already exists.");
        }

        if (bindingResult.hasErrors()) {
            // Print the error messages to the console
            for (ObjectError error : bindingResult.getAllErrors()) {
                System.out.println(error);
            }
            model.addAttribute("user", user);
            return "signup_screen";
        }

        // Save user if valid
        userRepository.save(user);

        // // Send email to user
        // Properties properties = new Properties();
        // properties.put("mail.smtp.host", "smtp.gmail.com");
        // properties.put("mail.smtp.port", "587");
        // properties.put("mail.smtp.auth", "true");
        // properties.put("mail.smtp.starttls.enable", "true");
        // properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        // properties.put("mail.smtp.connectiontimeout", "5000");
        // properties.put("mail.smtp.timeout", "5000");
        // properties.put("mail.smtp.writetimeout", "5000");

        // Session session = Session.getInstance(properties, new Authenticator() {
        //     protected PasswordAuthentication getPasswordAuthentication() {
        //         return new PasswordAuthentication("dawuniversidad@gmail.com", "vzlbaloljtxzsemj");
        //     }
        // });

        // MimeMessage message = new MimeMessage(session);
        // message.setFrom(new InternetAddress("dawuniversidad@gmail.com"));
        // message.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
        // message.setSubject("Welcome to our website");
        // message.setText("Bienvenido " + user.getUsername() + ",\n\nGracias por registrarte en nuestra web!\nAquí tienes un listado de películas que te pueden interesar:\n\n- The Shawshank Redemption\n- The Godfather\n- The Dark Knight\n- The Godfather: Part II\n- The Lord of the Rings: The Return of the King\n- Pulp Fiction\n- Schindler's List\n- 12 Angry Men\n- The Good, the Bad and the Ugly\n- The Lord of the Rings: The Fellowship of the Ring\n\n¡Esperamos que disfrutes de nuestra web");

        // Transport.send(message);

        return "redirect:/log_in";
    }

}
