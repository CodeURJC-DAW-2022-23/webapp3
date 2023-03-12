package es.webapp3.movieframe.controller;

import java.util.Optional;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.model.movie;
import es.webapp3.movieframe.repository.MovieRepository;
import es.webapp3.movieframe.repository.UserRepository;
import jakarta.validation.Valid;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Controller
public class signUpController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping("/sign_up")
    public String showSignUpForm(Model model) {
        model.addAttribute("user", new User());
        return "signup_screen";
    }

    @PostMapping("/sign_up")
    public String submitSignUpForm(@ModelAttribute @Valid User user, BindingResult bindingResult, Model model)
            throws MessagingException, DocumentException, SQLException, MalformedURLException, IOException {
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

        // Retrieve first 10 movies
        List<movie> movies = movieRepository.findAll(PageRequest.of(0, 10)).getContent();

        // Generate PDF
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);
        document.open();
        Paragraph paragraph = new Paragraph("Películas recomendadas:");
        document.add(paragraph);
        for (movie movie : movies) {
            Blob imageBlob = movie.getImageFile();
            if (imageBlob != null) {
                byte[] imageData = imageBlob.getBytes(1, (int) imageBlob.length());
                Image image = Image.getInstance(imageData);
                image.scaleAbsolute(50, 50);
                document.add(image);
            }
            paragraph = new Paragraph(movie.getTitle());
            document.add(paragraph);
        }
        document.close();
        byte[] pdfBytes = baos.toByteArray();

        // Save user if valid
        userRepository.save(user);


        // Send email to user
        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        properties.put("mail.smtp.connectiontimeout", "5000");
        properties.put("mail.smtp.timeout", "5000");
        properties.put("mail.smtp.writetimeout", "5000");

        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("dawuniversidad@gmail.com", "vzlbaloljtxzsemj");
            }
        });

        

        // Send email to user
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress("dawuniversidad@gmail.com"));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
        message.setSubject("Bienvenido a nuestra web!");

        // Create the message body
        // Create the message body
        MimeBodyPart textPart = new MimeBodyPart();
        textPart.setText("Bienvenido " + user.getUsername()
                + ",\n\nGracias por registrarte en nuestra web!\nAquí tienes un listado de películas que te pueden interesar:\n\n- The Shawshank Redemption\n- The Godfather\n- The Dark Knight\n- The Godfather: Part II\n- The Lord of the Rings: The Return of the King\n- Pulp Fiction\n- Schindler's List\n- 12 Angry Men\n- The Good, the Bad and the Ugly\n- The Lord of the Rings: The Fellowship of the Ring\n\n¡Esperamos que disfrutes de nuestra web!");

        MimeBodyPart attachmentPart = new MimeBodyPart();
        DataSource source = new ByteArrayDataSource(pdfBytes, "application/pdf");
        attachmentPart.setDataHandler(new DataHandler(source));
        attachmentPart.setFileName("recommended_movies.pdf");

        MimeMultipart multipart = new MimeMultipart();
        multipart.addBodyPart(textPart);
        multipart.addBodyPart(attachmentPart);

        message.setContent(multipart);

        Transport.send(message);

        return "redirect:/log_in";
    }

}
