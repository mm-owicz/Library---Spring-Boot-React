package com.example.Lab4.book;

import jakarta.persistence.*;
import lombok.Data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@Table(name="book")
public class Book {

    @Id
    private int bookId;

    private String author;

    private String title;

    private int date;

    private String publisher;

    private String user;

    private String reserved;

    private String leased;



    @Version
    private int version;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getReserved() {
        return reserved;
    }

    public void setReserved(String reserved) {
        this.reserved = reserved;
    }

    public String getLeased() {
        return leased;
    }

    public void setLeased(String leased) {
        this.leased = leased;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public boolean isReserved(){
        if(reserved == null){
            return false;
        }

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy");

        boolean x = true;
        try{
            Date res = formatter.parse(reserved);
            x = (res.after(now)) ? true: false;
        }catch (ParseException e){}

        if (x == false){
            reserved = null;
        }
        return x;
    }

    public boolean isLeased(){
        return leased != null;
    }
}
