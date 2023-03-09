package es.webapp3.movieframe.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.webapp3.movieframe.model.Movie;
import es.webapp3.movieframe.service.MovieService;

@RestController
@RequestMapping("/movies")
public class movieController {
    
    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public String home(Model model){
        model.addAttribute("movieframe", movieService.findAll());
        return "initial_screen.html";
    }

    @GetMapping("/{id}")
    public String getMovie(Model model,@PathVariable Long id){
//obtener de la bd la peli seleccionada, añadirlo al modelo y devolver la pantalla
        Optional<Movie> movie = movieService.findById(id);

        if(movie.isPresent()){
            model.addAttribute("movie",movie);
            return "movie_screen.html";
        }else{
            return "404.html";
        }

        
    }
}
