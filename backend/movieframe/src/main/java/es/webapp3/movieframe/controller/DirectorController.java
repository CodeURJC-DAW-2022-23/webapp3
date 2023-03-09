package es.webapp3.movieframe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.Controller;

import es.webapp3.movieframe.model.Director;
import es.webapp3.movieframe.repository.DirectorRepository;

@Controller
@RequestMapping("/directors")
public class DirectorController {

    @Autowired
    private DirectorRepository directorRepository;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("movieframe", movieService.findAll());
        return "initial_screen.html";
    }

    @GetMapping
    public String getAllDirectors(Model model) {
        List<Director> directors = directorRepository.findAll();
        model.addAttribute("directors", directors);
        return "directors";
    }

    @GetMapping("/{id}")
    public String getDirectorById(@PathVariable Long id, Model model) {
        Director director = directorRepository.findById(id).orElse(null);
        if (director == null) {
            return "error";
        }
        model.addAttribute("director", director);
        return "director";
    }

    // Probar
    @PostConstruct
    public void init() {
        Director director1 = new Director("Steven Spielberg", "Jurassic Park, E.T.", "Terror", 9.0,
                "Ganador de tres premios Oscar.");
        directorRepository.save(director1);

        Director director2 = new Director("Christopher Nolan", "The Dark Knight, Inception", "Thriller", 8.5,
                "Director británico.");
        directorRepository.save(director2);
    }

    // Falta direccionar a la pelicula

}
