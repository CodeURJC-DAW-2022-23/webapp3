package es.webapp3.movieframe.service;

import java.util.Optional;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import es.webapp3.movieframe.model.Movie;
import es.webapp3.movieframe.repository.MovieRepository;

import java.io.IOException;
import java.util.List;



@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

	@PostConstruct
    public void init() throws IOException{

        Movie movie1 = new Movie("Avatar", "Sci-Fi", "Jake Sully vive con su nueva familia en el planeta de Pandora. Cuando una amenaza conocida regresa, Jake debe trabajar con Neytiri y el ejército de la raza na'vi para proteger su planeta.",3,"https://www.youtube.com/embed/FSyWAxUg3Go");  
		setMovieImage(movie1, "/images/uploads/film1.jpg"); 
		movieRepository.save(movie1);
		/* 
        movieRepository.save(new Movie("Ant-Man and the Wasp: Quantumania", "Adventure", "Ant-Man and the Wasp: Quantumania. Lang y van Dyne exploran el Reino Cuántico junto con su familia y se enfrentan a Kang el Conquistador.","/images/uploads/film2.jpg",4,null));   
		
        movieRepository.save(new Movie("Missing", "mystery", "June Allen, una adolescente que intenta encontrar a su madre desaparecida luego de que esta desaparece de vacaciones en Colombia con su nuevo novio.","/images/uploads/film3.jpg",2,null));   
		 
        movieRepository.save(new Movie("El Gato con Botas: el último deseo", "Animation", "La película es una secuela de El Gato con Botas y es derivada de la franquicia de Shrek.","/images/uploads/film4.jpg",1,null));   
		
        movieRepository.save(new Movie("As bestas", "Drama", "Está ambientada en Galicia y rodada en francés, español y gallego.","/images/uploads/film5.jpg",3,null));     
		
        movieRepository.save(new Movie("Los Fabelman", "Drama", "Contada a través de una historia original del ficticio Sammy Fabelman, un joven aspirante a cineasta. La película está dedicada a los recuerdos de los padres de la vida real de Spielberg, Arnold Spielberg y Leah Adler.","/images/uploads/film6.jpg",5,null));      
		*/ 
          
		for(int i=0; i<10; i++) {
			movieRepository.save(new Movie("Title"+i, "Category"+i, "Description"+i, i, "Spoiler"+i));
		}
    }

	public void setMovieImage(Movie movie, String ClasspathResource)throws IOException{
		movie.setImage(true);
		Resource image = new ClassPathResource(ClasspathResource);
		movie.setImageFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
	}

    public Optional<Movie> findById(long id) {
		return movieRepository.findById(id);
	}
	
	public boolean exist(long id) {
		return movieRepository.existsById(id);
	}

	public List<Movie> findAll() {
		return movieRepository.findAll();
	}
	
	public List<Movie> findSingleByTitle(String title) {
		return movieRepository.findByTitle(title);
	}
	public List<Movie> findByGender(String gender){
		return movieRepository.findByGender(gender);
	}
	
	public void save(Movie movie) {
		movieRepository.save(movie);
	}

	public void delete(long id) {
		movieRepository.deleteById(id);
	}
}
