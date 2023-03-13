package es.webapp3.movieframe.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.service.MovieService;
import jakarta.servlet.http.HttpSession;

@Controller
public class Home {
    
    @Autowired 
    private MovieService movieService;
    
    @GetMapping("/")
    public String index(Model model, HttpSession session){

        // Check if session attribute exists
        if (session.getAttribute("loggedInUser") != null) {
            User loggedInUser = (User) session.getAttribute("loggedInUser");
            model.addAttribute("loggedInUser", loggedInUser);
        }
        
        System.out.println("Flash attribute not found");
        model.addAttribute("movies", movieService.findAll());
        return "initial_screen";
    }

}
