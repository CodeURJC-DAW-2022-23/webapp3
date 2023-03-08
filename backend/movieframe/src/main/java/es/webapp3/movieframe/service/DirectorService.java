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

    public List<Director> obtenerTodosLosDirectores() {
        return directorRepository.findAll();
    }

}