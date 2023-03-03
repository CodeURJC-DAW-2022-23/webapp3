package es.webapp3.movieframe.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import es.webapp3.movieframe.model.Review;
import es.webapp3.movieframe.service.UserSession;
import es.webapp3.movieframe.service.UsersService;

@RestController
public class ReviewController {

    @Autowired
    private UserSession usersession;

    @Autowired
    private UsersService usersService;

    @PostMapping("/review/new")
	public ResponseEntity<Review> newReview(Model model,@RequestBody Review review,@RequestParam String rating, @RequestParam String coments) {
        review.setRating(rating);
        review.setComent(coments);
        review.setAuthor(usersession.getUser().getUsername());

        model.addAttribute("user",usersession.getUser().getUsername());

        usersService.save(usersession.getUser(), review);

        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(review.getId()).toUri();

		return ResponseEntity.created(location).body(review);
	}

    @GetMapping("/reviews")
    public String showReviews(Model model){
        model.addAttribute("reviews",usersService.findAll());
        return "modification_reviews_screen.html";
    }

    @GetMapping("/{user}")
    public String showUserReviews(Model model){
         model.addAttribute("reviews",usersService.findByAuthor(usersession.getUser().getUsername()));

         return "reviews_screen.html";
    }

    @GetMapping("/review/{author}/{id}/delete")
	public ResponseEntity<Review> deleteReview(Model model, @PathVariable int id, @PathVariable String author) {
        Review review = usersService.findById(author, id);

        if (review != null) {
			usersService.deleteById(author,id);
			return ResponseEntity.ok(review);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
    
}
