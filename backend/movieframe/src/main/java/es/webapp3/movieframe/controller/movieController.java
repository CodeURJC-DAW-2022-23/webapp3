package es.webapp3.movieframe.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.webapp3.movieframe.model.Movie;
import es.webapp3.movieframe.service.MovieService;

@Controller
public class movieController {
    
    @Autowired
    private MovieService movieService;

    @GetMapping("/movies")
    public List<String> getMovies(Model model){
        List<String> titles = new ArrayList<>();
        List<Movie> movies = movieService.findAll();
        for(Movie m: movies){
            titles.add(m.getTitle());
        }
        return titles;
    }

    @GetMapping("/")
    public String home(Model model){
        model.addAttribute("movieframe", movieService.findAll());
        return "initial_screen";
    }

    @GetMapping("/movie/{title}")
	public String showMovie(Model model, @PathVariable String title) {

		Movie movie = movieService.findSingleByTitle(title);
		model.addAttribute("movie",movie);
		return "movie_screen";

	}

    @GetMapping("/movie/{name}")
    public String findMovies(Model model,@RequestParam String name){
        List<Movie> movies = movieService.findByTitle(name);

        model.addAttribute("movieframe",movies);
        return "initial_screen";
    }

    @GetMapping("/movie/{id}/image")
    public ResponseEntity<Object> downloadImage(@PathVariable long id) throws SQLException {
        
        Optional<Movie> movie = movieService.findById(id);
        if (movie.isPresent() && movie.get().getImageFile() != null) {
            Resource file = new InputStreamResource(movie.get().getImageFile().getBinaryStream());
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/jpg")
                .contentLength(movie.get().getImageFile().length())
                .body(file);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/movie/{id}")
    public String getMovie(Model model,@PathVariable Long id){
//obtener de la bd la peli seleccionada, añadirlo al modelo y devolver la pantalla
        Optional<Movie> movie = movieService.findById(id);

        if(movie.isPresent()){
            model.addAttribute("movie",movie);
            return "movie_screen";
        }else{
            return "404";
        }

        
    }
}
