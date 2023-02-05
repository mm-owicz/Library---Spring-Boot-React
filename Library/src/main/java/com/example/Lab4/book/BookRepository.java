package com.example.Lab4.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    List<Book> findByTitleContainingIgnoreCase(String s);
    List<Book> findAll();
    List<Book> findByUser(String username);
    Book findByBookId(int id);
}