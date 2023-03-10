package es.webapp3.movieframe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.webapp3.movieframe.model.Director;
import es.webapp3.movieframe.repository.DirectorRepository;

@Service
public class DirectorService {

    @Autowired
    private DirectorRepository directorRepository;

    public List<Director> getAllDirectors() {
        return directorRepository.findAll();
    }

    public Director getDirectorById(Long id) {
        return directorRepository.findById(id).orElse(null);
    }

    public Director getDirectorByName(String name) {
        return directorRepository.findByName(name);
    }

    public Director getDirectorByMovieTitle(String movieTitle) {
        return directorRepository.findByMovie_Title(movieTitle);
    }

    public List<Director> getDirectorsByCategory(String category) {
        return directorRepository.findByCategory(category);
    }

    public List<Director> getDirectorsByScoreGreaterThanEqual(Double score) {
        return directorRepository.findByScoreGreaterThanEqual(score);
    }

}