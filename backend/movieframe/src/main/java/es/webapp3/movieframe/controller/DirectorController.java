package es.webapp3.movieframe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.webapp3.movieframe.model.Director;
import es.webapp3.movieframe.repository.DirectorRepository;

@RestController
@RequestMapping("/directors")
public class DirectorController {

    @Autowired
    private DirectorRepository directorRepository;

    @GetMapping("")
    public List<Director> getAllDirectors() {
        return directorRepository.findByName();
    }