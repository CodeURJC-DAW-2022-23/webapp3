package es.webapp3.movieframe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.webapp3.movieframe.model.Director;

public interface DirectorRepository extends JpaRepository<Director, Long> {

    List<Director> findAll();

    Director findByName(String name);

    Director findByMovie_Title(String movieTitle);

    List<Director> findByCategory(String category);

    List<Director> findByScoreGreaterThanEqual(Double score);

}