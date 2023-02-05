package com.example.Lab4.book;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BookActionDTO {
    private int bookId;
    private String username;
    private int version;
}
