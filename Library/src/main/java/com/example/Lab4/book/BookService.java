package com.example.Lab4.book;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    // search books
    public List<Book> searchBooks(String searchString){
        List<Book> books;

        Predicate<Book> available = book -> !book.isLeased() && !book.isReserved();


        if (searchString.isBlank() || searchString.isEmpty()) {
            books = bookRepository.findAll();
        } else {
            books = bookRepository.findByTitleContainingIgnoreCase(searchString);
        }
        return books.stream().filter(available).collect(Collectors.toList());
    }

    // reserve book
    @Transactional
    public ResponseEntity<Void> reserveBook(int bookId, String username, int version){
        Book book = bookRepository.findByBookId(bookId);

        if(book.getVersion() != version){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        Date res = new Timestamp(System.currentTimeMillis() + 1000*60*60*24*14);

        book.setUser(username);
        book.setReserved(res.toString());
        book.setLeased(null);
        List<Book> b = bookRepository.findAll();
        return ResponseEntity.ok().build();
    }

    // delete reservation
    @Transactional
    public ResponseEntity<Void> deleteReservation(int bookId, String username, int version){
        Book book = bookRepository.findByBookId(bookId);
        if(book.getVersion() != version){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        book.setReserved(null);
        book.setUser(null);
        return ResponseEntity.ok().build();
    }

    // reserved books
    public List<Book> reservedBooks(String username){

        Predicate<Book> reserved = book -> book.isReserved();
        Predicate<Book> resUser = book -> book.getUser().equals(username);

        List<Book> books = bookRepository.findAll();
        books = books.stream().filter(reserved).collect(Collectors.toList());

        if (!username.equals("librarian")){
            books = books.stream().filter(resUser).collect(Collectors.toList());
        }
        return books;
    }

    // lease book
    @Transactional
    public ResponseEntity<Void> leaseBook(int bookId, int version){
        Book book = bookRepository.findByBookId(bookId);
        if(book.getVersion() != version){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        Date leased = new Timestamp(System.currentTimeMillis());

        book.setLeased(leased.toString());
        book.setReserved(null);
        return ResponseEntity.ok().build();
    }

    // mark returned
    @Transactional
    public ResponseEntity<Void> markReturned(int bookId, int version){
        Book book = bookRepository.findByBookId(bookId);

        if(book.getVersion() != version){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        book.setLeased(null);
        book.setUser(null);
        return ResponseEntity.ok().build();
    }

    // leased books
    public List<Book> leasedBooks(String username){

        Predicate<Book> leased = book -> book.isLeased();
        Predicate<Book> leasUser = book -> book.getUser().equals(username);

        List<Book> books = bookRepository.findAll();
        books = books.stream().filter(leased).collect(Collectors.toList());

        if (!username.equals("librarian")){
            books = books.stream().filter(leasUser).collect(Collectors.toList());
        }
        return books;
    }


    public List<BookDTO> booksToDTO(List<Book> books){
        List<BookDTO> booksDTO = new LinkedList<>();
        for (Book bk: books){
            BookDTO bkDTO = new BookDTO();
            bkDTO.setBookId(bk.getBookId());
            bkDTO.setAuthor(bk.getAuthor());
            bkDTO.setTitle(bk.getTitle());
            bkDTO.setDate(bk.getDate());
            bkDTO.setPublisher(bk.getPublisher());
            bkDTO.setUser(bk.getUser());
            bkDTO.setReserved(bk.getReserved());
            bkDTO.setLeased(bk.getLeased());
            bkDTO.setVersion(bk.getVersion());
            booksDTO.add(bkDTO);
        }
        return booksDTO;
    }

    public int ver(){
        return bookRepository.findByBookId(3).getVersion();
    }
}
