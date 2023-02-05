package com.example.Lab4.user;


import com.example.Lab4.book.Book;
import com.example.Lab4.book.BookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;
    private BookRepository bookRepository;

    public UserService(UserRepository userRepository, BookRepository bookRepository){
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    // register
    public ResponseEntity<Void> createUser(String username, String pwd){

        User existingUser = userRepository.findByUsername(username);
        if(existingUser != null){
            return ResponseEntity.badRequest().build();
        }

        User user = new User();
        user.setUsername(username);
        user.setPwd(pwd);
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> loginUser(String username, String pwd){
        User usr = userRepository.findByUsernameAndPwd(username, pwd);
        if(usr != null){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deleteAccount(String username){
        User delUser = userRepository.findByUsername(username);

        List<Book> books = bookRepository.findByUser(username);

        Predicate<Book> userLease = book -> book.isLeased();
        List <Book> leaseBooks = books.stream().filter(userLease).collect(Collectors.toList());

        if(!leaseBooks.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        Predicate<Book> userRes = book -> book.isReserved();
        List <Book> resBooks = books.stream().filter(userRes).collect(Collectors.toList());

        for(Book book: resBooks){
            book.setUser(null);
            book.setReserved(null);
        }

        userRepository.delete(delUser);
        return ResponseEntity.ok().build();
    }
}
