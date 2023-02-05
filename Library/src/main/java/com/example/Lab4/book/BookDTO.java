package com.example.Lab4.book;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BookDTO {

    private int bookId;
    private String author;
    private String title;
    private int date;
    private String publisher;
    private String user;
    private String reserved;
    private String leased;
    private int version;
}
