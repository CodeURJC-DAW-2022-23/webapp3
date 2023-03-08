package es.webapp3.movieframe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.webapp3.movieframe.model.Director;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {

    Director findByName(String name);

    List<Director> findByGender(String gender);

    List<Director> findByScoreGreaterThanEqual(String score);

    List<Director> findAll();

}