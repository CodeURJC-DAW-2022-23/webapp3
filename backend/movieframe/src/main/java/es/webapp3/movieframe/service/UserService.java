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

	// guardar un usuario
	public User save(User user) {
		return userRepository.save(user);
	}

	// buscar un usuario por su id
	public User findById(long id) {
		Optional<User> result = userRepository.findById(id);
		return result.orElse(null);
	}

	// buscar un usuario por su nombre
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
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