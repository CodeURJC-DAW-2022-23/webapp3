package es.webapp3.movieframe.service;

import java.io.IOException;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.webapp3.movieframe.model.Movie;
import es.webapp3.movieframe.model.Review;
import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.repository.MovieRepository;
import es.webapp3.movieframe.repository.ReviewRepository;
import es.webapp3.movieframe.repository.UserRepository;

@Service
public class DataBaseInitializer {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewsRepository;

    @Autowired
	private UserRepository usersRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${security.user}")
	private String user;

    @Value("${security.encodedPassword}")
	private String encodedPassword;

	@PostConstruct
    public void init() throws IOException, URISyntaxException{

        Movie movie1 = new Movie("Avatar", "Sci-Fi", "Jake Sully vive con su nueva familia en el planeta de Pandora. Cuando una amenaza conocida regresa, Jake debe trabajar con Neytiri y el ejército de la raza na'vi para proteger su planeta.",3);//"https://www.youtube.com/embed/FSyWAxUg3Go");  
		setMovieImage(movie1, "/images/uploads/film1.jpg"); 
		movieRepository.save(movie1);
		
        Movie movie2 = new Movie("Ant-Man and the Wasp: Quantumania", "Adventure", "Ant-Man and the Wasp: Quantumania. Lang y van Dyne exploran el Reino Cuántico junto con su familia y se enfrentan a Kang el Conquistador.",4);   
		setMovieImage(movie2,"/images/uploads/film2.jpg");
        movieRepository.save(movie2);

        Movie movie3 = new Movie("Missing", "mystery", "June Allen, una adolescente que intenta encontrar a su madre desaparecida luego de que esta desaparece de vacaciones en Colombia con su nuevo novio.",2);   
		setMovieImage(movie3,"/images/uploads/film3.jpg"); 
        movieRepository.save(movie3);

        Movie movie4 = new Movie("El Gato con Botas: el último deseo", "Animation", "La película es una secuela de El Gato con Botas y es derivada de la franquicia de Shrek.",1);   
		setMovieImage(movie4,"/images/uploads/film4.jpg");
        movieRepository.save(movie4);

        Movie movie5 = new Movie("As bestas", "Drama", "Está ambientada en Galicia y rodada en francés, español y gallego.",3);     
		setMovieImage(movie5,"/images/uploads/film5.jpg"); 
        movieRepository.save(movie5);

        Movie movie6 = new Movie("Los Fabelman", "Drama", "Contada a través de una historia original del ficticio Sammy Fabelman, un joven aspirante a cineasta. La película está dedicada a los recuerdos de los padres de la vida real de Spielberg, Arnold Spielberg y Leah Adler.",5); 
        setMovieImage(movie6,"/images/uploads/film6.jpg");
        movieRepository.save(movie6);  
        

        reviewsRepository.save(new Review("edwardkennedy",3,"Africa's burgeoning talents from across the continent ...","Godzilla: King Of The Monsters Adds O’Shea Jackson Jr"));
        reviewsRepository.save(new Review("edwardkennedy",5,"Magnolia Pictures has acquired U.S. the...","Magnolia Nabs ‘Lucky’ Starring Harry Dean Stanton"));
        reviewsRepository.save(new Review("hughjackman",4,"New Line’s remake of “Going in Style” launched with a moderate $...","‘Going in Style’ Tops ‘Smurfs: The Lost Village’ at Thursday Box Office"));		
		
		usersRepository.save(new User("edwardKennedy",passwordEncoder.encode("edu123456"),"Edward","edward@kennedy.com","USER"));
        usersRepository.save(new User(user,"{bcrypt}"+encodedPassword,"Hugh","hugh@jack.com","USER","ADMIN"));
        
    }

    public void setMovieImage(Movie movie, String ClasspathResource)throws IOException{
		Resource image = new ClassPathResource(ClasspathResource);
		movie.setImageFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
	}

   
    
}
