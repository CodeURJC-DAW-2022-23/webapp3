package es.webapp3.movieframe.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/* 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
*/
import es.webapp3.movieframe.model.movie;
import es.webapp3.movieframe.repository.MovieRepository;
import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public Optional<movie> findById(long id) {
		return repository.findById(id);
	}
	
	public boolean exist(long id) {
		return repository.existsById(id);
	}

	public List<movie> findAll() {
		return repository.findAll();
	}
	
	public movie findSingleByTitle(String title) {
		return repository.findSingleByTitle(title);
	}
	public movie findByGender(String gender){
		return repository.findByGender(gender);
	}
	
	public void save(movie movie) {
		repository.save(movie);
	}

	public void delete(long id) {
		repository.deleteById(id);
	}
}