package es.webapp3.movieframe.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.webapp3.movieframe.model.User;
import es.webapp3.movieframe.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findById(long id) {
		return userRepository.findById(id)
				.orElseThrow();
	}

	public User saveOrUpdateUser(User user) {
		return userRepository.save(user);
	}

	public void deleteUser(long id) {
		userRepository.deleteById(id);
	}

	// Login
	public User authenticateUser(String username, String password) {
		Optional<User> user = userRepository.findByUsername(username);
		if (user.isPresent() && user.get().getPassword().equals(password)) {
			return user.get();
		} else {
			return null;
		}
	}
}