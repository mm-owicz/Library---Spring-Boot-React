package com.example.Lab4.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/search")
    public List<BookDTO> searchBooks(@RequestParam String s){
        List<Book> books = bookService.searchBooks(s);
        return bookService.booksToDTO(books);
    }

    @PutMapping("/reserve")
    public ResponseEntity<Void> reserveBook(@RequestBody BookActionDTO bookActionDTO){
        return bookService.reserveBook(bookActionDTO.getBookId(), bookActionDTO.getUsername(), bookActionDTO.getVersion());
    }

    @PutMapping("/deleteRes")
    public ResponseEntity<Void> deleteReservation(@RequestBody BookActionDTO bookActionDTO){
        return bookService.deleteReservation(bookActionDTO.getBookId(), bookActionDTO.getUsername(), bookActionDTO.getVersion());
    }

    @GetMapping("/reservations")
    public List<BookDTO> getReservations(@RequestParam String user){
        List<Book> books = bookService.reservedBooks(user);
        return bookService.booksToDTO(books);
    }

    @PutMapping("/lease")
    public ResponseEntity<Void> leaseBook(@RequestBody BookActionDTO bookActionDTO){
        return bookService.leaseBook(bookActionDTO.getBookId(), bookActionDTO.getVersion());
    }

    @PutMapping("/markReturned")
    public ResponseEntity<Void> markReturned(@RequestBody BookActionDTO bookActionDTO){
        return bookService.markReturned(bookActionDTO.getBookId(), bookActionDTO.getVersion());
    }

    @GetMapping("/leases")
    public List<BookDTO> getLeased(@RequestParam String user){
        List<Book> books = bookService.leasedBooks(user);
        return bookService.booksToDTO(books);
    }

    @GetMapping("/ver")
    public int ver(){
        return bookService.ver();
    }

}
