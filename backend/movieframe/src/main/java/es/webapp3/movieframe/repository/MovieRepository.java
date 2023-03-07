package es.webapp3.movieframe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
/* 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
*/
import es.webapp3.movieframe.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{

    
    @Query("select m from movie m where m.title like %:title%")
    movie findSingleByTitle(String title);

    
    @Query("select m from movie m where m.gender like %:gender%")
    movie findByGender(String gender);
    
}